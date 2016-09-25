/**
 * Author：KL
 * Create Date：2016/9/14
 * Modified By：kongli
 * Why & What is modified ：添加模态框组件
 * Modified By：liRenhao
 * Why & What is modified 重新定义模态框，把模态框的state添加到store中的state
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from 'react'
import {Modal, Button} from 'react-bootstrap'

/**
 * 模态框组件描述：定义dialog组件，传入一个对象，该对象包括四个参数，返回dialog组件
 * @param show:是bool类型的必输值。指是否展示dialog。当模态框modal的属性show为true时，则显示模态框
 * @param header:dialog的标题
 * @param body:dialog内容
 * @param close:关闭事件
 */
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