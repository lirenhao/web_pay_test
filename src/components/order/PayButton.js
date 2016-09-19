/**
 * Author：pengfei
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified 点击支付后不能再点击处理
 * <文件描述>
 */
import React from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'

class PayButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {canPay: props.canPay}
    }

    componentWillReceiveProps(nextProps) {
        this.setState({canPay: nextProps.canPay})
    }

    handleClick(orderId) {
        this.props.onReqPay(orderId)
        this.setState({canPay: false})
    }

    render() {
        const {canCancel, onCancel, orderId} = this.props
        return (
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
        )
    }
}

PayButton.propTypes = {
    canPay: React.PropTypes.bool.isRequired,
    canCancel: React.PropTypes.bool.isRequired,
    onReqPay: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    orderId: React.PropTypes.string.isRequired
}

export default PayButton;