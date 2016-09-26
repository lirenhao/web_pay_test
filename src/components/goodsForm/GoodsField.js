/**
 * Author：liRenhao
 * Create Date：2016/9/9
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * Modified By：kongli
 * Why & What is modified 给添加按钮和提交按钮添加底部导航<Navbar>属性为fixedBottom
 * Modified By：kongli
 * Why & What is modified 添加注释
 * 使用redux-form的FieldArray实现动态添加商品录入框
 */
import React from "react"
import {ListGroup, ListGroupItem, InputGroup, ButtonGroup, Button,Navbar} from "react-bootstrap"
import {Field} from "redux-form"
import InputField from "./InputField"

/**
 * 描述：定义一个商品信息组件，传入参数是一个包括三个值的对象，
 * 输出组件内容：商品信息（名称、价格、数量、删除按钮）、添加按钮、提交按钮、待支付订单按钮
 * 实现了对商品输入信息的验证
 * @param fields ：是指商品信息，它是一个数组，将商品信息数组做映射，并给商品信息组件赋值
 * @param orderNum：是指订单号，是值类型的必输值
 * @param onButton：待支付按钮点击事件，是必输的函数
 */
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
        <Navbar fixedBottom>
            <ButtonGroup justified>
                <ButtonGroup>
                    <Button onClick={() => fields.push({})}>添加</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button bsStyle="success" type="submit">提交</Button>
                </ButtonGroup>
                <ButtonGroup className={orderNum && orderNum > 0 ? "": "hidden"}>
                    <Button bsStyle="info" onClick={onButton}>
                        <span className="badge">{orderNum}</span>
                        &nbsp;个待支付</Button>
                </ButtonGroup>
            </ButtonGroup>
        </Navbar>
    </ListGroup>
)

/**
 * 商品信息组件的属性
 * @type {{orderNum: *}}:值类型的订单号，是必传属性
 * @type {{onButton: *}}:待支付按钮点击事件，是必传的函数属性
 */
GoodsField.propTypes = {
    orderNum: React.PropTypes.number.isRequired,
    onButton: React.PropTypes.func.isRequired
}

export default GoodsField