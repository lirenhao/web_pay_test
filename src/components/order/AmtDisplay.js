/**
 * Author：pengfei
 * Create Date：2016/9/20
 * Modified By：pengfei
 * Why & What is modified
 * <文件描述>
 */ 


import React from 'react'


const AmtDisplay =({amt})=>{
    return(
        <span>{amt/100} 元</span>
    )
}

export default AmtDisplay