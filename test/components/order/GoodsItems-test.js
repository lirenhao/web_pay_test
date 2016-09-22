/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 对商品列表组件测试
 */

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import GoodsItems from '../../../src/components/order/GoodsItems'
import GoodsItem from '../../../src/components/order/GoodsItem'


describe("测试商品列表组件（GoodsItems）", () => {
    var items
    before("初始化测试数据", ()=> {
        items = [
            {name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2},
            {name: "ONLY圆点荷叶边女修身裙", price: 19950, quantity: 1},
            {name: "ONLY棉宽松字母牛仔女外套", price: 27450, quantity: 1}
        ]
    })

    it("是否渲染正确个数以及正确内容的商品信息", ()=> {
        expect(shallow(<GoodsItems
            items={items}/>).find(GoodsItem).at(0).html()).to.equal('<tr><td>ONLY修身撞色拼接女针织裙</td><td><span>349.5 元</span></td><td>2</td></tr>')
        expect(shallow(<GoodsItems
            items={items}/>).find(GoodsItem).at(1).html()).to.equal('<tr><td>ONLY圆点荷叶边女修身裙</td><td><span>199.5 元</span></td><td>1</td></tr>')
        expect(shallow(<GoodsItems
            items={items}/>).find(GoodsItem).at(2).html()).to.equal('<tr><td>ONLY棉宽松字母牛仔女外套</td><td><span>274.5 元</span></td><td>1</td></tr>')
    })
})
