/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：Yky
 * Why & What is modified  补全方法注释
 * 与后台服务交互的各种事件的处理
 */
import Const from '../constants'
var ServerCmd = Const.ServerCmd

class Payment {

	constructor() {
		this._isClosed = true
		this._waitOpen = false
		this._tmpMessages = []
	}

	/**
	 * 设置事件处理的方法
	 * @method
	 * @for Payment
	 * @param {function} handler 事件处理方法
	 */
	setMsgHandler(handler) {
		this.msgHandler = handler
	}

	/**
	 * 处理事件的方法
	 * @method
	 * @for Payment
	 * @param {Object} msg 事件信息对象
	 */
	handleMsg(msg) {
		this.msgHandler(msg)
	}

	/**
	 * 处理错误的方法
	 * @method
	 * @for Payment
	 * @param {Object} err 错误信息
	 */
	handleErr(err) {
		console.log("错误信息" + JSON.stringify(err))
	}

	/**
	 * 创建webSocket和一些初始化的处理
	 * @method
	 * @for Payment
	 */
	open() {
		if (this._isClosed && !this._waitOpen) {
			try {
				this._waitOpen = true
				this.webSocket = new WebSocket(process.env.wsUrl)
				this.webSocket.onopen = () => {
					this._isClosed = false
					this._waitOpen = false
					this._tmpMessages.forEach(msg => {
						return Payment.prototype.send.call(this, msg)
					})
					this._tmpMessages = []
				}
				this.webSocket.onclose = () => {
					this._isClosed = true
				}

				this.webSocket.onmessage = (event) => {
					this.handleMsg(JSON.parse(event.data))
				}

				this.webSocket.onerror = this.handleErr
			} catch (e) {
				console.log(e)
			}
		}
	}

	/**
	 * 关闭webSocket
	 * @method
	 * @for Payment
	 */
	close() {
		if (!this._isClosed) {
			this.webSocket.close()
			this._isClosed = true
			this._tmpMessages = []
		}
	}

	/**
	 * 向服务器发送请求
	 * @method
	 * @for Payment
	 * @param {Object} msg 错误信息
	 */
	send(msg) {
		this.open()
		if (this._isClosed) {
			this._tmpMessages.push(msg)
		} else {
			this.webSocket.send(JSON.stringify(msg))
		}
	}

	/**
	 * 用户登录操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 */
	clientSignIn(user) {
		var login = {
			eventType: ServerCmd.CLIENT_SIGN_IN,
			id: user.userId,
			terminalType: user.userType
		}
		this.send(login)
		this.handleMsg(login)
	}

	/**
	 * 创建订单操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} goods 一个商品对象的数组，对象包括name、price、quantity三个属性
	 */
	createOrder(user, goods) {
		this.send({
			eventType: ServerCmd.CREATE_ORDER,
			id: user.userId,
			terminalType: user.userType,
			items: goods
		})
	}

	/**
	 * 客户关联订单操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} orderId 订单号
	 */
	joinOrder(user, orderId) {
		this.send({
			eventType: ServerCmd.JOIN_ORDER,
			id: user.userId,
			terminalType: user.userType,
			orderId: orderId
		})
	}

	/**
	 * 请求支付操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} orderId 订单号
	 */
	reqPayAuth(user, orderId) {
		this.send({
			eventType: ServerCmd.PAY_AUTH_REQ,
			id: user.userId,
			terminalType: user.userType,
			orderId: orderId
		})
	}

	/**
	 * 取消支付操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} orderId 订单号
	 */
	giveUpPay(user, orderId) {
		this.send({
			eventType: ServerCmd.GIVE_UP_PAY,
			id: user.userId,
			terminalType: user.userType,
			orderId: orderId
		})
	}

	/**
	 * 取消订单操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} orderId
	 */
	cancelOrder(user, orderId) {
		this.send({
			eventType: ServerCmd.CANCEL_ORDER,
			id: user.userId,
			terminalType: user.userType,
			orderId: orderId
		})
	}

	/**
	 * 发送支付结果操作
	 * @method
	 * @for Payment
	 * @param {Object} user 一个对象包括userId、userType两个属性
	 * @param {Object} result {"eventType":"PAY_RESULT","orderId":"23","state":true,"channel":"测试渠道","msg":"成功","id":"1","terminalType":"USER"}
	 */
	payResult(user, result) {
		// TODO 根据result中的值判断成功还是失败
		this.send({
			eventType: ServerCmd.PAY_RESULT,
			id: user.userId,
			terminalType: user.userType,
			orderId: result.orderId,
			state: result.state === "0" ? true : false,
			channel: "测试渠道",
			msg: result.state === "0" ? "成功" : "失败"
		})
	}
}

export {Payment}
export default new Payment()