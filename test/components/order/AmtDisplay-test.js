/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 金额组件测试
 */


import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import AmtDisplay from '../../../src/components/order/AmtDisplay'


describe("测试金额显示组件", function () {
    it("组件是否渲染成功", function () {
        expect(shallow(<AmtDisplay amt={1000}/>).html()).to.equal('<span>10 元</span>')
    })
})

