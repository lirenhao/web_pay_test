/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 定义一个文本输入框组件
 */
import React from "react"
import {FormGroup, InputGroup, FormControl} from "react-bootstrap"

const GoodsInput = ({input, label, type, placeholder, meta: {touched, error}}) => {
    let validationState
    if(error){
        validationState = "warning"
    } else {
        validationState = "success"
    }
    return (
        <FormGroup controlId={input.name} validationState={validationState}>
            <InputGroup>
                <InputGroup.Addon>{label}</InputGroup.Addon>
                <FormControl {...input} type={type} placeholder={placeholder}/>
            </InputGroup>
            <FormControl.Feedback />
        </FormGroup>
    )
}

export default GoodsInput