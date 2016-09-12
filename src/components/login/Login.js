/**
 * Author：Yky
 * Create Date：2016/9/9
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 用户输入用户名——选择用户类型（商户、用户）——点击登陆按钮
 * 之后向服务器发送用户id和用户类型，等待接收服务器返回的订单信息，存入state
 */
import React, {Component} from 'react'
import {Form, FormGroup, FormControl, ControlLabel, InputGroup, Glyphicon, Radio, Button} from 'react-bootstrap'
import './Login.scss'

class Login extends Component {
	btnOnClick() {
		this.context.router.push("acqOrderId")
	}

	render() {
		return (
			<div id="login">
				<Form horizontal>
					<FormGroup controlId="userId" bsSize="large">
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="user"/>
							</InputGroup.Addon>
							<ControlLabel className="sr-only">ID</ControlLabel>
							<FormControl type="text" placeholder="请输入用户名"/>
						</InputGroup>
					</FormGroup>
					<Radio>商户</Radio>
					<Radio>用户</Radio>
					<Button bsStyle="info" block onClick={this.btnOnClick.bind(this)}>登陆</Button>
				</Form>
			</div>
		)
	}
}

Login.contextTypes =
{
	router: React.PropTypes.object.isRequired
};


export default Login