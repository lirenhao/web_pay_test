/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 结算组件测试
 */

import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import Billing from '../../../src/components/order/Billing'
import AmtDisplay from '../../../src/components/order/AmtDisplay'

describe("测试结算组件(Billing)", ()=> {
    let items
    let marketing
    before("初始化测试数据", function () {
        items = [
            {name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2},
            {name: "ONLY圆点荷叶边女修身裙", price: 19950, quantity: 1},
            {name: "ONLY棉宽松字母牛仔女外套", price: 27450, quantity: 1}
        ]
        marketing = {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"}
    })

    it("金额组件是否渲染成功", () => {
        expect(shallow(<Billing items={items} marketing={marketing}/>).find(AmtDisplay)).to.have.length(3);
    })

    it("金额组件渲染后内容是否正确", () => {
        expect(shallow(<Billing items={items}
                                marketing={marketing}/>).find(AmtDisplay).at(0).render().find('span').text()).to.equal('1173 元')

        expect(shallow(<Billing items={items}
                                marketing={marketing}/>).find(AmtDisplay).at(1).render().find('span').text()).to.equal('586.5 元')

        expect(shallow(<Billing items={items}
                                marketing={marketing}/>).find(AmtDisplay).at(2).render().find('span').text()).to.equal('586.5 元')
    })
})