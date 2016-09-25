/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  定义一个文本输入框组件
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from "react"
import {FormGroup, InputGroup, FormControl} from "react-bootstrap"

/**
 * 定义一个输入框组件，作为商品信息“GoodsField”的子组件。
 * 商品信息输入框组件包括：
 * 传入一个对象，返回带有标签和输入框组成的组件组件
 * @param input：是指输入框input标签的属性
 * @param label:是指标签名称
 * @param type：是指组件类型
 * @param placeholder：是指输入框的提示信息
 * @param error：是bool类型值，是指验证是否错误
 */
const GoodsInput = ({input, label, type, placeholder, meta: {error}}) => {
    //定义验证信息
    let validationState
    //判断input输入框输入数据是否验证成功。error：是bool类型值，是指验证是否错误
    if(error){
        //当error为true,则验证状态为警告
        validationState = "warning"
    } else {
        //当error为false,则验证状态为成功
        validationState = "success"
    }
    // <FormControl.Feedback />:是指表单验证的回馈图标
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