/**
 * Author：liRenhao
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 添加模态框
 * Modified By：Yky
 * Why & What is modified  添加context，设置各个页面的title
 * 添加组件的入口App
 */
import React from "react"
import {connect} from "react-redux"
import {Router, browserHistory} from 'react-router'
import routes from '../routes'
import Dialog from "../components/dialog/Dialog"
import {hideDialog} from "../actions"

class App extends React.Component {
    getChildContext() {
        return {
            setTitle: value => (document.title = value)
        }
    }

    render() {
        return (
            <div>
                <Router routes={routes} history={browserHistory}/>
                <Dialog {...this.props.dialog} close={this.props.close}/>
            </div>
        )
    }
}

App.childContextTypes = {
    setTitle: React.PropTypes.func
}

const mapStateToProps = (state)=> ({
    dialog: state.dialog[0] || {show: false, header: "", body: ""}
})

const mapDispatchToProps = (dispatch) => ({
    close: () => {
        dispatch(hideDialog())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)