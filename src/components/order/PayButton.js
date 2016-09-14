/**
 * Author：pengfei
 * Create Date：2016/9/13
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */


import React from 'react'
import {ButtonGroup, Button} from 'react-bootstrap'
import {browserHistory} from 'react-router'

class PayButton extends React.Component {
    componentDidUpdate() {
        //browserHistory.push("/payFrom/"+this.props.orderId)
    }
    //todo 待完善按钮点击事件的处理
    render() {
        let payButton = "success";
        let payClass = "";
        let cancelClass = "";
        let disabled = false;

        if (!this.props.canCancel) {
            cancelClass += "hidden";
        }
        if (this.props.canPay) {
            payButton = "warning";
            disabled = true;
        }
        return (
            <ButtonGroup justified>
                <ButtonGroup className={payClass}>
                    <Button bsStyle={payButton}
                            onClick={
                                this.props.onReqPay
                            }
                            disabled={disabled}
                    >支付
                    </Button>
                </ButtonGroup>
                <ButtonGroup className={cancelClass}>
                    <Button bsStyle="danger"
                            onClick={
                                this.props.onCancel
                            }>取消
                    </Button>
                </ButtonGroup>
            </ButtonGroup>
        )
    }
}

export default PayButton;