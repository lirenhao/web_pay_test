/**
 * Author：KL
 * Created by likon on 2016/9/9.
 * Modified By：KL
 * Why & What is modified  <修改原因描述>
 * 添加支付表单组件
 */
import React from 'react'
import {ButtonGroup,Button,DropdownButton,MenuItem,Navbar} from 'react-bootstrap'
import {browserHistory} from 'react-router'

class PayForm extends React.Component{
    render(){
        return(
            <div>
            <form>
                <Navbar fixedBottom>
                    <ButtonGroup justified>
                        <DropdownButton title="支付结果" id="bg-justified-dropdown">
                            <MenuItem eventKey="1">成功</MenuItem>
                            <MenuItem eventKey="2">失败</MenuItem>
                        </DropdownButton>
                        <Button bsStyle="danger" href="#" onClick={()=>{browserHistory.push("/acqOrderId")}} >取消</Button>
                    </ButtonGroup>
                </Navbar>
            </form>
            </div>
        )
    }
}

export default PayForm