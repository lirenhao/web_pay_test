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
import Const from "../constants"
import OrderShow from "../components/order/Order"

const Order = (props, context) => {
	context.setTitle("订单");
	const {user, orderIds, order, marketing, params: {index}} = props;
	const onCancel = (orderId) => {
		Payment.cancelOrder(user, orderId)
	};
	const onReqPay = (orderId) => {
		Payment.reqPayAuth(user, orderId)
	};
	return <OrderShow orderIds={orderIds}
	                  order={order}
	                  marketing={marketing}
	                  onReqPay={onReqPay}
	                  onCancel={onCancel}
	                  canCancel={user.userType == Const.TerminalType.MERCHANT}/>
};

Order.contextTypes = {setTitle: React.PropTypes.func.isRequired};

const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds,
	order: state.order,
	marketing: state.marketing
});

export default connect(mapStateToProps)(Order)