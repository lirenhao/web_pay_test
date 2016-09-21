/**
 * Author：liRenhao
 * Create Date：2016/9/21
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * OrderIdForm组件的测试
 */
import React from "react"
import {expect} from "chai"
import sinon from "sinon"
import {mount} from "enzyme"
import {Provider} from "react-redux"
import {reducer as formReducer } from 'redux-form'
import {createStore, combineReducers } from 'redux'
import {Form, Button} from "react-bootstrap"
import OrderIdForm from "../../../src/components/orderIdForm/OrderIdForm"

describe("订单号输入组件测试(OrderIdForm)", () => {
	let store = null
	let onSubmit = null
	let onButton = null
	let orderNum = 2
	let subject = null
	beforeEach(() => {
		store = createStore(combineReducers({ form: formReducer }))
		onSubmit = sinon.spy()
		onButton = sinon.spy()
		const props = {
			onSubmit,
			onButton,
			orderNum
		}
		subject = mount(<Provider store={store}><OrderIdForm {...props}/></Provider>)
	})
	it("测试表单提交成功", ()=> {
		const form = subject.find(Form)
		const input = form.find("input").first()
		input.simulate('change', { target: { value: '1' } })
		form.simulate("submit")
		expect(onSubmit.callCount).to.equal(1)
	})
	it("测试表单提交失败", ()=> {
		const form = subject.find(Form)
		form.simulate("submit")
		expect(onSubmit.callCount).to.equal(0)
	})
	it("测试待支付按钮被点击", ()=> {
		const form = subject.find(Form)
		expect(form.find(Button).length).to.equal(2)
		const button = form.find(Button).last()
		button.simulate("click")
		expect(onButton.callCount).to.equal(1)
	})
})