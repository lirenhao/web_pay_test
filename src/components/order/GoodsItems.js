/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  修改引入的组件（GoodsItem）名称
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 定义商品信息展示列表组件
 */
import React from 'react';
import GoodsItem from './GoodsItem';
import {Table} from 'react-bootstrap';

/**
 * 订单中全部的商品信息table组件：是订单商品信息组件(OrderInfo)的子组件
 * items:是指商品信息数组，用map对items数组做映射，将数组中的元素给单个商品信息组件（GoodsItem）赋值
 */
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
                {this.props.items.map((item, index)=>(<GoodsItem key={index} {...item}/>))}
                </tbody>
            </Table>
        )
    }
}
export default GoodsItems
