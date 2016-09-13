/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 定义一组商品信息组件
 */
import React from 'react'

const goodsItem = ({name,prise,quantity})=>(
    <div>
        <tr>
            <td>{name}</td>
            <td>{prise}</td>
            <td>{quantity}</td>
        </tr>
    </div>
)

export default goodsItem