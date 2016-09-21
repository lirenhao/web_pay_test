/**
 * Author：liRenhao
 * Create Date：2016/9/21
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React from "react"
import {expect} from "chai"
import {shallowWithState} from 'enzyme-redux'
import Pay from '../../src/containers/Pay'

describe('PayContainer', () => {
    it('should render', () => {
        const expectedState = {user: {}, orderIds: [], order: {}, marketing: {}}
        const component = shallowWithState(<Pay />, expectedState)
        expect(component.props().user).to.equal(expectedState.user)
        expect(component.props().orderIds).to.equal(expectedState.orderIds)
        expect(component.props().order).to.equal(expectedState.order)
        expect(component.props().marketing).to.equal(expectedState.marketing)
    })
})