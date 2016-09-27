/**
 * Author：pengfei
 * Create Date：2016/9/20
 * Modified By：pengfei
 * Why & What is modified：添加商品单价组件
 * Modified By：kongli
 * Why & What is modified 添加注释
 */

import React from 'react'

/**
 * 商品单价组件，是商品列表（GoodsItem）的子组件
 * amt 商品单价(单位为分)
 */
const AmtDisplay =({amt})=>{
    return(
        <span>{amt/100} 元</span>
    )
}

export default AmtDisplay