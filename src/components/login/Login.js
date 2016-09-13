/**
 * Author：Yky
 * Create Date：2016/9/9
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 用户输入用户名——选择用户类型（商户、用户）——点击登陆按钮
 * 之后向服务器发送用户id和用户类型，等待接收服务器返回的订单信息，存入state
 */
import React, {Component} from 'react'
import {
	Form,
	FormGroup,
	FormControl,
	ControlLabel,
	InputGroup,
	Glyphicon,
	Button,
	ButtonGroup
} from 'react-bootstrap'
import './Login.scss'

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: "",
			userType: "MERCHANT"
		};
	}

	onLogin() {
		if (this.state.userType == "USER") {
			this.context.router.push("acqOrderId")
		}
	}

	idChange(e) {
		this.setState({userId: e.target.value});
	}

	showState() {
		console.log(this.state)
	}

	typeChangeMerchant(e) {
		this.setState({userType: "MERCHANT"});
	}

	typeChangeUser(e) {
		this.setState({userType: "USER"});
	}

	render() {
		return (
			<div id="login">
				<Form id="form">
					<FormGroup controlId="userId" bsSize="large">
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="user"/>
							</InputGroup.Addon>
							<ControlLabel className="sr-only">ID</ControlLabel>
							<FormControl
								type="text"
								placeholder="请输入用户名"
								value={this.state.userId}
								onChange={this.idChange.bind(this)}/>
						</InputGroup>
						<ButtonGroup id="lBtn" aria-label="登录类型" data-toggle="buttons" justified>
							<ButtonGroup>
								<Button onClick={this.typeChangeMerchant.bind(this)} active>
									<input type="radio" defaultValue="MERCHANT" defaultChecked={true}/>
									商户端
								</Button>
							</ButtonGroup>
							<ButtonGroup>
								<Button onClick={this.typeChangeUser.bind(this)}>
									<input type="radio" defaultValue="USER"/>
									用户端
								</Button>
							</ButtonGroup>
						</ButtonGroup>
					</FormGroup>
					<Button id="lBtn" bsStyle="info" block onClick={this.onLogin.bind(this)}>登陆</Button>
					<Button bsStyle="success" block onClick={this.showState.bind(this)}>查看state</Button>
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


// /**
//  * Author：Yky
//  * Create Date：2016/9/9
//  * Modified By：Yky
//  * Why & What is modified  <修改原因描述>
//  * 用户输入用户名——选择用户类型（商户、用户）——点击登陆按钮
//  * 之后向服务器发送用户id和用户类型，等待接收服务器返回的订单信息，存入state
//  */
// import React, {Component} from 'react'
// import {reduxForm} from 'redux-form'
// import {
// 	Form,
// 	FormGroup,
// 	FormControl,
// 	ControlLabel,
// 	InputGroup,
// 	Glyphicon,
// 	Button,
// 	ButtonGroup
// } from 'react-bootstrap'
// import './Login.scss'
//
// const fields = ["userId", "userType"];
//
// class Login extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			userId: "",
// 			userType: "MERCHANT"
// 		};
// 	}
//
// 	onLogin() {
// 		if (this.state.userType == "USER") {
// 			this.context.router.push("acqOrderId")
// 		}
// 	}
//
// 	idChange(e) {
// 		this.setState({userId: e.target.value});
// 	}
//
// 	showState() {
// 		console.log(this.state)
// 	}
//
// 	typeChangeMerchant(e) {
// 		this.setState({userType: "MERCHANT"});
// 	}
//
// 	typeChangeUser(e) {
// 		this.setState({userType: "USER"});
// 	}
//
// 	render() {
// 		return (
// 			<div id="login">
// 				<Form id="form">
// 					<FormGroup controlId="userId" bsSize="large">
// 						<InputGroup>
// 							<InputGroup.Addon>
// 								<Glyphicon glyph="user"/>
// 							</InputGroup.Addon>
// 							<ControlLabel className="sr-only">ID</ControlLabel>
// 							<FormControl
// 								type="text"
// 								placeholder="请输入用户名"
// 								value={this.state.userId}
// 								onChange={this.idChange.bind(this)}/>
// 						</InputGroup>
// 						<ButtonGroup id="lBtn" aria-label="登录类型" data-toggle="buttons" justified>
// 							<ButtonGroup>
// 								<Button onClick={this.typeChangeMerchant.bind(this)} active>
// 									<input type="radio" defaultValue="MERCHANT" defaultChecked={true}/>
// 									商户端
// 								</Button>
// 							</ButtonGroup>
// 							<ButtonGroup>
// 								<Button onClick={this.typeChangeUser.bind(this)}>
// 									<input type="radio" defaultValue="USER"/>
// 									用户端
// 								</Button>
// 							</ButtonGroup>
// 						</ButtonGroup>
// 					</FormGroup>
// 					<Button id="lBtn" bsStyle="info" block onClick={this.onLogin.bind(this)}>登陆</Button>
// 					<Button bsStyle="success" block onClick={this.showState.bind(this)}>查看state</Button>
// 				</Form>
// 			</div>
// 		)
// 	}
// }
//
// Login.contextTypes =
// {
// 	router: React.PropTypes.object.isRequired
// };
//
// export default Login