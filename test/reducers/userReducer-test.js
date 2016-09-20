/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * userReducer的测试文件
 */

import {expect} from "chai"
import * as actions from "../../src/actions"
import {store} from "../store-test"

describe("userReducer功能测试", ()=> {
	it("接收action将用户信息存入state.user", ()=> {
		const payload = {
			userId: "1",
			userType: "MERCHANT"
		};
		const exceptedState = {
			user: {
				userId: "1",
				userType: "MERCHANT"
			}
		};
		store.dispatch(actions.addUser(payload));
		const user = store.getState().user;
		Object.keys(user).forEach(key=> {
			expect(user[key]).to.equal(exceptedState.user[key])
		})
	})
});