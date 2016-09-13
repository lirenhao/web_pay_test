/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 登录界面的容器，需要给LoginForm传一个登陆处理的函数onLogin
 */
import React from "react"
import {connect} from "react-redux"
import LoginForm from "../components/login/LoginForm"

const Login = (props) => (
    <LoginForm onLogin={(values) => console.log(values)} initialValues={{userType: "MERCHANT"}}/>
)

// TODO 增加state的处理函数

export default connect()(Login)