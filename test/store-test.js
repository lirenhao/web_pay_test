/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 测试reducer用的store
 */

import {createStore} from "redux"
import reducer from "../src/reducers/index"

export const store = createStore(reducer);