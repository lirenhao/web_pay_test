/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified 添加Panel组件的应用
 * Modified By：Pengfei
 * Why & What is modified 添加展示金额数据的组件
 * 定义营销优惠信息组件 * Modified By：kongli
 * Why & What is modified 添加注释
 */

import React from 'react';
import {Panel, Table, Glyphicon} from 'react-bootstrap'
import AmtDisplay from './AmtDisplay'

/**
 * 优惠信息组件：是订单信息组件(Order)的子组件
 * @param marketing 优惠信息
 */
const Marketing = ({marketing}) => {
    //定义优惠信息面板的标题:为一个字体图标
    const header = (
        <div>
            <Glyphicon glyph="tag"/> 优惠信息
        </div>
    )
    /**
     * 定义优惠信息面板的内容组件
     * @param marketing 优惠信息
     * @returns {XML}
     */
    const content = (marketing) => {
        if (marketing) {
            return (
                <Table>
                    <thead>
                    <tr>
                        <td>优惠金额</td>
                        <td><AmtDisplay amt={marketing.amt}/></td>
                    </tr>
                    <tr>
                        <td>优惠信息</td>
                        <td>{marketing.msg}</td>
                    </tr>
                    </thead>
                </Table>
            )
        } else {
            return (<div>正在加载优惠信息....</div>)
        }
    }
    return (
        <Panel header={header}>
            {content(marketing)}
        </Panel>
    )
}

export default Marketing;