/**
 * Author：KL
 * Created by likon on 2016/9/9.
 * Modified By：KL
 * Why & What is modified  添加支付表单组件，包括：商品列表组件、优惠信息组件、结算信息组件、确定按钮、取消支付按钮
 * Modified By：Pengfei
 * Why & What is modified  添加订单号和流水号处理和展示样式
 * Modified By：liRenhao
 * Why & What is modified  解决商户取消订单用户还停留在支付界面的Bug
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 支付表单组件，包括：商品列表组件、优惠信息组件、结算信息组件、确定按钮、取消支付按钮
 */
import React from 'react'
import {Field, reduxForm} from "redux-form"
import {ButtonGroup, Button, FormControl, Navbar} from 'react-bootstrap'
import Billing from '../order/Billing'
import Marketing from '../order/Marketing'
import OrderInfo from '../order/OrderInfo'
import './PayForm.scss'
import style from './PayForm.scss'

/**
 * 自定义支付结果下拉菜单表单验证组件
 * @param input 属性对象
 */
const PayField = ({input}) => (
    <FormControl {...input} componentClass="select">
        <option value="0" checked="checked">成功</option>
        <option value="1">失败</option>
    </FormControl>
)

/**
 * 获取流水号函数
 * @param orderId 订单ID
 * @returns {*} 流水号
 */
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

/**
 * 支付表单组件
 */
class PayForm extends React.Component {

    /**
     * 初始化支付表单组件的状态，订单ID为通过属性的订单ID数组的下标的值进行获取
     * @param props 调用组件者给组件传递的参数
     */
    constructor(props) {
        super(props)
        this.state = {orderId: props.orderIds[props.index]}
    }

    /**
     * 当组件的props改变时，判断要支付的订单是否被取消，如果被取消则执行onLink函数
     * @param nextProps 改变后的props
     */
    componentWillReceiveProps(nextProps) {
        if (nextProps.orderIds.indexOf(this.state.orderId) < 0)
            nextProps.onLink()
    }

    render() {
        //定义支付组件的属性
        const {handleSubmit, onSubmit, onCancel, order, marketing} = this.props
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.marginOutTopBottom}>
                    <div className={style.marginBottom}>
                        <span className={style.marginRight}><b>订单号：{this.state.orderId}</b></span>
                        <span><b>流水号：{getLsNo(this.state.orderId)}</b></span>
                    </div>
                    <div>
                        <OrderInfo items={order[this.state.orderId] ? order[this.state.orderId].items : []}/>
                        <Marketing marketing={marketing[this.state.orderId]}/>
                        <Billing items={order[this.state.orderId] ? order[this.state.orderId].items : []}
                                 marketing={marketing[this.state.orderId]}/>
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
                            <Button bsStyle="danger" onClick={() => onCancel(this.state.orderId)}>取消支付</Button>
                        </ButtonGroup>
                    </ButtonGroup>
                </Navbar>
            </form>
        )
    }
}

/**
 * onSubmit:表单支付完成事件（事件内容：向订单服务发送支付结果；根据用户类型跳转到“创建订单界面”或“匹配订单界面”）
 * onCancel:取消支付事件（事件内容：向订单服务发送giveUpPay事件；根据用户类型跳转到“创建订单界面”或“匹配订单界面”）
 * onLink: 订单取消，页面跳转事件（事件内容：）
 * orderIds: 订单ID数组
 * order: 订单信息
 * marketing: 优惠信息
 * index: 订单ID在订单ID数组中的索引
 * @type {{onSubmit: func, onCancel: func, onLink: func, orderIds: array, order: object, marketing: object, index: number}}
 */
PayForm.propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    onLink: React.PropTypes.func.isRequired,
    orderIds: React.PropTypes.array.isRequired,
    order: React.PropTypes.object.isRequired,
    marketing: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
}
/**
 * 输出支付表单验证组件
 */
export default reduxForm({
    form: "payForm"
})(PayForm)
