/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 添加订单号表单的容器
 */

import React from "react"
import Payment from "../Payment"
import OrderIdForm from "../components/orderIdForm/OrderIdForm"

/**
 * 定义扫描订单页面容器
 * @param props 组件属性
 */
const OrderId = (props) => {
    props.setTitle("扫描订单")
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
            props.push("/order")
		} else {
            props.push("/order")
		}
	}
	/**
	 * 待支付按钮点击事件
     */
	const onButton = () => {
        props.push("/order")
	}
	return (
		<OrderIdForm onSubmit={onSubmit} onButton={onButton} orderNum={orderIds.length}/>
	)
}

export default OrderId