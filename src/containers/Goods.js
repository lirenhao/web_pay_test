/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  提交按钮添加跳转到订单页面事件
 * 录入商品信息的容器，暂时用做测试后续再修改
 */

import React from "react"
import {connect} from "react-redux"
import GoodsForm from "../components/goodsForm/GoodsForm"
import { browserHistory} from 'react-router'

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

const ToOrder = ()=>{
    browserHistory.push("order/1")
}

const Goods = (props) => (
     <GoodsForm onSubmit={ToOrder} initialValues={{goods: items}} orderNum={2}/>
);

export default connect()(Goods)