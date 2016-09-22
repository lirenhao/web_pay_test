/**
 * Author：liRenhao
 * Create Date：2016/9/19
 * Modified By：liRenhao
 * Why & What is modified 模态框的state改为数组使可以接受多个模态框的信息
 * 定义模态框的state
 */
import {createReducer} from "redux-act"
import {showDialog, hideDialog} from "../actions"

export default createReducer({
    [showDialog]: (state, msg) => {
        return [...state, {...msg, show: true}]
    },
    [hideDialog]: (state) => {
        state.shift()
        return [...state]
    }
}, [])