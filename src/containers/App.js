/**
 * Author：liRenhao
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Yky
 * Why & What is modified  添加context，设置各个页面的title
 * 添加组件的入口App
 */
import React from "react"
import {connect} from "react-redux"
import {Router, browserHistory} from 'react-router'
import routes from '../routes'

class App extends React.Component {
	getChildContext() {
		return {
			setTitle: value => (document.title = value)
		}
	}

	render() {
		return (
			<Router routes={routes} history={browserHistory}>
			</Router>
		)
	}
}

App.childContextTypes = {
	setTitle: React.PropTypes.func
};

export default connect()(App)