/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加订单号表单的容器
 */

import React from "react"
import {connect} from "react-redux"
import OrderIdForm from "../components/orderIdForm/OrderIdForm"

const OrderId = (props) => (
    <OrderIdForm onSubmit={(values) => console.log(values)} orderNum={1} initialValues={{orderId: "111"}}/>
);

export default connect()(OrderId)