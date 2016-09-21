/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * GoodsForm组件的测试类
 */
import React from "react"
import {expect} from "chai"
import sinon from "sinon"
import {shallow, mount, render} from "enzyme"
import {Provider} from "react-redux"
import {Form, ListGroupItem, InputGroup, Button} from "react-bootstrap"
import GoodsForm from "../../../src/components/goodsForm/GoodsForm"
import {reducer as formReducer } from 'redux-form'
import {createStore, combineReducers } from 'redux'

const items = [
    {
        name: "name",
        price: 1,
        quantity: 2
    }
];

describe("GoodsForm", () => {
    let store = null
    let onSubmit = null
    let onButton = null
    let orderNum = 2
    let subject = null
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }))
        onSubmit = sinon.stub()
        onSubmit.returns(Promise.resolve())
        onButton = sinon.spy()
        const props = {
            onSubmit,
            onButton,
            orderNum,
            initialValues: {goods: items}
        }
        subject = mount(<Provider store={store}><GoodsForm {...props}/></Provider>)
    })
    it("测试商品信息录入正确提交", ()=> {
        const form = subject.find(Form)
        form.simulate("submit")
        expect(onSubmit.callCount).to.equal(1)
    })
    it("测试没有商品信息时不能提交", ()=> {
        const form = subject.find(Form)
        expect(form.find(Button).length).to.equal(4)
        form.find(Button).first().simulate("click")
        expect(form.find(Button).length).to.equal(3)
        form.simulate("submit")
        expect(onSubmit.callCount).to.equal(0)
    })
    it("测试商品信息未录入时不能提交", ()=> {
        const form = subject.find(Form)
        expect(form.find(Button).length).to.equal(4)

        form.find(Button).at(1).simulate("click")
        expect(form.find(Button).length).to.equal(5)
        form.simulate("submit")
        expect(onSubmit.callCount).to.equal(0)

        form.find(Button).at(1).simulate("click")
        expect(form.find(Button).length).to.equal(4)
        form.simulate("submit")
        expect(onSubmit.callCount).to.equal(1)
    })
    it("测试待支付的onButton事件被触发", ()=> {
        const form = subject.find(Form)
        expect(form.find(Button).length).to.equal(4)
        const button = form.find(Button).last()
        button.simulate("click")
        expect(onButton.callCount).to.equal(1)
    })
})