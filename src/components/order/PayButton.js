/**
 * Author：pengfei
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified 点击支付后不能再点击处理
 * <文件描述>
 * Modified By：kongli
 * Why & What is modified:添加底部导航<Navbar fixedBottom></Navbar>
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from 'react'
import {ButtonGroup, Button,Navbar} from 'react-bootstrap'

/**
 * 支付、取消按钮组件：它是订单信息组件(Order)的子组件
 */
class PayButton extends React.Component {
    /**
     * 初始化支付、取消按钮组件的状态：是否能支付
     * @param props 调用者传给组件的属性
     */
    constructor(props) {
        super(props)
        this.state = {canPay: props.canPay}
    }

    // TODO 补充componentWillReceiveProps注释
    /**
     * 组件将要接收属性时触发的事件
     * @param nextProps 调用者传给组件的下一个属性
     */
    componentWillReceiveProps(nextProps) {
        this.setState({canPay: nextProps.canPay})
    }

    /**
     * 支付按钮的单击事件
     * @param orderId 订单ID
     */
    handleClick(orderId) {
        this.props.onReqPay(orderId)
        this.setState({canPay: false})
    }

    render() {
        const {canCancel, onCancel, orderId} = this.props
        return (
            <Navbar fixedBottom>
                <ButtonGroup justified>
                    <ButtonGroup>
                        <Button bsStyle={this.state.canPay ? "success" : "warning"}
                                disabled={!this.state.canPay}
                                onClick={() => this.handleClick(orderId)}>
                            支付
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup bsClass={canCancel ? "btn-group" : "hidden"}>
                        <Button bsStyle="danger"
                                disabled={!canCancel}
                                onClick={() => onCancel(orderId)}>
                            取消
                        </Button>
                    </ButtonGroup>
                </ButtonGroup>
            </Navbar>
        )
    }
}

/**
 * 支付、取消按钮组件的必传属性
 * @type {{canPay: *}}  是否能支付
 * @type {{canCancel: *}} 是否有取消按钮
 * @type {{onReqPay: *}}  支付请求事件
 * @type {{onCancel: *}}  取消订单事件
 * @type {{orderId: *}}   订单ID
 */
PayButton.propTypes = {
    canPay: React.PropTypes.bool.isRequired,
    canCancel: React.PropTypes.bool.isRequired,
    onReqPay: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    orderId: React.PropTypes.string.isRequired
}

export default PayButton;