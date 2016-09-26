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

/**
 * show:是否展示dialog。当模态框modal的属性show为true时，则显示模态框
 * header:dialog的标题
 * body:dialog内容
 * close:关闭事件
 * @type {{show: bool, header: string, body: string, close: func}}
 */
Dialog.propTypes = {
    show: React.PropTypes.bool.isRequired,
    header: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    close: React.PropTypes.func.isRequired
}

export default Dialog