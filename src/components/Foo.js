/**
 * Author：Yky
 * Create Date：2016/9/9
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 测试例子的一部分，为了练习用enzyme和jsdom和mocha在node环境中测试react组件的方法
 * 一个需要测试的react组件，后期将删除
 */
import React, {PropTypes} from 'react';

const propTypes = {};

const defaultProps = {};

class Foo extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="foo"/>
		);
	}
}

Foo.propTypes = propTypes;
Foo.defaultProps = defaultProps;

export default Foo;
