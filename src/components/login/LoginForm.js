/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 用户输入用户名——选择用户类型（商户、用户）——点击登陆按钮
 */
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon, Button} from 'react-bootstrap'
import s from './Login.scss'

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

const LoginForm = (props) => {
	const {handleSubmit, onLogin, pristine, submitting} = props
	// TODO 暂时不知道如何给userType设置默认值，暂且设置在容器中
	return (
		<div className={s.login}>
			<Form onSubmit={handleSubmit(onLogin)} className={s.form}>
				<Field name="userId" component={userIdField}/>
				<Field name="userType" component={userTypeField}/>
				<Button className={s.logBtn} bsStyle="info" block type="submit" disabled={pristine || submitting}>登陆</Button>
			</Form>
		</div>
	)
}

LoginForm.propTypes = {
	onLogin: React.PropTypes.func.isRequired
}

export default reduxForm({
	form: "loginForm"
})(LoginForm)