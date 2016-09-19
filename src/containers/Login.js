/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 登录界面的容器，需要给LoginForm传一个登陆处理的函数onLogin
 */
import React from "react"
import {browserHistory} from "react-router"
import Payment from "../Payment"
import Const from "../constants"
import LoginForm from "../components/login/LoginForm"

const TerminalType = Const.TerminalType;
class Login extends React.Component {
	static contextTypes = {
		setTitle: React.PropTypes.func.isRequired
	};

	componentWillMount() {
		this.context.setTitle("登录");
	}

	onLogin(values) {
		Payment.clientSignIn({...values});
		if (values.userType == TerminalType.MERCHANT)
			browserHistory.push("/goods");
		else
			browserHistory.push("/orderId")
	}

	render() {
		return (
			<LoginForm onLogin={this.onLogin.bind(this)} initialValues={{userType: TerminalType.MERCHANT}}/>
		)
	}
}

export default Login