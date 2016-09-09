/**
 * Author：Yky
 * Create Date：2016/9/9
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 测试例子的一部分，为了练习用enzyme和jsdom和mocha在node环境中测试react组件的方法
 * 一个测试例子，测试Foo组件，后期将删除
 */
import React from 'react';
import {expect} from 'chai';
import {shallow, mount, render} from 'enzyme';
import Foo from '../../src/components/Foo';

describe("A suite", function () {
	it("contains spec with an expectation", function () {
		expect(shallow(<Foo />).contains(<div className="foo"/>)).to.equal(true);
	});

	it("contains spec with an expectation", function () {
		expect(shallow(<Foo />).is('.foo')).to.equal(true);
	});

	it("contains spec with an expectation", function () {
		expect(mount(<Foo />).find('.foo').length).to.equal(1);
	});
});
