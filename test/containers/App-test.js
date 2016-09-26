/**
 * Author：liRenhao
 * Create Date：2016/9/21
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：Pengfei
 * Why & What is modified  优化测试代码
 * <文件描述>
 */
import React from "react"
import {expect} from "chai"
import {shallowWithState} from 'enzyme-redux'
import App from '../../src/containers/App'
import {Router} from 'react-router'
import Dialog from "../../src/components/dialog/Dialog"

describe('AppContainer', () => {
    it('should render', () => {
        const expectedState = {dialog: {}}
        const component = shallowWithState(<App />, expectedState)
        expect(component.props().dialog.show).to.equal(false)
        expect(component.props().dialog.header).to.equal('')
        expect(component.props().dialog.body).to.equal('')
        expect(component.props().close).to.a('function');
    })
})