/**
 * Author：KL
 * Created by likon on 2016/9/13.
 * Modified By：KL
 * Why & What is modified  <修改原因描述>
 * 添加支付表单容器
 * 初始化数据：传递订单的索引号，初始化为第一个订单；初始化支付结果下拉菜单值为成功
 * 提交支付表单时：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 * 取消支付时，如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 */
import React from "react"
import PayForm from '../components/payForm/PayForm'
import {browserHistory} from 'react-router'

var state = {
    user: {
        userId: "1",
        userType: "USER"
    },
    orderIds: [1, 2],
    order: {
        1: {
            orderId: "1",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ]
        },
        2: {
            orderId: "2",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ]
        }
    },
    marketing: {
        1: {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"},
        2: {orderId: "2", amt: 58650, msg: "测试优惠, 一律5折"}
    }
};

const index = 0;

const Pay=(props)=>(
    <PayForm initialValues={{orderId: state.orderIds[index], result: "0"}}
             onSubmit={(values) => { console.log(values) }}
             onCancel={(values) => {console.log(values) }}
             orderIds={state.orderIds}
             order={state.order}
             marketing={state.marketing}
             index={index}
    />
)

export default Pay