/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 处理用户信息的reducer，初始化数据为{}
 */
import {createReducer} from "redux-act"
import {addUser} from "../actions"

export default createReducer({
    [addUser]: (state, user) => {
        return user
    }
}, {})