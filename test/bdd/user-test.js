/**
 * Author：likon
 * Create Date：2016/9/23
 * Modified By：likon
 * Why & What is modified  添加用户端BDD测试方式的功能描述框架
 * <文件描述>：测试客户端中终端类型为用户的功能，包括：登陆、扫描订单、查看订单信息、支付订单、通知
 */
import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme'
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {MockServer, MockRouter} from "../mock"
import Payment from "../../src/Payment"
import {msgHandler} from "../../src/handler"
import reducer from "../../src/reducers"
import DevTools from "../../src/containers/DevTools"
import App from "../../src/containers/App"
import Login from "../../src/containers/Login"
import OrderId from "../../src/containers/OrderId"
import Order from "../../src/containers/Order"
import Pay from "../../src/containers/Pay"

describe('支付系统分两块，包括客户端和服务端', ()=> {
    describe('客户端环境：不确定，可能是PC端的Windows系统、嵌入式系统也可能是手机', ()=> {
        describe('用户端登陆', ()=> {
            let store = null
            let router = null
            let subject = null
            beforeEach(() => {
                store = createStore(reducer, DevTools.instrument())
                router = new MockRouter()
                Payment.setMsgHandler(msgHandler(store, router))
                subject = mount(<Provider store={store}><App><Login/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            it('测试用户登陆失败', ()=> {
                expect(subject.find("button").first().props().disabled).to.equal(true)
            })
            it('测试用户登陆成功', ()=> {
                subject.find("input").first().simulate("change", {target: {value: "1"}})
                subject.find("input").at(2).simulate("change")
                subject.find("form").simulate("submit")
                expect(store.getState().user.userId).to.equal("1")
                expect(store.getState().user.userType).to.equal("USER")
                expect(router.route).to.equal("/orderId")
            })
        })

        describe('用户扫描订单', ()=> {
            let store = null
            let router = null
            let subject = null
            const state = {user: {userId: '1', userType: 'USER'}}
            beforeEach(() => {
                store = createStore(reducer, state, DevTools.instrument())
                router = new MockRouter()
                Payment.setMsgHandler(msgHandler(store, router))
                Payment.open()
                subject = mount(<Provider store={store}><App><OrderId/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            describe('单个用户登陆时，用户在扫描订单页面的情况', ()=> {
                it('当用户没有未完成支付的订单时，结果不会显示“待支付”按钮', ()=> {
                    expect(subject.find("button").length).to.equal(1)
                })
                it('当用户存在至少一个未完成支付的订单时，用户点击“待支付”按钮，页面跳转进入“订单页面”', ()=> {
                    const order = {
                        eventType: "ORDER_ITEMS",
                        orderId: "1",
                        items: [{name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2}]
                    }
                    server.send(order)
                    expect(subject.find("button").length).to.equal(2)
                })
            })
            describe('在文本框内录入订单号操作，用户点击“加入”按钮：匹配商户端创建的订单操作', ()=> {
                it('当加入的订单号时服务器订单存在，页面会跳转到当前订单的“订单页面”', ()=> {
                    subject.find("input").first().simulate("change", {target: {value: "1"}})
                    subject.find("form").simulate("submit")
                    const order = {
                        orderId: "1",
                        items: [{name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2}]
                    }
                    server.send({...order, eventType: "ORDER_ITEMS"})
                    const marketing = {
                        orderId: "1",
                        amt: 58650,
                        msg: "测试优惠, 一律5折"
                    }
                    server.send({...marketing, eventType: "MARKETING"})
                    expect(JSON.stringify(store.getState().order[order.orderId])).to.equal(JSON.stringify(order))
                    expect(JSON.stringify(store.getState().marketing[marketing.orderId])).to.equal(JSON.stringify(marketing))
                    expect(router.route).to.equal("/order")
                })
                it('当加入的订单号时服务器订单不存在，页面会跳到已经匹配完成的“订单页面”', ()=> {
                    subject.find("input").first().simulate("change", {target: {value: "1"}})
                    subject.find("form").simulate("submit")
                    expect(router.route).to.equal("/order")
                })

            })
            describe('同一用户多处登陆时，用户在扫描订单页面的情况', ()=> {
                it('别处登录用户成功加入一个订单。用户在扫描订单页面会出现待支付按钮', ()=> {
                    expect(subject.find("button").length).to.equal(1)
                    const order = {
                        orderId: "1",
                        items: [{name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2}]
                    }
                    server.send({...order, eventType: "ORDER_ITEMS"})
                    const marketing = {
                        orderId: "1",
                        amt: 58650,
                        msg: "测试优惠, 一律5折"
                    }
                    server.send({...marketing, eventType: "MARKETING"})
                    expect(subject.find("button").length).to.equal(2)
                })
            })
            describe('不同用户登陆，匹配同一订单的情况', ()=> {
                it('该订单已被匹配还未支付，用户“加入”该订单，页面跳转进入“订单页面”', ()=> {
                    subject.find("input").first().simulate("change", {target: {value: "1"}})
                    subject.find("form").simulate("submit")
                    const order = {
                        orderId: "1",
                        items: [{name: "ONLY修身撞色拼接女针织裙", price: 34950, quantity: 2}]
                    }
                    server.send({...order, eventType: "ORDER_ITEMS"})
                    const marketing = {
                        orderId: "1",
                        amt: 58650,
                        msg: "测试优惠, 一律5折"
                    }
                    server.send({...marketing, eventType: "MARKETING"})
                    expect(JSON.stringify(store.getState().order[order.orderId])).to.equal(JSON.stringify(order))
                    expect(JSON.stringify(store.getState().marketing[marketing.orderId])).to.equal(JSON.stringify(marketing))
                    expect(router.route).to.equal("/order")
                })
                it('该订单已被匹配正在支付，用户“加入”该订单，提示用户订单正在支付, 当前用户不能参与支付', ()=> {
                    subject.find("input").first().simulate("change", {target: {value: "1"}})
                    subject.find("form").simulate("submit")
                    server.send({eventType: "FAIL", orderId: "1", msg: "用户 u2 参与支付"})
                    expect(store.getState().dialog[0].show).to.equal(true)
                    expect(store.getState().dialog[0].header).to.equal("FAIL")
                    expect(store.getState().dialog[0].body).to.equal("用户 u2 参与支付")
                    expect(router.route).to.equal("/orderId")
                })
            })
        })

        describe('用户查看订单', ()=> {
            let store = null
            let router = null
            let subject = null
            const state = {
                user: {userId: '1', userType: 'USER'},
                orderIds: ['1'],
                order: {'1': {orderId: '1', items: [{name: "ONLY修身撞色拼接女针织裙", price: 1, quantity: 1}]}},
                marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
            }
            beforeEach(() => {
                store = createStore(reducer, state, DevTools.instrument())
                router = new MockRouter()
                Payment.setMsgHandler(msgHandler(store, router))
                Payment.open()
                subject = mount(<Provider store={store}><App><Order/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            describe('测试“支付”按钮', ()=> {
                it('没用商户或用户获得支付权限时，用户在订单页面，点击“支付”按钮，用户进入“支付页面”', ()=> {
                    subject.find("button").first().simulate("click")
                    server.send({eventType: "PAY_AUTH", orderId: "1"})
                    expect(router.route).to.equal("/pay/0")
                })
                it('已有商户或用户获得支付权限时，用户在订单页面，点击“支付”按钮，按钮变为灰色的情况', ()=> {
                    const payButton = subject.find("button").first()
                    payButton.simulate("click")
                    expect(payButton.props().disabled).to.equal(true)
                })
            })
            describe('其他用户匹配该用户的订单', ()=> {
                it('用户如果没有其他订单，收到订单取消提示，并跳转到订单扫描界面', ()=> {
                    server.send({
                        eventType: "PAY_COMPLETED",
                        orderId: "1", result: false,
                        channel: "Client", msg: "取消"
                    })
                    expect(store.getState().dialog[0].show).to.equal(true)
                    expect(store.getState().dialog[0].header).to.equal("订单通知")
                    expect(store.getState().dialog[0].body).to.equal("订单【1】取消成功")
                    expect(router.route).to.equal("/orderId")
                })
                it('用户如果还有其他订单，收到订单取消提示，并显示其他界面', ()=> {
                    server.send({
                        eventType: "ORDER_ITEMS",
                        orderId: '2',
                        items: [{name: "ONLY修身撞色拼接女针织裙", price: 1, quantity: 1}]
                    })
                    server.send({eventType: "ORDER_ITEMS", orderId: '2', amt: 58650, msg: '测试优惠, 一律5折'})
                    server.send({
                        eventType: "PAY_COMPLETED",
                        orderId: "1", result: false,
                        channel: "Client", msg: "取消"
                    })
                    expect(store.getState().dialog[0].show).to.equal(true)
                    expect(store.getState().dialog[0].header).to.equal("订单通知")
                    expect(store.getState().dialog[0].body).to.equal("订单【1】取消成功")
                    expect(router.route).to.equal(undefined)
                    expect(subject.find("button").length).to.equal(2)
                    expect(store.getState().orderIds.length).to.equal(1)
                })
            })
        })

        describe('用户支付订单', ()=> {
            let store = null
            let router = null
            let subject = null
            const state = {
                user: {userId: '1', userType: 'USER'},
                orderIds: ['1'],
                order: {'1': {orderId: '1', items: [{name: "ONLY修身撞色拼接女针织裙", price: 1, quantity: 1}]}},
                marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
            }
            beforeEach(() => {
                store = createStore(reducer, state, DevTools.instrument())
                router = new MockRouter()
                Payment.setMsgHandler(msgHandler(store, router))
                Payment.open()
                subject = mount(<Provider store={store}><App><Pay params={{index: "0"}}/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            describe('用户获得该订单支付权限', ()=> {
                describe('选择支付结果下拉菜单，点击“确定”按钮.', ()=> {
                    it('选择支付结果-成功,点击“确定”按钮.结果：页面跳转进"扫描订单页面"，用户收到支付结果通知：支付完成，支付成功', ()=> {
                        subject.find("select").first().simulate("change", {target: {value: "0"}})
                        subject.find("form").simulate("submit")
                        expect(router.route).to.equal("/orderId")
                        expect(server.clientDate.state).to.equal(true)
                    })
                    it('选择支付结果-失败,点击“确定”按钮.结果：页面跳转进"扫描订单页面"，用户收到支付结果通知：支付完成，支付失败', ()=> {
                        subject.find("select").first().simulate("change", {target: {value: "1"}})
                        subject.find("form").simulate("submit")
                        expect(router.route).to.equal("/orderId")
                        expect(server.clientDate.state).to.equal(false)
                    })

                })
                describe('点击“取消支付”按钮操作', ()=> {
                    it('操作：用户点击“取消支付”按钮，结果：从“订单页面”跳转进入“支付页面”', ()=> {
                        subject.find("button").last().simulate("click")
                        expect(router.route).to.equal("/orderId")
                        expect(server.clientDate.eventType).to.equal("GIVE_UP_PAY")
                    })
                })
            })
        })

        // TODO 无法取到模态框先判断state的状态，后续再做优化
        describe('用户接收通知', ()=> {
            let store = null
            let router = null
            let subject = null
            const state = {
                user: {userId: '1', userType: 'USER'},
            }
            beforeEach(() => {
                store = createStore(reducer, state, DevTools.instrument())
                router = new MockRouter()
                Payment.setMsgHandler(msgHandler(store, router))
                Payment.open()
                subject = mount(<Provider store={store}><App/></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            it('用户收到订单取消通知', () => {
                server.send({
                    eventType: "PAY_COMPLETED",
                    orderId: "1", result: false,
                    channel: "Client", msg: "取消"
                })
                expect(store.getState().dialog[0].show).to.equal(true)
                expect(store.getState().dialog[0].header).to.equal("订单通知")
                expect(store.getState().dialog[0].body).to.equal("订单【1】取消成功")
            })
            it('用户收到FAIL通知', () => {
                server.send({
                    eventType: "FAIL",
                    orderId: "1",
                    msg: "用户 u2 参与支付"
                })
                expect(store.getState().dialog[0].show).to.equal(true)
                expect(store.getState().dialog[0].header).to.equal("FAIL")
                expect(store.getState().dialog[0].body).to.equal("用户 u2 参与支付")
            })
            it('用户收到MESSAGE通知', () => {
                server.send({
                    eventType: "MESSAGE",
                    orderId: "1", level: "WARN",
                    msg: "订单正在支付, 当前用户不能参与支付"
                })
                expect(store.getState().dialog[0].show).to.equal(true)
                expect(store.getState().dialog[0].header).to.equal("WARN")
                expect(store.getState().dialog[0].body).to.equal("订单正在支付, 当前用户不能参与支付")
            })
            it('用户收到支付成功通知', () => {
                server.send({
                    eventType: "PAY_COMPLETED",
                    orderId: "1", result: true,
                    channel: "测试渠道", msg: "成功"
                })
                expect(store.getState().dialog[0].show).to.equal(true)
                expect(store.getState().dialog[0].header).to.equal("支付通知")
                expect(store.getState().dialog[0].body).to.equal("订单【1】支付成功")
            })
            it('用户收到支付失败通知', () => {
                server.send({
                    eventType: "PAY_COMPLETED",
                    orderId: "1", result: false,
                    channel: "测试渠道", msg: "失败"
                })
                expect(store.getState().dialog[0].show).to.equal(true)
                expect(store.getState().dialog[0].header).to.equal("支付通知")
                expect(store.getState().dialog[0].body).to.equal("订单【1】支付失败")
            })
        })

    })
})