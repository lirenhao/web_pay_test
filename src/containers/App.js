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
import {push} from "react-router-redux"

class App extends React.Component {
    render() {
        const childrenProps = {
            user: this.props.user,
            orderIds: this.props.orderIds,
            order: this.props.order,
            marketing: this.props.marketing,
            push: this.props.push,
            setTitle: (value) => (document.title = value)
        }
        return (
            <div>
                {React.cloneElement(this.props.children, childrenProps)}
                <Dialog {...this.props.dialog} close={this.props.close}/>
                <DevTools/>
            </div>
        )
    }
}

const mapStateToProps = (state)=> ({
    user: state.user,
    orderIds: state.orderIds,
    order: state.order,
    marketing: state.marketing,
    dialog: state.dialog[0] || {show: false, header: "", body: ""}
})

const mapDispatchToProps = (dispatch) => ({
    close: () => {
        dispatch(hideDialog())
    },
    push: (path) => {
        dispatch(push(path))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)