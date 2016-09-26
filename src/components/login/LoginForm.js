/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 用户输入用户名——选择用户类型（商户、用户）——点击登陆按钮
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon, Button} from 'react-bootstrap'
import style from './Login.scss'

const userIdField = ({input, label, type, meta: {touched, error}}) => (
	<FormGroup controlId="userId" bsSize="large">
		<InputGroup>
			<InputGroup.Addon>
				<Glyphicon glyph="user"/>
			</InputGroup.Addon>
			<ControlLabel className="sr-only">ID</ControlLabel>
			<FormControl
				{...input}
				type="text"
				placeholder="请输入用户名"/>
		</InputGroup>
	</FormGroup>
)

/**
 * 用户类型自定义组件
 * @param input：是指input属性
 */
const userTypeField = ({input}) => (
	<div className="btn-group btn-group-justified" data-toggle="buttons">
		<div className="btn btn-default active">
			<input {...input} type="radio" value="MERCHANT"/>商户端
		</div>
		<label className="btn btn-default">
			<input {...input} type="radio" value="USER"/>用户端
		</label>
	</div>
)

/**
 * 登陆验证表单：包括用户名输入框组件、用户类型单选框组件、登陆按钮
 * @param props 登陆表单组件的属性
 */
const LoginForm = (props) => {
	//定义登陆组件的四个属性
	//handleSubmit:是指redux-form的处理表单事件
	//onLogin:提交登陆信息表单事件
	//pristine:是指禁用登陆表单提交的值
	//submitting：是指禁用登陆表单提交的值
	const {handleSubmit, onLogin, pristine, submitting} = props
	return (
		<div className={style.login}>
			<Form onSubmit={handleSubmit(onLogin)} className={style.form}>
				<Field name="userId" component={userIdField}/>
				<Field name="userType" component={userTypeField}/>
				<Button className={style.logBtn} bsStyle="info" block type="submit" disabled={pristine || submitting}>登陆</Button>
			</Form>
		</div>
	)
}

/**
 *登陆组件必须要传递的数据
 * @type {{onLogin: *}}:提交登陆表单信息事件
 */
LoginForm.propTypes = {
	onLogin: React.PropTypes.func.isRequired
}

export default reduxForm({
	form: "loginForm"
})(LoginForm)