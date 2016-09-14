/**
 * Author：pengfei
 * Create Date：2016/9/14
 * Modified By：pengfei
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import React from "react"
import {connect} from "react-redux"
import Order from "../components/order/Order"

const data  = {
    user: {
        userId: "1",
        userType: "MERCHANT"
    },
    orderIds: [1, 2],
    order: {
        1: {
            orderId: "1",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ],
            isPayAuth:false
        },
        2: {
            orderId: "2",
            items: [
                {"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2},
                {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1},
                {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}
            ],
            isPayAuth:false
        }
    },
    marketing: {
        1: {orderId: "1", amt: 58650, msg: "测试优惠, 一律5折"},
        2: {orderId: "2", amt: 58650, msg: "测试优惠, 一律5折"}
    }
}

const OrderData =React.createClass({
    render(){
        return <Order data={data} index={this.props.params.index}/>
    }
})


// const mapStateToProps =(state)=>{
//     return state
// };


export default connect()(OrderData);

