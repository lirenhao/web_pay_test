/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * reducers的index文件，用于集成各个reducer
 */
import {combineReducers} from 'redux'
import {reducer as form} from 'redux-form'
import user from "./userReducer"

export default combineReducers({
    form, user
})