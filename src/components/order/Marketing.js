/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified 添加Panel组件的应用
 * 定义营销优惠信息组件
 */

import React from 'react';
import {Panel, Table, Glyphicon} from 'react-bootstrap'

const Marketing = ({marketing}) => {
    const header = (
        <div>
            <Glyphicon glyph="tag"/> 优惠信息
        </div>
    )
    const content = (marketing) => {
        if (marketing) {
            return (
                <Table>
                    <tbody>
                    <tr>
                        <td>优惠金额</td>
                        <td>{marketing.amt}</td>
                    </tr>
                    <tr>
                        <td>优惠信息</td>
                        <td>{marketing.msg}</td>
                    </tr>
                    </tbody>
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