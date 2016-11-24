/**
 * Author：liRenhao
 * Create Date：2016/9/24
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 客户端接的一些业务处理
 */
import Const from '../src/constants'
import {addUser, addOrder, addMarketing, remove, showDialog} from "../src/actions"
import {push} from "react-router-redux"

/**
 * 客户端接收到服务端数据后的处理
 * @param store redux的store
 * @returns {Function} 返回一个接收消息后的处理函数
 */
export function msgHandler(store) {

    const ServerCmd = Const.ServerCmd
    const ClientCmd = Const.ClientCmd

    return function (data) {
        const {eventType, ...msg} = data
        switch (eventType) {
            case ServerCmd.CLIENT_SIGN_IN:
                store.dispatch(addUser({userId: msg.id, userType: msg.terminalType}))
                break
            case ClientCmd.ORDER_ITEMS:
                store.dispatch(addOrder({...msg}))
                break
            case ClientCmd.MARKETING:
                store.dispatch(addMarketing({...msg}))
                break
            case ClientCmd.PAY_AUTH:
                // 获取支付权限跳转到pay
                store.dispatch(push("/pay/" + store.getState().orderIds.indexOf(msg.orderId)))
                break
            case ClientCmd.PAY_COMPLETED:
                store.dispatch(remove(msg.orderId))
                if (msg.result) {
                    // 支付成功时模态框弹出支付结果
                    store.dispatch(showDialog({header: "支付通知", body: "订单【" + msg.orderId + "】" + "支付成功"}))
                } else {
                    if (msg.channel !== "Client") {
                        // 支付成功时模态框弹出支付结果
                        store.dispatch(showDialog({header: "支付通知", body: "订单【" + msg.orderId + "】" + "支付失败"}))
                    } else if (store.getState().user.userType == Const.TerminalType.USER) {
                        // 取消订单时只有客户端是用户才弹出取消订单通知
                        store.dispatch(showDialog({header: "订单通知", body: "订单【" + msg.orderId + "】" + "取消成功"}))
                    }
                }
                // 当用户没有订单时，商户跳转到录入商品界面、客户跳转到输入订单界面
                if (store.getState().orderIds.length < 1) {
                    if (store.getState().user.userType == Const.TerminalType.MERCHANT)
                        store.dispatch(push("/goods"))
                    else
                        store.dispatch(push("/orderId"))
                }
                break
            case ClientCmd.FAIL:
                store.dispatch(remove(msg.orderId))
                store.dispatch(showDialog({header: eventType, body: msg.msg}))
                // 当用户没有订单时，商户跳转到录入商品界面、客户跳转到输入订单界面
                if (store.getState().orderIds.length < 1) {
                    if (store.getState().user.userType == Const.TerminalType.MERCHANT)
                        store.dispatch(push("/goods"))
                    else
                        store.dispatch(push("/orderId"))
                }
                break
            case ClientCmd.MESSAGE:
                store.dispatch(showDialog({header: msg.level, body: msg.msg}))
                break
        }
    }
}