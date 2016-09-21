/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：Yky
 * Why & What is modified  添加文件描述
 * 处理用户信息的reducer，初始化数据为{}
 * addUser——将用户信息存入state.user
 */
import {createReducer} from "redux-act"
import {addUser} from "../actions"

export default createReducer({
	[addUser]: (state, user) => {
		return user
	}
}, {})