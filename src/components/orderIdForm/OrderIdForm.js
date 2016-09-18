/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加订单号的表单
 */

import React from "react"
import {Field, reduxForm} from "redux-form"
import {Form, FormGroup, InputGroup, FormControl, Button, Glyphicon} from "react-bootstrap"

const validate = values  => {
    const error = {}
    if (!values.orderId) {
        error.orderId = 'Required'
    }
    return error
}

const OrderIdField = ({input}) => (
    <FormGroup controlId="orderId">
        <InputGroup>
            <InputGroup.Addon>
                <Glyphicon glyph="qrcode"/>
            </InputGroup.Addon>
            <FormControl {...input} type="text" placeholder="订单ID"/>
            <InputGroup.Button>
                <Button type="submit" style={{"height": "34px"}}>加入</Button>
            </InputGroup.Button>
        </InputGroup>
    </FormGroup>
)

const OrderIdForm = (props) => {
    const {handleSubmit, onSubmit, onButton, orderNum} = props
    const button = (orderNum) => {
        if(orderNum > 0)
            return (
                <Button bsStyle="info" onClick={onButton}>
                    <span className="badge">{orderNum}</span>
                    &nbsp;个待支付
                </Button>
            )
        else
            return (<p/>)
    }
    return (
        <Form inline onSubmit={handleSubmit(onSubmit)}>
            <Field name="orderId" component={OrderIdField}/>
            <p/>
            {button(orderNum)}
        </Form>
    )
}

export default reduxForm({
    form: "orderIdForm",
    validate
})(OrderIdForm)