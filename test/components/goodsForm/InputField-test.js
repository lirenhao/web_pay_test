/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * InputField组件的测试类
 */
import React from "react"
import {expect} from "chai"
import sinon from "sinon"
import {shallow} from "enzyme"
import {FormGroup, InputGroup, FormControl} from "react-bootstrap"
import InputField from "../../../src/components/goodsForm/InputField"

const meta = sinon.spy()
const input = sinon.spy()

describe("InputField", function() {
    it("should render one <FormGroup/> components", () => {
        const wrapper = shallow(<InputField input={input} meta={meta}/>)
        expect(wrapper.find(FormGroup)).to.have.length(1);
    })
    it("should render one <InputGroup/> components", function() {
        const wrapper = shallow(<InputField input={input} meta={meta}/>)
        expect(wrapper.find(InputGroup)).to.have.length(1);
    })
    it("should render one <InputGroup.Addon/> components", function() {
        const wrapper = shallow(<InputField input={input} meta={meta}/>)
        expect(wrapper.find(InputGroup.Addon)).to.have.length(1);
    })
    it("should render one <FormControl/> components", function() {
        const wrapper = shallow(<InputField input={input} meta={meta}/>)
        expect(wrapper.find(FormControl)).to.have.length(1);
    })
    it("should render one <FormControl.Feedback/> components", function() {
        const wrapper = shallow(<InputField input={input} meta={meta}/>)
        expect(wrapper.find(FormControl.Feedback)).to.have.length(1);
    })
})