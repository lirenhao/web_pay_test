/**
 * Author：pengfei
 * Create Date：2016/9/12
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 定义订单页面上的订单编号组件
 */


import React from 'react';
import {Nav} from 'react-bootstrap';


class OrderSelect extends React.Component {
    render() {
        var idInfo = this.props.orderId.map(id =>
            <li role="presentation" key={id}>
                <a href="javascript:void(0)" onClick={this.props.handleClick(id)}>
                    {id}</a>
            </li>
        );
        return (
            <Nav bsStyle="tabs">
                {idInfo}
            </Nav>
        )
    }
}

export default OrderSelect;