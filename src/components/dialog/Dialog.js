/**
 * Author：KL
 * Create Date：2016/9/14
 * Modified By：liRenhao
 * Why & What is modified 重新定义模态框把模态框的state添加到store中的state
 * 添加模态框组件
 */
import React from 'react'
import {Modal, Button} from 'react-bootstrap'

const Dialog = ({show, header, body, close}) => {
    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>{header}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={close}>关闭</Button>
            </Modal.Footer>
        </Modal>
    )
}

Dialog.propTypes = {
    show: React.PropTypes.bool.isRequired,
    header: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    close: React.PropTypes.func.isRequired
}

export default Dialog