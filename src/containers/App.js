/**
 * Author：liRenhao
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加组件的入口App
 */
import React from "react"
import {connect} from "react-redux"
import {Router, browserHistory} from 'react-router'
import routes from '../routes'

const App = (props) => (
	<Router routes={routes} history={browserHistory}>
	</Router>
);

export default connect()(App)