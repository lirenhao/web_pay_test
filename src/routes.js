/**
 * Author：Yky
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 登录界面跳转路由修改
 * 路由文件
 */
import React from 'react'
import {Route} from 'react-router'
import Login from './containers/Login'
import Goods from './containers/Goods'
import AcqOrderId from './components/acquisitionOrderId/AcqOrderId'
import PayForm from './components/payForm/PayForm'
import Dialog from './components/Dialog/Dialog'

export default (
	<Route>
		<Route path="/" component={Login}/>
        <Route path="/goods" component={Goods}/>
		<Route path="/acqOrderId" component={AcqOrderId}/>
		<Route path="/PayForm" component={PayForm}/>
		<Route path="/Dialog" component={Dialog}/>
	</Route>
)