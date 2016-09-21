/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 优惠信息组件测试
 */

import React from 'react';
import {shallow, mount} from 'enzyme'
import {expect} from 'chai'
import Marketing from '../../../src/components/order/Marketing'
import AmtDisplay from '../../../src/components/order/AmtDisplay'


describe("测试优惠信息组件", function () {
    var data;
    before("初始化数据", function () {
        data = {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"}
    })

    it("是否渲染出金额展示组件", function () {
        expect(shallow(<Marketing marketing={data}/>).find(AmtDisplay).render().find('span')).to.have.length(1)
    })

    it("是否能显示出优惠信息内容", function () {
        expect(shallow(<Marketing marketing={data}/>).find('td').at(3).text()).to.equal(data.msg)
    })
})
