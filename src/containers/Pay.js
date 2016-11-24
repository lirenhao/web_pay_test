/**
 * Author：KL
 * Created by likon on 2016/9/13.
 * Modified By：KL
 * Why & What is modified 添加支付页面的容器
 * Modified By：Pengfei
 * Why & What is modified  添加支付确认和支付取消事件，以及配置mapStateToProps
 * Modified By：liRenhao
 * Why & What is modified  添加商户取消订单时用户跳转的事件
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 添加支付页面的容器
 * 初始化支付结果下拉菜单：成功
 * 点击支付按钮：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 * 点击取消支付按钮：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 */
import React from "react"
import PayForm from '../components/payForm/PayForm'
import Const from "../constants"
import Payment from "../Payment"

const TerminalType = Const.TerminalType

/**
 * 定义支付页面的容器：业务逻辑的处理和初始化数据
 * @param props 外组件属性
 */
const Pay = (props)=> {
    props.setTitle("支付")
	//定义属性传递过来参数
	const {user, orderIds, order, marketing, params: {index}} = props

	/**
	 * 定义提交支付结果事件
	 * @param result 支付结果(支付成功、支付失败)
     */
	const onSubmitHandle = (result) => {
		//客户端，将用户信息、支付结果请求发送给服务端
		Payment.payResult(user, result)
		//终端类型为用户的话，则页面跳转到“扫描订单页面”；为商户的话，则跳转到“创建订单页面”
		if (user.userType == TerminalType.USER)
            props.push("/orderId")
		else
            props.push("/goods")
	}

	/**
	 * 定义取消支付事件
	 * @param orderId 订单ID
     */
	const onCancelHandle = (orderId) => {
		//客户端将用户信息、订单号请求发送给服务端
		Payment.giveUpPay(user, orderId)
		//终端类型为用户的话，则页面跳转到“扫描订单页面”；为商户的话，则跳转到“创建订单页面”
		if (user.userType == TerminalType.USER)
            props.push("/orderId")
		else
            props.push("/goods")
	}

	/**
	 * 页面跳转事件
     */
	const onLinkHandle = () => {
		//终端类型为用户的话，则页面跳转到“扫描订单页面”；为商户的话，则跳转到“创建订单页面”
		if (user.userType == TerminalType.USER)
            props.push("/orderId")
		else
            props.push("/goods")
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

export default Pay