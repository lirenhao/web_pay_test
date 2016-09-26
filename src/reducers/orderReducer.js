/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：Yky
 * Why & What is modified  添加文件描述
 * Modified By：liRenhao
 * Why & What is modified 把订单信息中的isPayAuth属性去掉
 * 处理订单信息的reducer:
 * addOrder——将商品信息按照orderId存入state.order
 * remove——将orderId对应的订单信息从state.order中移除
 */
import {createReducer} from "redux-act"
import {addOrder, payAuth, remove} from "../actions"

export default createReducer({
	[addOrder]: (state, order) => {
		return {...state, [order.orderId]: {...order}}
	},
	[remove]: (state, orderId) => {
		delete state[orderId]
		return {...state}
	}
}, {})