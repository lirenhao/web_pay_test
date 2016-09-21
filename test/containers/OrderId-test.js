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
import OrderId from '../../src/containers/OrderId'

describe('OrderIdContainer', () => {
    it('should render', () => {
        const expectedState = {user: {}, orderIds: []}
        const component = shallowWithState(<OrderId />, expectedState)
        expect(component.props().user).to.equal(expectedState.user)
        expect(component.props().orderIds).to.equal(expectedState.orderIds)
    })
})