/**
 * Author：Yky
 * Create Date：2016/9/12
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 路由文件
 */
import React from 'react'
import {Route} from 'react-router'
import Login from './components/login/Login'
import AcqOrderId from './components/acquisitionOrderId/AcqOrderId'
import PayForm from './components/payForm/PayForm'
import GoodForm from './components/GoodsForm'

export default (
	<Route>
		<Route path="/" component={Login}/>
		<Route path="/acqOrderId" component={AcqOrderId}/>
		<Route path="/PayForm" component={PayForm}/>
		<Route path="/GoodForm" component={GoodForm}/>
	</Route>
)