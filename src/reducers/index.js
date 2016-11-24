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
import order from "./orderReducer"
import orderIds from "./orderIdsReducer"
import marketing from "./marketingReducer"
import dialog from "./dialogReducer"
import {routerReducer} from "react-router-redux"

export default combineReducers({
    form, user, orderIds, order, marketing, dialog, routing: routerReducer
})