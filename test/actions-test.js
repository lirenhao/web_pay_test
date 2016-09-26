/**
 * Author：Yky
 * Create Date：2016/9/20
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  由于payAuth createAction已被去除，所以删除payAuth createAction测试
 * actions的测试文件
 */

import {expect} from 'chai';
import * as actions from '../src/actions'

describe("action功能测试", ()=> {
    it("addUser函数创建的对象是不是期望值", ()=> {
        const payload = {
            userId: "1",
            userType: "MERCHANT"
        };
        const expectedAction = {
            type: "ADD_USER",
            payload
        };
        const action = actions.addUser(payload);
        Object.keys(action).forEach(key=> {
            expect(action[key]).to.equal(expectedAction[key])
        });
    });
    it("addOrder函数创建的对象是不是期望值", ()=> {
        const payload = {
            orderIds: ["1"],
            order: {
                1: {
                    orderId: "1",
                    items: [
                        {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                        {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                        {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
                    ],
                    isPayAuth: false
                }
            }
        };
        const expectedAction = {
            type: "ADD_ORDER",
            payload
        };
        const action = actions.addOrder(payload);
        Object.keys(action).forEach(key=> {
            expect(action[key]).to.equal(expectedAction[key])
        });
    });
    it("addMarketing函数创建的对象是不是期望值", ()=> {
        const payload = {
            1: {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"},
        };
        const expectedAction = {
            type: "ADD_MARKETING",
            payload
        };
        const action = actions.addMarketing(payload);
        Object.keys(action).forEach(key=> {
            expect(action[key]).to.equal(expectedAction[key])
        });
    });
    it("remove函数创建的对象是不是期望值", ()=> {
        const payload = 1;
        const expectedAction = {
            type: "REMOVE",
            payload
        };
        const action = actions.remove(payload);
        Object.keys(action).forEach(key=> {
            expect(action[key]).to.equal(expectedAction[key])
        });
    })
});