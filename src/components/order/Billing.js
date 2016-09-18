/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified 添加Panel组件的应用
 * 定义金额结算信息组件
 */
import React from 'react';
import {Panel, Table, Glyphicon} from 'react-bootstrap';

const Billing = ({items, marketing}) => {
    const header = (
        <div>
            <Glyphicon glyph="yen"/> 结算
        </div>
    )
    const content = (items, marketing) => {
        if (items && marketing) {
            const totalAmt = items.reduce((p, q)=>p + q.price * q.quantity, 0);
            return (
                <Table>
                    <tbody>
                    <tr>
                        <td>总价</td>
                        <td>{totalAmt}</td>
                    </tr>
                    <tr>
                        <td>优惠</td>
                        <td>{marketing.amt}</td>
                    </tr>
                    <tr>
                        <td>结算</td>
                        <td>{totalAmt - marketing.amt}</td>
                    </tr>
                    </tbody>
                </Table>
            )
        } else {
            return (<div>优惠信息加载后才能结算</div>)
        }
    }

    return (
        <Panel header={header}>
            {content(items, marketing)}
        </Panel>
    )
}


export default Billing;