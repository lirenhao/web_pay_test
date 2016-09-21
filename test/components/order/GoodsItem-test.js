/**
 * Author：pengfei
 * Create Date：2016/9/20
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 测试商品展示组件
 */

import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import AmtDisplay from '../../../src/components/order/AmtDisplay'
import GoodsItem from '../../../src/components/order/GoodsItem'

describe("测试商品信息展示组件（GoodsItem）", function () {
    var data;
    before("初始化数据", function () {
        data = {name: "哈哈", price: 200, quantity: 2};
    });

    it("测试组件元素是渲染出数据个数是否正确", function () {
        expect(shallow(<GoodsItem/>).find('td')).to.have.length(3);
    });

    it("测试组件元素包含价格组件(AmtDisplay)是否渲染", function () {
        expect(shallow(<GoodsItem {...data}/>).find(AmtDisplay).render().find('span')).to.have.length(1);
    });

    it("测试组件props的name、price、quantity是否都获取到相应数据", function () {
        expect(shallow(<GoodsItem {...data} />).instance().props.name).to.equal("哈哈");
        expect(shallow(<GoodsItem {...data}/>).instance().props.price).to.equal(200);
        expect(shallow(<GoodsItem {...data}/>).instance().props.quantity).to.equal(2);
    });
});