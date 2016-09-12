/**
 * Author：liRenhao
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 添加组件的入口App
 */
import React from "react"
import {connect} from "react-redux"

const App = (props) => (
    <div>
        <h1>Hello</h1>
    </div>
)

export default connect()(App)