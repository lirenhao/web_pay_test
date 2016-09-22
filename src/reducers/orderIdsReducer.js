/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：Yky
 * Why & What is modified  添加文件描述,添加orderIds数组的排序
 * Modified By：liRenhao
 * Why & What is modified 去掉orderIds数组的排序
 * orderIds的reducer：
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
		/**
		 * ES6中有delete、array.splice(index, 1)两种方法删除array中的元素
		 * 由于delete是把元素替换成undefined、array.splice(-1, 1)是去除最后一个元素，所以不使用这两种方法
		 */
		return state.filter((value) => {
			return value !== orderId
		})
	}
}, [])