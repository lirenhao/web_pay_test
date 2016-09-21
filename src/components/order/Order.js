/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 删除订单时展示第一个tab
 * 组合订单页面的所需的组件
 */

import React from 'react'
import OrderInfo from './OrderInfo'
import Marketing from './Marketing'
import Billing from './Billing'
import PayButton from './PayButton'
import {Tabs, Tab} from 'react-bootstrap';
import s from './Order.scss'

class Order extends React.Component {
    constructor(props) {
        super(props)
        this.state = {key: props.orderIds.length}
    }

    handleSelect(key) {
        this.setState({key})
    }

    handleCancel(orderId) {
        this.props.onCancel(orderId)
        if (this.state.key > 0) {
            this.setState({key: this.state.key - 1})
        }
    }

    render() {
        const {orderIds, order, marketing, onReqPay, canCancel} = this.props
        const tabItems = orderIds.map(
            (orderId, index) => (
                <Tab eventKey={index} title={orderId} key={index}>
                    <div className={s.marginBottom}>
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
                  activeKey={orderIds[this.state.key] ? this.state.key : this.state.key - 1}
                  onSelect={(key) => this.handleSelect(key)}>
                {tabItems}
            </Tabs>
        )
    }
}

Order.propTypes = {
    orderIds: React.PropTypes.array.isRequired,
    order: React.PropTypes.object.isRequired,
    marketing: React.PropTypes.object.isRequired,
    onReqPay: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    canCancel: React.PropTypes.bool.isRequired
}

export default Order