/**
 * Author：liRenhao
 * Create Date：2016/9/21
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 登录表单组件测试
 */
import React from "react"
import {expect} from "chai"
import sinon from "sinon"
import {mount} from "enzyme"
import {Provider} from "react-redux"
import {reducer as formReducer } from 'redux-form'
import {createStore, combineReducers } from 'redux'
import {Form, Button} from "react-bootstrap"
import LoginForm from "../../../src/components/login/LoginForm"

describe("登录表单组件测试(LoginForm)", () => {
    let store = null
    let onLogin = null
    let subject = null
    beforeEach(() => {
        store = createStore(combineReducers({ form: formReducer }))
        onLogin = sinon.spy()
        const props = {
            onLogin
        }
        subject = mount(<Provider store={store}><LoginForm {...props}/></Provider>)
    })
    it("测试表单提交成功", ()=> {
        const form = subject.find(Form)
        const input = form.find("input").first()
        input.simulate('change', { target: { value: '1' } })
        form.simulate("submit")
        expect(onLogin.callCount).to.equal(1)
    })
    it("测试表单提交失败", ()=> {
        const form = subject.find(Form)
        expect(form.find(Button).first().props().disabled).to.equal(true)
    })
})