/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React from 'react';
import Product from './ProductItem';


class ProductItems extends React.Component {
    render() {
        return (
            <table>
                <tr>
                    <td>名称</td>
                    <td>单价</td>
                    <td>数量</td>
                </tr>
                {this.props.items.map(p=>(<Product {...p}/>))}
            </table>
        )
    }
}

export default ProductItems
