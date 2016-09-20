/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * actions的测试文件
 */

import {expect} from 'chai';
import * as actions from '../src/actions'

describe("action测试", ()=> {
	it("应该创建一个action添加user", ()=> {
		const user = {
			userId: "1",
			userType: "MERCHANT"
		};
		const expectedAction = {
			type: "ADD_USER",
			user
		};
		expect(actions.addUser(user) === expectedAction)
	});
	it("应该创建一个action添加orderIds", ()=> {
		const orderIds = [1, 2];
		const expectedAction = {
			type: "ADD_ORDER",
			orderIds
		};
		expect(actions.addOrder(orderIds) === expectedAction)
	})
});