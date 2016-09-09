/**
 * Author：Yky
 * Create Date：2016/9/7
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 一个测试组件，用来测试搭建的环境都正确，可以正确渲染出页面
 */
import React from 'react'
import {render} from 'react-dom'

const container = document.createElement("div");
container.setAttribute("class", "container");
document.body.appendChild(container);

const Hello = function () {
	return <h1>Hello World!</h1>
};

render(
	<Hello/>,
	container
);