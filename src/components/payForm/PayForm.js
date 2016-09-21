/**
 * Author：KL
 * Created by likon on 2016/9/9.
 * Modified By：KL
 * Why & What is modified  添加支付表单组件，包括：商品列表组件、优惠信息组件、结算信息组件、确定按钮、取消支付按钮
 * Modified By：Pengfei
 * Why & What is modified  添加订单号和流水号处理和展示样式
 */
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {ButtonGroup, Button, FormControl, Navbar} from 'react-bootstrap'
import Billing from '../order/Billing'
import OrderInfo from '../order/OrderInfo'
import './PayForm.scss'

const PayField = ({input}) => (
	<FormControl {...input} componentClass="select">
		<option value="0" checked="checked">成功</option>
		<option value="1">失败</option>
	</FormControl>
);

const getlsNo = (orderId)=> {
	function pad(num, n) {
		var len = num.toString().length;
		while (len < n) {
			num = "0" + num;
			len++;
		}
		return num;
	}

	return orderId + pad(Math.floor(Math.random() * 100), 3)
};

class PayForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			items: this.props.order[this.props.orderIds[this.props.index]].items,
			orderId: this.props.orderIds[this.props.index]
		};
	}

	render() {
		const {handleSubmit, onSubmit, onCancel, orderIds, marketing, index} = this.props;
		return (
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={"marginOutTopBottom"}>
					<div className="marginBottom">
						<span className="marginRight"><b>订单号：{this.state.orderId}</b></span>
						<span><b>流水号：{getlsNo(this.state.orderId)}</b></span>
					</div>
					<div>
						<OrderInfo items={this.state.items}/>
						<Billing items={this.state.items} marketing={marketing[orderIds[index]] || ""}/>
					</div>
				</div>
				<Navbar fixedBottom>
					<ButtonGroup justified>
						<ButtonGroup>
							<Field name="state" component={PayField}/>
						</ButtonGroup>
						<ButtonGroup>
							<Button bsStyle="success" type="submit">确定</Button>
						</ButtonGroup>
						<ButtonGroup>
							<Button bsStyle="danger" onClick={() => onCancel(orderIds[index])}>取消支付</Button>
						</ButtonGroup>
					</ButtonGroup>
				</Navbar>
			</form>
		)
	}
}

PayForm.propTypes = {
	onSubmit: React.PropTypes.func.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	orderIds: React.PropTypes.array.isRequired,
	order: React.PropTypes.object.isRequired,
	marketing: React.PropTypes.object.isRequired,
	index: React.PropTypes.number.isRequired
};

export default reduxForm({
	form: "payForm"
})(PayForm)
