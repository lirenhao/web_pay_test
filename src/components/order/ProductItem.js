/**
 * Author：pengfei
 * Create Date：2016/9/9
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */ 
import React from 'react'

const productItem = ({name,prise,quantity})=>(
    <div>
        <tr>
            <td>{name}</td>
            <td>{prise}</td>
            <td>{quantity}</td>
        </tr>
    </div>
)

export default productItem