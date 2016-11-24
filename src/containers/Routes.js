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
import {Router, IndexRoute, Route} from 'react-router'
import App from './App'
import Login from './Login'
import Goods from './Goods'
import OrderId from './OrderId'
import Order from './Order'
import Pay from './Pay'

const Routes = (props)=> {
    return (
        <Router history={props.history}>
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
}

export default Routes