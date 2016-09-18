/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
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

    setMsgHandler(handler) {
        this.msgHandler = handler
    }

    handleMsg(msg) {
        this.msgHandler(msg)
    }

    handleErr(err) {
        console.log(err)
    }

    handleOpened() {
    }

    open() {
        if (this._isClosed && !this._waitOpen) {
            try {
                this._waitOpen = true
                this.webSocket = new WebSocket("ws://localhost:9000/ws")
                this.webSocket.onopen = () => {
                    this._isClosed = false
                    this._waitOpen = false
                    this.handleOpened()
                    this._tmpMessages.forEach(msg => {
                        return Payment.prototype.send.call(this, msg);
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

    close() {
        if (!this._isClosed) {
            this.webSocket.close()
            this._isClosed = true
            this._tmpMessages = []
        }
    }

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
     * @param user 一个对象包括userId、userType两个属性
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
     *  创建订单操作
     * @param user 一个对象包括userId、userType两个属性
     * @param goods 一个商品对象的数组，对象包括name、price、quantity三个属性
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
     * @param user 一个对象包括userId、userType两个属性
     * @param orderId 订单号
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
     * @param user 一个对象包括userId、userType两个属性
     * @param orderId 订单号
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
     * 支付完成操作
     * @param user 一个对象包括userId、userType两个属性
     * @param orderId 订单号
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
     * 取消支付操作
     * @param user 一个对象包括userId、userType两个属性
     * @param orderId
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
     * @param user 一个对象包括userId、userType两个属性
     * @param result
     */
    payResult(user, result) {
        this.send({
            eventType: ServerCmd.PAY_RESULT,
            id: user.userId,
            terminalType: user.userType,
        })
    }
}

export {Payment}
export default new Payment()