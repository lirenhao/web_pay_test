/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 使用redux-form的FieldArray实现动态添加商品录入框
 */
import React from "react"
import {ListGroup, ListGroupItem, InputGroup, ButtonGroup, Button} from "react-bootstrap"
import {Field} from "redux-form"
import InputField from "./InputField"

const GoodsField = ({fields, orderNum, onButton}) => (
    <ListGroup>
        {fields.map((item, index) =>
            <ListGroupItem key={index}>
                <Field type="text"
                       name={`${item}.name`}
                       component={InputField}
                       label="商品"
                       placeholder="name"/>
                {" "}
                <Field type="number"
                       name={`${item}.price`}
                       component={InputField}
                       label="价格"
                       placeholder="price"/>
                {" "}
                <Field type="number"
                       name={`${item}.quantity`}
                       component={InputField}
                       label="数量"
                       placeholder="quantity"/>
                {" "}
                <InputGroup>
                    <Button bsStyle="danger" onClick={() => fields.remove(index)}>删除</Button>
                </InputGroup>
            </ListGroupItem>
        )}
        <ButtonGroup justified>
            <ButtonGroup>
                <Button onClick={() => fields.push({})}>添加</Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button bsStyle="success" type="submit">提交</Button>
            </ButtonGroup>
            <ButtonGroup className={orderNum && orderNum > 0 ? "": "hidden"}>
                <Button bsStyle="info" onButton={onButton}>
                    <span className="badge">{orderNum}</span>
                    &nbsp;个待支付</Button>
            </ButtonGroup>
        </ButtonGroup>
    </ListGroup>
)

GoodsField.propTypes = {
    orderNum: React.PropTypes.number.isRequired,
    onButton: React.PropTypes.func.isRequired
}

export default GoodsField