/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 录入商品信息的容器，暂时用做测试后续再修改
 */

import React from "react"
import {connect} from "react-redux"
import GoodsForm from "../components/goodsForm/GoodsForm"

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

const Goods = (props) => (
     <GoodsForm onSubmit={(values) => console.log(values)} orderNum={1} initialValues={{goods: items}}/>
);

export default connect()(Goods)