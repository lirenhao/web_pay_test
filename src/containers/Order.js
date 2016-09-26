/**
 * Author：pengfei
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified 添加支付、取消事件
 * Modified By：Pengfei
 * Why & What is modified 删除组件中定义的路由传参的参数
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 订单信息展示界面的容器
 */
import React from "react"
import {connect} from "react-redux"
import Payment from "../Payment"
import Const from "../constants"
import OrderShow from "../components/order/Order"

/**
 * 定义订单信息页面容器
 * @param props 组件属性
 * @param context 上下文属性
 */
const Order = (props, context) => {
	context.setTitle("订单");
	//定义组件的属性
	const {user, orderIds, order, marketing} = props;
	/**
	 * 定义取消订单事件
	 * @param orderId 订单号
     */
	const onCancel = (orderId) => {
		Payment.cancelOrder(user, orderId)
	};
	/**
	 * 支付请求事件
	 * @param orderId  订单号
     */
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

/**
 * 订单页面必传的属性
 * @type {{setTitle: *}} 标题内容
 */
Order.contextTypes = {setTitle: React.PropTypes.func.isRequired};

/**
 *  该函数作为connect的参数
 * 定义该参数，支付组件将会监听 Redux store 的变化。
 * 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
 * @param state 组件的状态
 */
const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds,
	order: state.order,
	marketing: state.marketing
});

/**
 *  输出react-redux关联之后的支付容器组件
 * 连接支付组件与 Redux store
 * 只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
 */
export default connect(mapStateToProps)(Order)