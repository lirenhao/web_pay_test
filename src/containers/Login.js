/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 登录界面的容器，需要给LoginForm传一个登陆处理的函数onLogin
 */
import React from "react"
import Payment from "../Payment"
import Const from "../constants"
import LoginForm from "../components/login/LoginForm"

const Login = (props, context) => {

    const TerminalType = Const.TerminalType

    const onLogin = (values) => {
        Payment.clientSignIn({...values})
        if (values.userType == TerminalType.MERCHANT)
            context.history.push("/goods")
        else
            context.history.push("/orderId")
    }

    return (
        <LoginForm onLogin={onLogin} initialValues={{userType: TerminalType.MERCHANT}}/>
    )
}

Login.contextTypes = {
    setTitle: React.PropTypes.func.isRequired,
    history: React.PropTypes.object.isRequired
}

export default Login