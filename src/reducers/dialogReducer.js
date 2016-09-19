/**
 * Author：liRenhao
 * Create Date：2016/9/19
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 定义模态框的state
 */
import {createReducer} from "redux-act"
import {showDialog, hideDialog} from "../actions"

export default createReducer({
    [showDialog]: (state, msg) => {
        return {show: true, header: msg.header, body: msg.body}
    },
    [hideDialog]: (state) => {
        return {...state, show: false}
    }
}, {show: false, header: "", body: ""})