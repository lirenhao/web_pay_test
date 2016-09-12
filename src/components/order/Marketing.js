/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 定义营销优惠信息组件
 */

import React from 'react';
import {Table,Glyphicon} from 'react-bootstrap'

class Marketing extends React.Component {
    render() {
        if (this.props.marketing) {
            return (
                <div>
                    <div>
                        <Glyphicon glyph="tag"/>
                        优惠信息
                    </div>
                    <Table>
                        <tbody>
                        <tr>
                            <td>优惠金额</td>
                            <td>{this.props.marketing.amt}</td>
                        </tr>
                        <tr>
                            <td>优惠信息</td>
                            <td>{this.props.marketing.msg}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            )
        } else {
            return (<div>正在加载优惠信息....</div>);
        }
    }
}

export default Marketing;