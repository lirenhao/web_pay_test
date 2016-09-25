/**
 * Author：liRenhao
 * Create Date：2016/9/24
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import {Server} from 'mock-socket'
import Const from '../src/constants'

const ServerCmd = Const.ServerCmd

export class MockServer {
    constructor(order = {}, marketing = {}) {
        this.server = new Server(process.env.wsUrl)
        this.server.on('message', data => {
            const {eventType, ...msg} = JSON.parse(data)
            switch (eventType) {
                case ServerCmd.CLIENT_SIGN_IN:
                    // 用户登录
                    this.server.send(JSON.stringify({"eventType":"ORDER_ITEMS","orderId":"11","items":[{"name":"ONLY修身撞色拼接女针织裙","price":34950,"quantity":2},{"name":"ONLY圆点荷叶边女修身裙","price":19950,"quantity":1},{"name":"ONLY棉宽松字母牛仔女外套","price":27450,"quantity":1}]}))
                    this.clientSignIn(order)
                    break
                case ServerCmd.CREATE_ORDER:
                    // 创建订单
                    this.createOrder(msg.items)
                    break
                case ServerCmd.JOIN_ORDER:
                    // 关联订单
                    this.joinOrder()
                    break
                case ServerCmd.CANCEL_ORDER:
                    // 取消订单
                    this.cancelOrder()
                    break
                case ServerCmd.PAY_AUTH_REQ:
                    // 请求支付权限
                    this.payAuthReq()
                    break
                case ServerCmd.GIVE_UP_PAY:
                    // 取消支付权限
                    this.giveUpPay()
                    break
                case ServerCmd.PAY_RESULT:
                    // 发送支付结果
                    this.payResult()
                    break
            }
        })
    }

    clientSignIn(order) {
        if (Object.keys(order).length > 0) {
            this.server.send("test")
        }
    }

    createOrder(goods) {
        this.server.send({
            eventType: ServerCmd.CREATE_ORDER,
            id: user.userId,
            terminalType: user.userType,
            items: goods
        })
    }

    joinOrder(user, orderId) {
        this.server.send({
            eventType: ServerCmd.JOIN_ORDER,
            id: user.userId,
            terminalType: user.userType,
            orderId: orderId
        })
    }

    cancelOrder() {
        this.server.send({})
    }

    payAuthReq() {
        this.server.send({})
    }

    giveUpPay() {
        this.server.send({})
    }

    payResult() {
        this.server.send({})
    }
}

export class MockHistory {
    constructor(){
        this.routes = []
    }

    push(path) {
        this.routes.push(path)
    }

}