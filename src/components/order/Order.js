/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 组合订单页面的所需的组件
 */

import React from 'react'
import OrderInfo from './OrderInfo'
import OrderSelect from './OrderSelect'
import Marketing from './Marketing'
import Billing from './Billing'
import PayButton from './PayButton'
import {Tabs, Tab} from 'react-bootstrap';

const Order = ({data,index})=> {

    const tabs = data.orderIds.map(
        (p, i)=>(
            <Tab eventKey={i} title={p} key={i}>
                <div>
                    <OrderInfo items={data.order[p].items}/>
                    <Marketing marketing={data.marketing[p]}/>
                    <Billing items={data.order[p].items} marketing={data.marketing[p]}/>
                    <PayButton canCancel={false} canPay={false} onCancel={()=>{alert("onCancel")}} onReqPay={()=>{alert("onReqPay")}}/>
                </div>
            </Tab>
        )
    )

    return (
        <Tabs defaultActiveKey={Number(index)||0} id="OrderSelect">
            {tabs}
        </Tabs>
    )
}

export default Order;