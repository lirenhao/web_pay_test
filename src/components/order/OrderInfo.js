/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 订单信息组件封装、商品信息列表其他地方有共用，所以单独封装一个订单商品列表组件
 */

import React from 'react'
import GoodsItems from './GoodsItems'
import {Panel} from 'react-bootstrap'

class OrderInfo extends React.Component {

    render() {
        if (this.props.items) {
            return (
                <div>
                    <h4>
                        <span className="label label-info">
                    <span className="glyphicon glyphicon-pushpin"></span>
                            {this.props.orderId}</span>
                    </h4>
                    <Panel header="订单信息">
                        <GoodsItems items={this.props.items || []}/>
                    </Panel>
                </div>
            )
        }
        else
            return (<div role="alert">正在加载订单信息...</div>);
    }
}


export default OrderInfo;
