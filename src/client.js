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
import {createStore} from "redux"
import App from "./containers/App"
import DevTools from "./containers/DevTools"
import {AppContainer} from "react-hot-loader"
import Payment from "./Payment"
import Const from "./constants"
import reducer from "./reducers"
import {addUser, addOrder, addMarketing, payAuth, remove, showDialog} from "./actions"
import {browserHistory} from "react-router"

export const store = createStore(reducer, DevTools.instrument())

const container = document.createElement("div")
container.setAttribute("class", "container")
document.body.appendChild(container)

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
)

if (module.hot) {
	module.hot.accept('./containers/App', () => {
		const NextApp = require('./containers/App').default
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
		)
	})
}

// TODO 后续再移出
const ClientCmd = Const.ClientCmd
const ServerCmd = Const.ServerCmd
const msgHandler = (data) => {
	const {eventType, ...msg} = data
	switch (eventType) {
		case ServerCmd.CLIENT_SIGN_IN:
			store.dispatch(addUser({userId: msg.id, userType: msg.terminalType}))
			break
		case ClientCmd.ORDER_ITEMS:
			store.dispatch(addOrder({...msg}))
			break
		case ClientCmd.MARKETING:
			store.dispatch(addMarketing({...msg}))
			break
		case ClientCmd.PAY_AUTH:
			store.dispatch(payAuth(msg.orderId))
			// 获取支付权限跳转到pay
			browserHistory.push("/pay/" + store.getState().orderIds.indexOf(msg.orderId))
			break
		case ClientCmd.PAY_COMPLETED:
			store.dispatch(remove(msg.orderId))
			if (msg.result) {
				store.dispatch(showDialog({header: "支付通知", body: "订单【" + msg.orderId + "】" + "支付成功"}))
			} else {
				store.dispatch(showDialog({header: "支付通知", body: "订单【" + msg.orderId + "】" + "支付失败"}))
			}
			// 当用户没有订单时，商户跳转到录入商品界面、客户跳转到输入订单界面
			if (store.getState().orderIds.length < 1) {
				if (store.getState().user.userType == Const.TerminalType.MERCHANT)
					browserHistory.push("/goods")
				else
					browserHistory.push("/orderId")
			}
			break
		case ClientCmd.FAIL:
			store.dispatch(remove(msg.orderId))
			store.dispatch(showDialog({header: eventType, body: msg.msg}))
			// 当用户没有订单时，商户跳转到录入商品界面、客户跳转到输入订单界面
			if (store.getState().orderIds.length < 1) {
				if (store.getState().user.userType == Const.TerminalType.MERCHANT)
					browserHistory.push("/goods")
				else
					browserHistory.push("/orderId")
			}
			break
		case ClientCmd.MESSAGE:
			store.dispatch(showDialog({header: msg.level, body: msg.msg}))
			break
	}
}

window.addEventListener("load", () => {
	Payment.setMsgHandler(msgHandler)
})