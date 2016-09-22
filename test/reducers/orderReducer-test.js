/**
 * Author：Yky
 * Create Date：2016/9/21
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * orderReducer的测试文件
 */

import {expect} from "chai"
import * as actions from "../../src/actions"
import {store} from "../store-test"

describe("orderReducer功能测试", ()=> {
	it("接收action将订单信息存入state.order", ()=> {
		const payload = {
			orderId: "5", items: [
				{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
				{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
				{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
			]
		};
		const payload2 = {
			orderId: "6", items: [
				{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
				{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
				{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
			]
		};
		const expectedState = {
			order: {
				5: {
					orderId: "5",
					items: [
						{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
						{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
						{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
					]
				},
				6: {
					orderId: "6",
					items: [
						{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
						{"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
						{"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
					]
				}
			}
		};
		store.dispatch(actions.addOrder(payload));
		store.dispatch(actions.addOrder(payload2));
		const order = store.getState().order;
		Object.keys(order).forEach(id=> {
			Object.keys(order[id]).forEach(key=> {
				if (key != "items") {
					expect(order[id][key]).to.equal(expectedState.order[id][key])
				} else {
					let stateItems = "";
					let expectedStateItems = "";
					order[id][key].forEach(item=> {
						Object.keys(item).forEach(iKey=> {
							stateItems += item[iKey]
						})
					});
					expectedState.order[id][key].forEach(item=> {
						Object.keys(item).forEach(iKey=> {
							expectedStateItems += item[iKey]
						})
					});
					expect(stateItems).to.equal(expectedStateItems)
				}
			})
		})
	})
});