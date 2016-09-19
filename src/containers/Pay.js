/**
 * Author：KL
 * Created by likon on 2016/9/13.
 * Modified By：KL
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  添加支付确认和支付取消事件，以及配置mapStateToProps
 * 添加支付表单容器
 * 初始化数据：传递订单的索引号，初始化为第一个订单；初始化支付结果下拉菜单值为成功
 * 提交支付表单时：如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 * 取消支付时，如果用户角色为商户，则页面跳转到添加商品信息页面；如果为用户，则页面跳转到扫描订单页面
 */
import React from "react"
import PayForm from '../components/payForm/PayForm'
import {connect} from "react-redux"
import {browserHistory} from 'react-router'
import Const from "../constants"
import Payment from "../Payment"

const TerminalType = Const.TerminalType;

const Pay = (props)=> {
    const {user, orderIds, order, marketing, params: {index}} = props

    var onSubmitHandle = (result) => {
        Payment.payResult(user, result);
        if (user.userType == TerminalType.USER)
            browserHistory.push("/acqOrderId");
        else browserHistory.push("/Goods");
    };

    var onCancelHandle = (orderId) => {
        Payment.giveUpPay(user, orderId)
        if (user.userType == TerminalType.USER)
            browserHistory.push("/acqOrderId");
        else browserHistory.push("/Goods");
    };

    return <PayForm initialValues={{orderId: orderIds[index], state: "0"}}
                    onSubmit={onSubmitHandle}
                    onCancel={()=>onCancelHandle(orderIds[index])}
                    orderIds={orderIds}
                    order={order}
                    marketing={marketing}
                    index={Number(index)}
    />
};

const mapStateToProps = (state)=> ({
    user: state.user,
    orderIds: state.orderIds,
    order: state.order,
    marketing: state.marketing
})


export default connect(mapStateToProps)(Pay)