/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import {createReducer} from "redux-act"
import {addOrder, remove} from "../actions"

export default createReducer({
    [addOrder]: (state, order) => {
        return [...state, order.orderId]
    },
    [remove]: (state, orderId) => {
        return state.filter((value) => {
            return value !== orderId
        })
    }
}, [])