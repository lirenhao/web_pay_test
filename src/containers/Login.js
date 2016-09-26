/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 登录界面的容器，需要给LoginForm传一个登陆处理的函数onLogin
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from "react"
import Payment from "../Payment"
import Const from "../constants"
import LoginForm from "../components/login/LoginForm"

/**
 * 定义登陆页面的容器
 * @param props 组件的属性
 * @param context 上下文属性
 */
const Login = (props, context) => {

    const TerminalType = Const.TerminalType

    /**
     * 定义登陆提交按钮事件
     * @param values
     */
    const onLogin = (values) => {
        //客户端将登陆信息数据发送给服务端
        Payment.clientSignIn({...values})
        if (values.userType == TerminalType.MERCHANT)
            context.router.push("/goods")
        else
            context.router.push("/orderId")
    }

    return (
        <LoginForm onLogin={onLogin} initialValues={{userType: TerminalType.MERCHANT}}/>
    )
}

Login.contextTypes = {
    setTitle: React.PropTypes.func.isRequired,
    router: React.PropTypes.object.isRequired
}

export default Login