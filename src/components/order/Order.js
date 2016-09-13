/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 组合订单页面的所需的组件
 */

import React from 'react'
import ReactDOM from 'react-dom'
import OrderInfo from './OrderInfo'
import OrderSelect from './OrderSelect'
import Marketing from './Marketing'
import Billing from './Billing'
import {ButtonGroup, Button,} from 'react-bootstrap';

var Order = ({data, orderSelectClick})=> {
    return (
        <div>
            <div>
                <OrderSelect orderIds={data.orderIds} handleClick={orderSelectClick}/>
                <OrderInfo items={data.items} orderId={data.orderId}/>
                <Marketing marketing={data.marketing}/>
                <Billing items={data.items} marketing={data.marketing}/>
            </div>
            <div>
                //TODO 添加支付和取消按钮
            </div>
        </div>
    )
}

export default Order;