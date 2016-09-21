/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * marketingReducer的测试文件
 */

import {expect} from "chai"
import * as actions from "../../src/actions"
import {store} from "../store-test"

describe("marketingReducer功能测试", ()=> {
	it("接收action将优惠信息存入state.marketing", ()=> {
		const payload = {orderId: "3", amt: 58650, msg: "测试优惠, 一律5折"};
		const payload2 = {orderId: "4", amt: 58650, msg: "测试优惠, 一律5折"};
		const expectedState = {
			marketing: {
				3: {orderId: "3", amt: 58650, msg: "测试优惠, 一律5折"},
				4: {orderId: "4", amt: 58650, msg: "测试优惠, 一律5折"}
			}
		};
		store.dispatch(actions.addMarketing(payload));
		store.dispatch(actions.addMarketing(payload2));
		const marketing = store.getState().marketing;
		Object.keys(marketing).forEach(id=> {
			Object.keys(marketing[id]).forEach(key=> {
				expect(marketing[id][key]).to.equal(expectedState.marketing[id][key])
			})
		})
	});
	it("接收action将对应的订单号从state.marketing中移除", ()=> {
		const payload = "3";
		const expectedState = {
			marketing: {
				4: {orderId: "4", amt: 58650, msg: "测试优惠, 一律5折"}
			}
		};
		store.dispatch(actions.remove(payload));
		const marketing = store.getState().marketing;
		Object.keys(marketing).forEach(id=> {
			Object.keys(marketing[id]).forEach(key=> {
				expect(marketing[id][key]).to.equal(expectedState.marketing[id][key])
			})
		})
	});
});