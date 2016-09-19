/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Yky
 * Why & What is modified  添加文件描述
 * order的reducer:
 * addOrder——将商品信息按照orderId存入state.order（是排序过的，原因还不清楚）
 * 并添加isPayAuth属性，表示该订单是否在支付中，默认值为false
 * payAuth——将orderId对应的isPayAuth标记为true,表示该订单正在支付
 * remove——将orderId对应的订单信息从state.order中移除
 */
import {createReducer} from "redux-act"
import {addOrder, payAuth, remove} from "../actions"

export default createReducer({
	[addOrder]: (state, order) => {
		return {...state, [order.orderId]: {...order, isPayAuth: false}}
	},
	[payAuth]: (state, orderId) => {
		const order = state[orderId];
		return {...state, [order.orderId]: {...order, isPayAuth: true}}
	},
	[remove]: (state, orderId) => {
		const newState = {};
		Object.keys(state).filter((key) => {
			return key !== orderId
		}).forEach((key) => {
			newState[key] = state[key]
		});
		return newState
	}
}, {})