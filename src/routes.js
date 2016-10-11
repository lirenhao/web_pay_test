/**
 * Author：Yky
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 登录界面跳转路由修改
 * Modified By：Pengfei
 * Why & What is modified 支付界面路由修改
 * 路由文件
 */
import React from 'react'
import {Router, IndexRoute, Route, hashHistory} from 'react-router'
import App from './containers/App'
import Login from './containers/Login'
import Goods from './containers/Goods'
import OrderId from './containers/OrderId'
import Order from './containers/Order'
import Pay from './containers/Pay'

export default (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Login}/>
            <Route path="/login" component={Login}/>
            <Route path="/goods" component={Goods}/>
            <Route path="/orderId" component={OrderId}/>
            <Route path="/order" component={Order}/>
            <Route path="/pay/:index" component={Pay}/>
        </Route>
    </Router>
)