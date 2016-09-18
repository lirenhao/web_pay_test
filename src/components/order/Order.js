/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 组合订单页面的所需的组件
 */

import React from 'react'
import OrderInfo from './OrderInfo'
import Marketing from './Marketing'
import Billing from './Billing'
import PayButton from './PayButton'
import {Tabs, Tab} from 'react-bootstrap';

const Order = (props)=> {
    const {orderIds, order, marketing, activeKey, onCancel, onReqPay} = props
    const tabs = orderIds.map(
        (orderId, index)=>(
            <Tab eventKey={index} title={orderId} key={index}>
                <div>
                    <OrderInfo items={order[orderId].items}/>
                    <Marketing marketing={marketing[orderId]}/>
                    <Billing items={order[orderId].items} marketing={marketing[orderId]}/>
                    <PayButton
                        orderId={orderId}
                        canCancel={true}
                        canPay={false}
                        onCancel={onCancel}
                        onReqPay={onReqPay}/>
                </div>
            </Tab>
        )
    )
    return (
        <Tabs defaultActiveKey={activeKey} id="OrderSelect">
            {tabs}
        </Tabs>
    )
}

Order.propTypes = {
    orderIds: React.PropTypes.array.isRequired,
    order: React.PropTypes.object.isRequired,
    marketing: React.PropTypes.object.isRequired,
    activeKey: React.PropTypes.number.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onReqPay: React.PropTypes.func.isRequired
}

export default Order;