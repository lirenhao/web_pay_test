/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  添加多个action
 * 用于描述界面中操作state中数据变化的action
 */
import {createAction} from "redux-act"


export const addUser = createAction("ADD_USER");
export const addOrder = createAction("ADD_ORDER");
export const addMarketing=createAction("ADD_MARKETING");
export const payAuth =createAction("PAY_AUTH");
export const payCompleted =createAction("PAY_COMPLETED");