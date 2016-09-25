/**
 * Author：liRenhao
 * Create Date：2016/9/12
 * Modified By：liRenhao
 * Why & What is modified 添加模态框
 * Modified By：Yky
 * Why & What is modified 添加context，设置各个页面的title
 * Modified By：liRenhao
 * Why & What is modified 将App组件改为模板组件
 * 添加组件的入口App
 */
import React from "react"
import {connect} from "react-redux"
import {hideDialog} from "../actions"
import DevTools from "./DevTools"
import Dialog from "../components/dialog/Dialog"

class App extends React.Component {
    getChildContext() {
        console.log(this.context);
        return {
            setTitle: value => (document.title = value),
            history: this.context.history
        }
    }

    render() {
        return (
            <div>
                {this.props.children}
                <Dialog {...this.props.dialog} close={this.props.close}/>
                <DevTools/>
            </div>
        )
    }
}

App.childContextTypes = {
    setTitle: React.PropTypes.func,
    history: React.PropTypes.object
}

App.contextTypes = {
    history: React.PropTypes.object.isRequired
}

const mapStateToProps = (state)=> ({
    user: state.user,
    dialog: state.dialog[0] || {show: false, header: "", body: ""}
})

const mapDispatchToProps = (dispatch) => ({
    close: () => {
        dispatch(hideDialog())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)