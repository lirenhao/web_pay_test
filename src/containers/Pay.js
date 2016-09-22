/**
 * Author：KL
 * Created by likon on 2016/9/13.
 * Modified By：KL
 * Why & What is modified  添加支付页面的容器
 * Why & What is modified 初始化支付结果下拉菜单：成功
 * Why & What is modified 点击支付按钮：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 * Why & What is modified 点击取消支付按钮：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 * Modified By：Pengfei
 * Why & What is modified  添加支付确认和支付取消事件，以及配置mapStateToProps
 * Modified By：liRenhao
 * Why & What is modified  添加商户取消订单时用户跳转的事件
 */
import React from "react"
import PayForm from '../components/payForm/PayForm'
import {connect} from "react-redux"
import {browserHistory} from 'react-router'
import Const from "../constants"
import Payment from "../Payment"

const TerminalType = Const.TerminalType

const Pay = (props, context)=> {
	context.setTitle("支付")
	const {user, orderIds, order, marketing, params: {index}} = props

	const onSubmitHandle = (result) => {
		Payment.payResult(user, result)
		if (user.userType == TerminalType.USER)
			browserHistory.push("/orderId")
		else
			browserHistory.push("/goods")
	}

	const onCancelHandle = (orderId) => {
		Payment.giveUpPay(user, orderId)
		if (user.userType == TerminalType.USER)
			browserHistory.push("/orderId")
		else
			browserHistory.push("/goods")
	}

	const onLinkHandle = () => {
		if (user.userType == TerminalType.USER)
			browserHistory.push("/orderId")
		else
			browserHistory.push("/goods")
	}

	return <PayForm initialValues={{orderId: orderIds[index], state: "0"}}
	                onSubmit={onSubmitHandle}
	                onCancel={()=>onCancelHandle(orderIds[index])}
					onLink={onLinkHandle}
	                orderIds={orderIds}
	                order={order}
	                marketing={marketing}
	                index={Number(index)}
	/>
}

Pay.contextTypes = {setTitle: React.PropTypes.func.isRequired}

const mapStateToProps = (state)=> ({
	user: state.user,
	orderIds: state.orderIds,
	order: state.order,
	marketing: state.marketing
})

export default connect(mapStateToProps)(Pay)