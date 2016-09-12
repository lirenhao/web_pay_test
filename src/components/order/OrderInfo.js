/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */

import React from 'react'
import ProductItems from './ProductItems'


class OrderInfo extends React.Component {

    render() {
        if (this.props.items) {
            return (
                <div>
                    <h4>
                        <span className="label label-info">
                    <span className="glyphicon glyphicon-pushpin"></span>
                            {this.props.items.orderId}</span>
                    </h4>
                    <div className="panel panel-info panel-sm">
                        <div className="panel-heading">
                            <label>订单信息</label>
                        </div>
                        <ProductItems items={this.props.items || []}/>
                    </div>
                </div>
            )
        }
        else
            return (<div role="alert">正在加载订单信息...</div>);
    }
}
