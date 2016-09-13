/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 定义商品信息展示列表组件
 */
import React from 'react';
import Product from './GoodsItem';
import {Table} from 'react-bootstrap';


class GoodsItems extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                <tr>
                    <td>名称</td>
                    <td>单价</td>
                    <td>数量</td>
                </tr>
                </thead>
                <tbody>
                {this.props.items.map(p=>(<Product {...p}/>))}
                </tbody>
            </Table>
        )
    }
}
export default GoodsItems
