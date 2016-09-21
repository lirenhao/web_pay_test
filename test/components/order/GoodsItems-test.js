/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 对商品列表组件测试
 */

import React from 'react';
import {expect} from 'chai';
import { mount} from 'enzyme';
import GoodsItems from '../../../src/components/order/GoodsItems'


describe("测试商品列表组件（GoodsItems）", function () {
    var items
    before("初始化测试数据", function () {
        items = [
            {name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2},
            {name: "ONLY圆点荷叶边女修身裙", price: 19950, quantity: 1},
            {name: "ONLY棉宽松字母牛仔女外套", price: 27450, quantity: 1}
        ]
    })
    it("是否渲染正确个数的商品信息组件", function () {
        expect(mount(<GoodsItems items={items}/>).find('tr').length).to.equal(4);
        expect(mount(<GoodsItems items={items}/>).find('span').length).to.equal(3);
    })

    it("是否渲染正确个数的商品名称",function () {
        expect(mount(<GoodsItems items={items}/>).containsMatchingElement(
            <td>ONLY修身撞色拼接女针织裙</td>
        )).to.equal(true);
        expect(mount(<GoodsItems items={items}/>).containsMatchingElement(
            <td>ONLY圆点荷叶边女修身裙</td>
        )).to.equal(true);
        expect(mount(<GoodsItems items={items}/>).containsMatchingElement(
            <td>ONLY棉宽松字母牛仔女外套</td>
        )).to.equal(true);
    })
})
