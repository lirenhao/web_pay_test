/**
 * Author：KL
 * Created by likon on 2016/9/9.
 * Modified By：KL
 * Why & What is modified  <修改原因描述>
 * 添加支付表单组件
 * 添加商品列表组件、优惠信息组件、结算信息组件
 */
import React from 'react'
import {ButtonGroup,Button,DropdownButton,MenuItem,Navbar} from 'react-bootstrap'
import {browserHistory} from 'react-router'
import GoodsItems from '../order/GoodsItems'
import Billing from '../order/Billing'
import Marketing from '../order/Marketing'

var state = {
    user: {
        userId: "1",
        userType: "USER"
    },
    orderIds: [1, 2],
    order: {
        1: {
            orderId: "1",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ]
        },
        2: {
            orderId: "2",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ]
        }
    },
    marketing: {
        1: {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"},
        2: {orderId: "2", amt: 58650, msg: "测试优惠, 一律5折"}
    }
};

class PayForm extends React.Component{
    getOrderInfoComponent (orderInfo){
        return (
            <div>
                <div>
                    <span><b>订单号：</b>{state.orderIds[0]}</span>
                    <span><b>流水号：</b></span>
                </div>
                <div>
                    <GoodsItems items={state.order[1].items}/>
                    <Marketing marketing={state.marketing[1]} />
                    <Billing items={state.order[1].items} marketing={state.marketing[1]}/>
                </div>
            </div>
        )
    }
    render(){
        return(
            <div>
                {this.getOrderInfoComponent(this.props.orderInfo)}
                <form>
                    <Navbar fixedBottom>
                        <ButtonGroup justified>
                            <DropdownButton title="支付结果" id="bg-justified-dropdown" ref={c=>selector=c}>
                                <MenuItem eventKey="1">成功</MenuItem>
                                <MenuItem eventKey="2">失败</MenuItem>
                            </DropdownButton>
                            <Button bsStyle="danger" href="#" onClick={
                                ()=>{if(state.user.userType=="USER")
                                    browserHistory.push("/acqOrderId")}
                            } >取消</Button>
                        </ButtonGroup>
                    </Navbar>
                </form>
            </div>
        )
    }
}

export default PayForm