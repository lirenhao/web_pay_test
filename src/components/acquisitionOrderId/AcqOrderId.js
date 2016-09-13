/**
 * Author：Yky
 * Create Date：2016/9/9
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * 用户输入要匹配的订单号——点击加入按钮——向服务器发送用户id和订单id
 * 如果订单可以匹配，匹配该订单，获取优惠信息存入state，跳转到订单页面
 * 如果该订单已被其他用户匹配，会给该用户发送订单已被“当前用户”匹配的模态框信息
 * 如果订单不可匹配，做出相应提示
 * 该页面下部有一个按钮，显示该用户已匹配但还未支付的数量，点击后跳转到订单页面
 * （如果已匹配订单数量为0，该按钮隐藏）
 */

import React from 'react'
import {Form, FormGroup, InputGroup, FormControl, Button, Glyphicon} from 'react-bootstrap'

class AcqOrderId extends React.Component {
	render() {
		return (
			<div style={{"marginTop": "10px"}}>
				<Form inline>
					<FormGroup controlId="orderId">
						<InputGroup>
							<InputGroup.Addon>
								<Glyphicon glyph="qrcode"/>
							</InputGroup.Addon>
							<FormControl type="text" placeholder="订单ID"/>
							<InputGroup.Button>
								<Button style={{"height": "34px"}}>加入</Button>
							</InputGroup.Button>
						</InputGroup>
					</FormGroup>
					<p/>
					<Button bsStyle="info">
						<span className="badge">N</span>
						&nbsp;个待支付</Button>
				</Form>
			</div>
		)
	}
}

export default AcqOrderId
// <div style={{"marginTop": "10px"}}>
// <Form inline>
// <FormGroup controlId="orderId">
// 	<InputGroup>
// 	<InputGroup.Addon>
// 	<Glyphicon glyph="qrcode"/>
// 	</InputGroup.Addon>
// 	<FormControl type="text" placeholder="订单ID"/>
// 	<InputGroup.Button>
// 	<Button>加入</Button>
// 	</InputGroup.Button>
// 	</InputGroup>
// 	</FormGroup>
// 	<p/>
// 	<Button bsStyle="info">
// 	<span className="badge">N</span>
// 	&nbsp;个待支付</Button>
// </Form>
// </div>