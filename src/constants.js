/**
 * Author：liRenhao
 * Create Date：2016/9/18
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * 与后台服务交互所用到的eventType的类型
 */
import keyMirror from 'keymirror';

export default {
    /**
     * 向服务器发送数据的eventType的值
     */
    ServerCmd: keyMirror({
        CLIENT_SIGN_IN: null,
        CREATE_ORDER: null,
        JOIN_ORDER: null,
        CANCEL_ORDER: null,
        PAY_AUTH_REQ: null,
        GIVE_UP_PAY: null,
        PAY_RESULT: null
    }),
    /**
     * 从服务器接收数据的eventType的值
     */
    ClientCmd: keyMirror( {
        ORDER_ITEMS: null,
        MARKETING: null,
        PAY_AUTH: null,
        PAY_COMPLETED: null,
        FAIL: null,
        MESSAGE: null
    }),
    /**
     * 登录用户的类型
     */
    TerminalType: keyMirror({
        MERCHANT: null,
        USER: null
    })
}