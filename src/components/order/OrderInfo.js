/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 订单信息组件封装、商品信息列表其他地方有共用，所以单独封装一个订单商品列表组件
 */

import React from 'react'
import GoodsItems from './GoodsItems'
import {Panel} from 'react-bootstrap'

/**
 * 订单商品信息组件：对GoodsItems组件的封装，是订单信息组件(Order)的子组件，同时也为支付界面提供子组件支持
 */

const OrderInfo = ({items})=> {
    if (this.props.items) {
        return (
            <div>
                <Panel header="订单信息">
                    <GoodsItems items={this.props.items || []}/>
                </Panel>
            </div>
        )
    }
    else
        return (<div role="alert">正在加载订单信息...</div>);
}

OrderInfo.propTypes = {
    items: React.PropTypes.arrayOf(
        React.PropTypes.shape(
            {
                name: React.PropTypes.string,
                price: React.PropTypes.number,
                quantity: React.PropTypes.number
            }
        )
    )
}

export default OrderInfo;
