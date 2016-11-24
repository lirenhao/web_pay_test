/**
 * Author：Yky
 * Create Date：2016/9/7
 * Modified By：liRenhao
 * Why & What is modified react-hot-loader升级到3.0之后添加AppContainer
 * Modified By：liRenhao
 * Why & What is modified 添加redux的配置
 * Modified By：liRenhao
 * Why & What is modified 引用App组件改为引用路由配置
 * 一个测试组件，用来测试搭建的环境都正确，可以正确渲染出页面
 */
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from "react-redux"
import {createStore, applyMiddleware} from "redux"
import {hashHistory} from "react-router"
import {AppContainer} from "react-hot-loader"
import DevTools from "./containers/DevTools"
import Payment from "./Payment"
import reducer from "./reducers"
import Routes from "./containers/Routes"
import {msgHandler} from "./handler"

import {routerMiddleware, syncHistoryWithStore} from "react-router-redux"

export const store = createStore(reducer, DevTools.instrument(), applyMiddleware(routerMiddleware(hashHistory)))
const history = syncHistoryWithStore(hashHistory, store)

const container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Routes history={history}/>
        </Provider>
    </AppContainer>,
    container
)

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextRoutes = require('./containers/Routes').default
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextRoutes history={history}/>
                </Provider>
            </AppContainer>,
            container
        )
    })
}

window.addEventListener("load", () => {
    Payment.setMsgHandler(msgHandler(store))
})