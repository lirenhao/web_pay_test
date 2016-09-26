/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：Yky
 * Why & What is modified  添加文件描述,添加orderIds数组的排序
 * Modified By：liRenhao
 * Why & What is modified 去掉orderIds数组的排序
 * 处理订单列表的reducer：
 * addOrder——将订单id数组存入state.orderIds
 * remove——将对应的orderId从state.orderIds中移除
 */
import {createReducer} from "redux-act"
import {addOrder, remove} from "../actions"

export default createReducer({
	[addOrder]: (state, order) => {
		if (state.indexOf(order.orderId) < 0)
			return [...state, order.orderId]
		else
			return [...state]
	},
	[remove]: (state, orderId) => {
		// TODO 使用filter有问题之后在查找问题的原因
		if (state.indexOf(orderId) >= 0)
			state.splice(state.indexOf(orderId), 1)
		return [...state]
	}
}, [])