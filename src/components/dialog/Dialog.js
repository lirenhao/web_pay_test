/**
 * Author：KL
 * Created by likon on 2016/9/14.
 * Modified By：KL
 * Why & What is modified  <修改原因描述>
 * 添加模态框组件：
 */
//TODO:目前通过点击按钮触发模态框，待修改
import React from 'react'
import {Modal,Button} from 'react-bootstrap'

class Dialog extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            show:false
        };
    }
    render() {
        let close = () => this.setState({ show: false});
        return (
            <div className="modal-container" style={{height: 200}}>
                <Button bsStyle="primary" bsSize="large"
                    onClick={() => this.setState({ show: true})}
                >点击弹出模态框
                </Button>

                <Modal show={this.state.show} onHide={close} container={this} backdrop='static'
                    aria-labelledby="contained-modal-title">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title">消息类型</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        订单成功
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={close}>关闭</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Dialog