/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 删除订单时展示第一个tab
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 组合订单页面的所需的组件
 */

import React from 'react'
import OrderInfo from './OrderInfo'
import Marketing from './Marketing'
import Billing from './Billing'
import PayButton from './PayButton'
import {Tabs, Tab} from 'react-bootstrap';
import style from './Order.scss'

/**
 * 是指订单信息组件：包括订单商品信息组件(OrderInfo)、优惠信息组件(Marketing)、结算信息组件(Billing)、支付和取消按钮组件（PayButton）
 */
class Order extends React.Component {

    /**
     * 通过constructor构造函数设置state，初始化组件的状态：key为orderIds数组的长度
     * @param props
     */
    constructor(props) {
        super(props)
        this.state = {key: props.orderIds.length}
    }

    /**
     * Tabs的选中事件
     * @param key 订单数组的索引
     */
    handleSelect(key) {
        this.setState({key})
    }

    /**
     * 取消订单事件
     * @param orderId 订单ID
     */
    handleCancel(orderId) {
        this.props.onCancel(orderId)
        if (this.state.key > 0) {
            this.setState({key: this.state.key - 1})
        }
    }

    render() {
        /**
         *定义订单信息组件的属性
         */
        const {orderIds, order, marketing, onReqPay, canCancel} = this.props
        const tabItems = orderIds.map(
            (orderId, index) => (
                <Tab eventKey={index} title={orderId} key={index}>
                    <div className={style.marginBottom}>
                        <OrderInfo items={order[orderId].items}/>
                        <Marketing marketing={marketing[orderId]}/>
                        <Billing items={order[orderId].items} marketing={marketing[orderId]}/>
                    </div>
                    <PayButton
                        orderId={orderId}
                        canCancel={canCancel}
                        onCancel={() => this.handleCancel(orderId)}
                        canPay={marketing[orderId] ? true : false}
                        onReqPay={onReqPay}/>
                </Tab>
            )
        )
        return (
            <Tabs id="OrderSelect"
                  activeKey={orderIds[this.state.key] ? this.state.key : orderIds.length - 1}
                  onSelect={(key) => this.handleSelect(key)}>
                {tabItems}
            </Tabs>
        )
    }
}

/**
 * 使用订单信息组件时，必传的属性
 * @type {{orderIds: *}} 订单号数组
 * @type {{order: *}}    订单信息对象
 * @type {{marketing: *}} 优惠信息对象
 * @type {{onReqPay: *}} 支付请求事件
 * @type {{onCancel: *}} 取消订单事件
 * @type {{canCancel: *}} 是否有取消按钮
 */
Order.propTypes = {
    orderIds: React.PropTypes.array.isRequired,
    order: React.PropTypes.object.isRequired,
    marketing: React.PropTypes.object.isRequired,
    onReqPay: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    canCancel: React.PropTypes.bool.isRequired
}

export default Order