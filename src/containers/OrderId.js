/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加订单号表单的容器
 */

import React from "react"
import {connect} from "react-redux"
import {browserHistory} from "react-router"
import Payment from "../Payment"
import OrderIdForm from "../components/orderIdForm/OrderIdForm"

const OrderId = (props) => {
	const {user, orderIds} = props
	const onSubmit = (values) => {
		// 判断state中是否有该订单
		const index = orderIds.indexOf(values.orderId)
		if (index < 0) {
			// state中没有该订单向服务器请求
			Payment.joinOrder(user, values.orderId)
			browserHistory.push("/order")
		} else {
			browserHistory.push("/order")
		}
	}
	const onButton = () => {
		browserHistory.push("/order")
	}
	return (
		<OrderIdForm onSubmit={onSubmit} onButton={onButton} orderNum={orderIds.length}/>
	)
}

const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds
})

export default connect(mapStateToProps)(OrderId)