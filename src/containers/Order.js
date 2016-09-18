/**
 * Author：pengfei
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified 添加支付、取消事件
 * <文件描述>
 */
import React from "react"
import {connect} from "react-redux"
import Payment from "../Payment"
import OrderShow from "../components/order/Order"

const Order = (props) => {
    const onCancel = (orderId) => {
        Payment.cancelOrder(props.user, orderId)
    }
    const onReqPay = (orderId) => {
        Payment.reqPayAuth(props.user, orderId)
    }
    return <OrderShow activeKey={Number(props.params.index) || 0}
                      orderIds={props.orderIds}
                      order={props.order}
                      marketing={props.marketing}
                      onCancel={onCancel}
                      onReqPay={onReqPay}/>
}

const mapStateToProps = (state)=> ({
    user: state.user,
    orderIds: state.orderIds,
    order: state.order,
    marketing: state.marketing
})

export default connect(mapStateToProps)(Order)