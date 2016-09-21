/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 定义一个商品录入的form组件
 * 用户点击添加按钮时添加一组商品信息的录入框
 * 点击提交按钮时如果输入框输入的值通过验证触发onSubmit事件
 */
import React from "react"
import {FieldArray, reduxForm} from "redux-form"
import {Form} from "react-bootstrap"
import GoodsField from "./GoodsField"
import s from './Goods.scss'

/**
 * 表单验证，验证输入的值是否符合标准
 * @param values 输入框的值
 */
const validate = (values) => {
    const errors = {}
    if (!values.goods || !values.goods.length) {
        errors.goods = {_error: 'At least one item must be entered'}
    } else {
        const itemsArrayErrors = []
        values.goods.forEach((item, itemIndex) => {
            const itemErrors = {}
            if (!item || !item.name) {
                itemErrors.name = 'Required'
                itemsArrayErrors[itemIndex] = itemErrors
            }
            if (!item || !item.price) {
                itemErrors.price = 'Required'
                itemsArrayErrors[itemIndex] = itemErrors
            } else if (isNaN(Number(item.price))) {
                itemErrors.price = 'Must be a number'
                itemsArrayErrors[itemIndex] = itemErrors
            } else if (Number(item.price) < 1) {
                itemErrors.price = 'Must be at least 1'
                itemsArrayErrors[itemIndex] = itemErrors
            }
            if (!item || !item.quantity) {
                itemErrors.quantity = 'Required'
                itemsArrayErrors[itemIndex] = itemErrors
            } else if (isNaN(Number(item.quantity))) {
                itemErrors.quantity = 'Must be a number'
                itemsArrayErrors[itemIndex] = itemErrors
            } else if (Number(item.quantity) < 1) {
                itemErrors.quantity = 'Must be at least 1'
                itemsArrayErrors[itemIndex] = itemErrors
            }
            return itemErrors
        })
        if (itemsArrayErrors.length) {
            errors.goods = itemsArrayErrors
        }
    }
    return errors
}

const GoodsForm = (props) => {
    const {handleSubmit, onSubmit, orderNum, onButton} = props
    return (
            <Form inline onSubmit={handleSubmit(onSubmit)} >
                <div className={s.marginBottom}>
                    <FieldArray name="goods" component={GoodsField} orderNum={orderNum} onButton={onButton}/>
                </div>
            </Form>
    )
}

/**
 * @type {{onSubmit: *}} 提交表单后的处理事件
 * @type {{orderNum: *}} 商户已有的订单数量
 */

GoodsForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    orderNum: React.PropTypes.number.isRequired,
    onButton: React.PropTypes.func.isRequired
}

export default reduxForm({
    form: "goodsForm",
    validate
})(GoodsForm)