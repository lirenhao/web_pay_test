/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * orderIdsReducer的测试文件
 */

import {expect} from "chai"
import * as actions from "../../src/actions"
import {store} from "../store-test"

describe("orderIdsReducer功能测试", ()=> {
	it("接收action将订单信息存入state.orderIds", ()=> {
		const payload = {
			orderId: "1",
			items: [
				{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
				{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
				{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
			]
		};
		const payload2 = {
			orderId: "2",
			items: [
				{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
				{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
				{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
			]
		};
		const exceptedState = {
			orderIds: ["1", "2"]
		};
		store.dispatch(actions.addOrder(payload));
		store.dispatch(actions.addOrder(payload2));
		const orderIds = store.getState().orderIds;
		orderIds.forEach((k, i)=> {
			expect(orderIds[i]).to.equal(exceptedState.orderIds[i])
		});
	});
	it("接收action将对应的订单号从state.orderIds中移除", ()=> {
		const payload = "1";
		const payload2 = "2";
		const exceptedState = {
			orderIds: []
		};
		store.dispatch(actions.remove(payload));
		store.dispatch(actions.remove(payload2));
		const orderIds = store.getState().orderIds;
		orderIds.forEach((k, i)=> {
			expect(orderIds[i]).to.equal(exceptedState.orderIds[i])
		});
	})
});