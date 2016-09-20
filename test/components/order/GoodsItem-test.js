/**
 * Author：pengfei
 * Create Date：2016/9/20
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 测试商品展示组件
 */

import GoodsItem from '../../../src/components/order/GoodsItem'
import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import AmtDisplay from '../../../src/components/order/AmtDisplay'


describe("测试商品信息展示组件（GoodsItem）", function () {
    var data;
    before("初始化数据", function () {
        data = {name: "哈哈", price: 200, quantity: 2};
    });

    it("测试组件元素是否包含价格组件(AmtDisplay)", function () {
        expect(shallow(<GoodsItem/>).find('AmtDisplay')).to.have.length(1);
    });

    it("测试组件元素包含价格组件(AmtDisplay)是否显示正确属性值", function () {
        expect(shallow(<GoodsItem {...data}/>).contains(<AmtDisplay amt={data.price}/>)).to.equal(true);
    });

    it("测试组件props的name、price、quantity是否都获取到相应数据", function () {
        expect(mount(<GoodsItem {...data}/>).props().name).to.equal("哈哈");
        expect(mount(<GoodsItem {...data}/>).props().price).to.equal(200);
        expect(mount(<GoodsItem {...data}/>).props().quantity).to.equal(2);
    });
});