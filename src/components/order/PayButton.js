/**
 * Author：pengfei
 * Create Date：2016/9/13
 * Modified By：liRenhao
 * Why & What is modified 点击支付后不能再点击处理
 * <文件描述>
 */
import React from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'

const PayButton = React.createClass({
    getInitialState: function () {
        return {canPay: this.props.canPay};
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({canPay: nextProps.canPay})
    },
    onClick: function () {
        this.props.onReqPay(this.props.orderId)
        this.setState({canPay: false})
    },
    render: function () {
        return (
            <ButtonGroup justified>
                <ButtonGroup>
                    <Button bsStyle={this.state.canPay ? "success" : "warning"}
                            disabled={!this.state.canPay}
                            onClick={this.onClick}>
                        支付
                    </Button>
                </ButtonGroup>
                <ButtonGroup bsClass={this.props.canCancel ? "btn-group" : "hidden"}>
                    <Button bsStyle="danger"
                            disabled={!this.props.canCancel}
                            onClick={() => this.props.onCancel(this.props.orderId)}>
                        取消
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
        )
    }
})

PayButton.propTypes = {
    canPay: React.PropTypes.bool.isRequired,
    canCancel: React.PropTypes.bool.isRequired,
    onReqPay: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
    orderId: React.PropTypes.string.isRequired
}

export default PayButton;