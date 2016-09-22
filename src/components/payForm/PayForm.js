/**
 * Author：KL
 * Created by likon on 2016/9/9.
 * Modified By：KL
 * Why & What is modified  添加支付表单组件，包括：商品列表组件、优惠信息组件、结算信息组件、确定按钮、取消支付按钮
 * Modified By：Pengfei
 * Why & What is modified  添加订单号和流水号处理和展示样式
 * Modified By：liRenhao
 * Why & What is modified  解决商户取消订单用户还停留在支付界面的Bug
 */
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {ButtonGroup, Button, FormControl, Navbar} from 'react-bootstrap'
import Billing from '../order/Billing'
import Marketing from '../order/Marketing'
import OrderInfo from '../order/OrderInfo'
import './PayForm.scss'
import style from './PayForm.scss'

const PayField = ({input}) => (
    <FormControl {...input} componentClass="select">
        <option value="0" checked="checked">成功</option>
        <option value="1">失败</option>
    </FormControl>
)

const getLsNo = (orderId)=> {
    function pad(num, n) {
        var len = num.toString().length
        while (len < n) {
            num = "0" + num
            len++
        }
        return num
    }

    return orderId + pad(Math.floor(Math.random() * 100), 3)
}

class PayForm extends React.Component {

    componentWillReceiveProps(nextProps) {
        const orderId = this.props.orderIds[this.props.index]
        if (nextProps.orderIds.indexOf(orderId) < 0) {
            nextProps.onLink()
        }
    }

    render() {
        const {handleSubmit, onSubmit, onCancel, orderIds, order, marketing, index} = this.props
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.marginOutTopBottom}>
                    <div className={style.marginBottom}>
                        <span className={style.marginRight}><b>订单号：{orderIds[index]}</b></span>
                        <span><b>流水号：{getLsNo(orderIds[index])}</b></span>
                    </div>
                    <div>
                        <OrderInfo items={order[orderIds[index]].items}/>
                        <Marketing marketing={marketing[orderIds[index]]}/>
                        <Billing items={order[orderIds[index]].items} marketing={marketing[orderIds[index]]}/>
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
    onLink: React.PropTypes.func.isRequired,
    orderIds: React.PropTypes.array.isRequired,
    order: React.PropTypes.object.isRequired,
    marketing: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
}

export default reduxForm({
    form: "payForm"
})(PayForm)
