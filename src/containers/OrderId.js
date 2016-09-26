/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加订单号表单的容器
 * Modified By：kongli
 * Why & What is modified 添加注释
 */

import React from "react"
import {connect} from "react-redux"
import Payment from "../Payment"
import OrderIdForm from "../components/orderIdForm/OrderIdForm"

/**
 * 定义扫描订单页面容器
 * @param props 组件属性
 * @param context 上下文属性
 */
const OrderId = (props, context) => {
	context.setTitle("扫描订单")
	//定义组件的属性
	const {user, orderIds} = props
	/**
	 * 匹配订单事件
	 * @param values
     */
	const onSubmit = (values) => {
		// 判断state中是否有该订单
		const index = orderIds.indexOf(values.orderId)
		if (index < 0) {
			// state中没有该订单向服务器请求
			Payment.joinOrder(user, values.orderId)
			context.router.push("/order")
		} else {
			context.router.push("/order")
		}
	}
	/**
	 * 待支付按钮点击事件
     */
	const onButton = () => {
		context.router.push("/order")
	}
	return (
		<OrderIdForm onSubmit={onSubmit} onButton={onButton} orderNum={orderIds.length}/>
	)
}

/**
 * 扫描订单页面必须传的属性
 * @type {{setTitle: *}} 页面标题
 * @type {{router: *}}   路由
 */
OrderId.contextTypes = {
	setTitle: React.PropTypes.func.isRequired,
	router: React.PropTypes.object.isRequired
}

/**
 *  该函数作为connect的参数
 * 定义该参数，支付组件将会监听 Redux store 的变化。
 * 该回调函数必须返回一个纯对象，这个对象会与组件的 props 合并。
 * @param state 组件状态
 */
const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds
})

/**
 *  输出react-redux关联之后的支付容器组件
 * 连接支付组件与 Redux store
 * 只要 Redux store 发生改变，mapStateToProps 函数就会被调用。
 */
export default connect(mapStateToProps)(OrderId)