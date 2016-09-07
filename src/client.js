/**
 * Created by ALIENWARE17 on 2016/9/7.
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