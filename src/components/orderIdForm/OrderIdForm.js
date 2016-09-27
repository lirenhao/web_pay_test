/**
 * Author：liRenhao
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：yky
 * Why & What is modified  添加如果订单号为空时的验证
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 添加输入订单号的表单
 */
import React from "react"
import {Field, reduxForm} from "redux-form"
import {Form, FormGroup, InputGroup, FormControl, Button, Glyphicon} from "react-bootstrap"

/**
 * 描述：表单验证时要验证的数据规则
 * @param values 表单验证的值
 */
const validate = values  => {
	const error = {}
	if (!values.orderId) {
		error.orderId = 'Required'
	} else if (values.orderId.trim() == "") {
        error.orderId = 'Required'
    }
	return error
}

/**
 * 自定义订单号匹配表单验证组件：包括订单号输入框、加入按钮
 */
const OrderIdField = ({input, meta:{touched, error}}) => (
	<FormGroup controlId="orderId">
		<InputGroup>
			<InputGroup.Addon>
				<Glyphicon glyph="qrcode"/>
			</InputGroup.Addon>
			<FormControl {...input} type="text" placeholder="订单ID"/>
			<InputGroup.Button>
				<Button type="submit" style={{"height": "34px"}} disabled={error ? true : false}>加入</Button>
			</InputGroup.Button>
		</InputGroup>
	</FormGroup>
)

/**
 * 扫描订单组件
 * @param props 调用组件者传递给组件的属性
 */
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