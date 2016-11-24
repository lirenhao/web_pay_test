/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  提交按钮添加跳转到订单页面事件
 * Modified By：Yky
 * Why & What is modified  添加提交按钮、N个待支付按钮完整功能
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 录入商品信息的容器，暂时用做测试后续再修改
 */
import React from "react"
import GoodsForm from "../components/goodsForm/GoodsForm"
import Payment from '../Payment'

/**
 * @type {*[]} 商品录入列表初始化的数据
 */
const items = [
	{
		name: "ONLY修身撞色拼接女针织裙",
		price: 34950,
		quantity: 2
	},
	{
		name: "ONLY圆点荷叶边女修身裙",
		price: 19950,
		quantity: 1
	},
	{
		name: "ONLY棉宽松字母牛仔女外套",
		price: 27450,
		quantity: 1
	}
]

/**
 * 创建订单容器
 * @param props 组件属性
 */
const Goods = (props) => {
    props.setTitle("创建订单")
	const ToOrder = (value)=> {
		Payment.createOrder(props.user, value.goods)
        props.push("/order")
	}
	const waitPay = ()=> {
        props.push("/order")
	}
	return (
		<GoodsForm onSubmit={ToOrder}
		           initialValues={{goods: items}}
		           orderNum={props.orderIds.length}
		           onButton={waitPay}
		/>
	)
}

export default Goods