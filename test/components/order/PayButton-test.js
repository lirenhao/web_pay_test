/**
 * Author：pengfei
 * Create Date：2016/9/21
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * 订单按钮组件测试
 */


import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import sinon from "sinon"
import PayButton from '../../../src/components/order/PayButton'
import {Button} from 'react-bootstrap'

describe("测试按钮组件(PayButton)", ()=> {
    let canPay
    let canCancel
    let onReqPay
    let onCancel
    let orderId;

    before("初始化测试数据", ()=> {
        canPay = true
        canCancel = false
        onReqPay = sinon.spy()
        onCancel = sinon.spy()
        orderId = "1"
    })
    it("组件state是否正确获得", ()=> {
        const wrapper = shallow(<PayButton canPay={canPay} canCancel={canCancel} onReqPay={onReqPay} onCancel={onCancel}
                                           orderId={orderId}/>)
        expect(wrapper.state().canPay).to.equal(true)
    })

    it("组件按钮触发事件测试", ()=> {
        const wrapper = shallow(<PayButton canPay={canPay} canCancel={canCancel} onReqPay={onReqPay} onCancel={onCancel}
                                           orderId={orderId}/>)
        wrapper.find(Button).at(0).simulate("click")
        expect(onReqPay.callCount).to.equal(1)
        wrapper.find(Button).at(1).simulate("click")
        expect(onCancel.callCount).to.equal(1)
    })
})

