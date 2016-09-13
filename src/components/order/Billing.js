/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 定义金额结算信息组件
 */
import React from 'react';
import {Table, Glyphicon} from 'react-bootstrap';

class Billing extends React.Component {
    render() {
        if (this.props.items && this.props.marketing) {
            let totalAmt = this.props.items.reduce((p, q)=>p + q.price * q.quantity, 0);
            return (
                <div>
                    <div>
                        <Glyphicon glyph="yen"/>
                        结算
                    </div>
                    <Table>
                        <tbody>
                        <tr>
                            <td>总价</td>
                            <td>{totalAmt}</td>
                        </tr>
                        <tr>
                            <td>优惠</td>
                            <td>{this.props.marketing.amt}</td>
                        </tr>
                        <tr>
                            <td>结算</td>
                            <td>{totalAmt - this.props.marketing.amt}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return null
        }
    }
}


export default Billing;