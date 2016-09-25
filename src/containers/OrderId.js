/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加订单号表单的容器
 */

import React from "react"
import {connect} from "react-redux"
import Payment from "../Payment"
import OrderIdForm from "../components/orderIdForm/OrderIdForm"

const OrderId = (props, context) => {
	context.setTitle("扫描订单")
	const {user, orderIds} = props
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
	const onButton = () => {
		context.router.push("/order")
	}
	return (
		<OrderIdForm onSubmit={onSubmit} onButton={onButton} orderNum={orderIds.length}/>
	)
}

OrderId.contextTypes = {
	setTitle: React.PropTypes.func.isRequired,
	router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds
})

export default connect(mapStateToProps)(OrderId)