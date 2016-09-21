/**
 * Author：liRenhao
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * GoodsField组件的测试类
 */
import React from "react"
import {expect} from "chai"
import sinon from "sinon"
import {shallow} from "enzyme"
import {Button} from "react-bootstrap"
import GoodsField from "../../../src/components/goodsForm/GoodsField"

describe("GoodsField", () => {
    let map
    let remove
    let push
    beforeEach(() => {
        map = sinon.spy()
        remove = sinon.spy()
        push = sinon.spy()
    })
    const buildSubject = () => {
        const props = {
            fields: {map, remove, push}
        }
        return shallow(<GoodsField {...props}/>)
    }
    it("测试fields是否执行map方法", ()=> {
        const subject = buildSubject()
        expect(map.callCount).to.equal(1)
    })
    it("测试添加按钮是否被点击", ()=> {
        const subject = buildSubject()
        const addButton = subject.find(Button).at(0)
        addButton.simulate("click")
        expect(push.callCount).to.equal(1)
    })
})