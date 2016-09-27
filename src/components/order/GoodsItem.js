/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：Pengfei
 * Why & What is modified 添加展示金额数据的组件
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 定义一组商品信息组件
 */

import React from 'react'
import AmtDisplay from './AmtDisplay'

/**
 * 单个商品信息组件：包括商品名称、单价、数量
 * name 商品名称
 * price 单价
 * quantity 数量
 */
const goodsItem = ({name,price,quantity})=>(
        <tr>
            <td>{name}</td>
            <td><AmtDisplay amt={price}/></td>
            <td>{quantity}</td>
        </tr>
)

export default goodsItem