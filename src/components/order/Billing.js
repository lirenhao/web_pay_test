/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified 添加Panel组件的应用
 * Modified By：Pengfei
 * Why & What is modified 添加展示金额数据的组件
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 定义金额结算信息组件
 */

import React from 'react';
import {Panel, Table, Glyphicon} from 'react-bootstrap';
import AmtDisplay from './AmtDisplay'

/**
 * 结算信息组件：是订单信息组件(Order)的子组件
 * @param items  商品信息
 * @param marketing 优惠信息
 */
const Billing = ({items, marketing}) => {
    //定义结算信息面板的标题:为一个字体图标
    const header = (
        <div>
            <Glyphicon glyph="yen"/> 结算
        </div>
    )

    /**
     * 定义结算信息面板的内容组件:
     * @param items 订单信息
     * @param marketing 优惠信息
     */
    const content = (items, marketing) => {
        if (items && marketing) {
            //items作为一个对象需要做REDUX，redux做迭代用
            //reduce((r, v)传入两个参数（以前汇总金额和当前元素），0为幺元，返回新的汇总金额
            const totalAmt = items.reduce((r, v)=>r + v.price * v.quantity, 0);
            return (
                <Table>
                    <thead>
                    <tr>
                        <td>总价</td>
                        <td><AmtDisplay amt={totalAmt}/></td>
                    </tr>
                    <tr>
                        <td>优惠</td>
                        <td><AmtDisplay amt={marketing.amt}/></td>
                    </tr>
                    <tr>
                        <td>结算</td>
                        <td><AmtDisplay amt={totalAmt - marketing.amt}/></td>
                    </tr>
                    </thead>
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