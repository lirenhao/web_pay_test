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
import {render} from 'react-dom'
import {Provider} from "react-redux"
import {createStore} from "redux"
import {browserHistory} from "react-router"
import {AppContainer} from "react-hot-loader"
import DevTools from "./containers/DevTools"
import Payment from "./Payment"
import reducer from "./reducers"
import routes from "./routes"
import {msgHandler} from "./handler"

export const store = createStore(reducer, DevTools.instrument())

const container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

render(
    <AppContainer>
        <Provider store={store}>
            {routes}
        </Provider>
    </AppContainer>,
    container
)

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const nextRoutes = require('./routes').default
        render(
            <AppContainer>
                <Provider store={store}>
                    {nextRoutes}
                </Provider>
            </AppContainer>,
            container
        )
    })
}

window.addEventListener("load", () => {
    Payment.setMsgHandler(msgHandler(store, browserHistory))
})