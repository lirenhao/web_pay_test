/**
 * Author：Yky
 * Create Date：2016/9/7
 * Modified By：liRenhao
 * Why & What is modified  react-hot-loader升级到3.0之后添加AppContainer
 * Modified By：liRenhao
 * Why & What is modified  添加redux的配置
 * 一个测试组件，用来测试搭建的环境都正确，可以正确渲染出页面
 */
import React from 'react'
import {render} from 'react-dom'
import {Provider} from "react-redux"
import {createStore, combineReducers} from "redux"
import {reducer as formReducer} from "redux-form"
import App from "./containers/App"
import DevTools from "./containers/DevTools"
import {AppContainer} from "react-hot-loader"

const reducer = combineReducers({form: formReducer})
const store = createStore(reducer, DevTools.instrument())

const container = document.createElement("div");
container.setAttribute("class", "container");
document.body.appendChild(container);

render(
    <AppContainer>
        <Provider store={store}>
            <div>
                <App/>
                <DevTools/>
            </div>
        </Provider>
    </AppContainer>,
    container
);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const NextApp = require('./containers/App').default;
        render(
            <AppContainer>
                <Provider store={store}>
                    <div>
                        <NextApp/>
                        <DevTools/>
                    </div>
                </Provider>
            </AppContainer>,
            container
        );
    });
}
