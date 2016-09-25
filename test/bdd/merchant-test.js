/**
 * Author：likon
 * Create Date：2016/9/23
 * Modified By：likon
 * Why & What is modified  添加商户端BDD测试方式的功能描述框架
 * <文件描述>：测试客户端中终端类型为商户的功能，包括：登陆、创建订单、查看订单信息、支付订单、通知
 */
import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme';
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {MockServer, MockRouter} from "../mock"
import Payment from "../../src/Payment"
import {msgHandler} from "../../src/handler"
import reducer from "../../src/reducers"
import DevTools from "../../src/containers/DevTools"
import App from "../../src/containers/App"
import Login from "../../src/containers/Login"
import Goods from "../../src/containers/Goods"
import Order from "../../src/containers/Order"
import OrderInfo from "../../src/components/order/OrderInfo"
import Pay from "../../src/containers/Pay"

describe('支付系统分两块，包括客户端和服务端', ()=> {
    let server = null
    let store = null
    let router = null
    let subject = null
    beforeEach(() => {
        server = new MockServer()
        store = createStore(reducer, DevTools.instrument())
        router = new MockRouter()
        Payment.setMsgHandler(msgHandler(store, router))
    })
    describe('客户端环境：不确定，可能是PC端的Windows系统、嵌入式系统也可能是手机', ()=> {
        describe('测试客户端登陆：它分为两种类型包括商户端和用户端', ()=> {
            beforeEach(()=> {
                subject = mount(<Provider store={store}><App><Login/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            it('测试商户登陆成功', ()=> {
                subject.find("input").first().simulate("change", {target: {value: "1"}})
                subject.find("input").at(1).simulate("change")
                subject.find("form").simulate("submit")
                expect(store.getState().user.userId).to.equal("1")
                expect(store.getState().user.userType).to.equal("MERCHANT")
                expect(router.route).to.equal("/goods")
            });
            it('测试商户端登陆失败', ()=> {
                expect(subject.find("button").first().props().disabled).to.equal(true)
            });
            afterEach(()=> {
                server.close()
            })
        });
        describe('测试商户创建订单', ()=> {
            beforeEach(()=> {
                subject = mount(<Provider store={store}><App><Goods/></App></Provider>, {
                    context: {
                        router: router
                    },
                    childContextTypes: {
                        router: React.PropTypes.object
                    }
                })
            })
            describe('测试对商品信息的操作', ()=> {
                it('测试添加商品按钮', ()=> {
                    //没点击按钮前页面元素class为form-control个数
                    expect(subject.find('.form-control')).to.have.length(9)
                    const button = subject.find("button").at(3)
                    button.simulate("click")
                    //点击按钮后页面元素class为form-control个数
                    expect(subject.find('.form-control')).to.have.length(12)
                    //console.log(subject.find('.form-control').at(11).html());
                    //点击按钮后新增页面元素
                    expect(subject.find('.form-control').at(9).html()).to.equal('<input type="text" name="goods[3].name" value="" placeholder="name" id="goods[3].name" class="form-control">')
                    expect(subject.find('.form-control').at(10).html()).to.equal('<input type="number" name="goods[3].price" value="" placeholder="price" id="goods[3].price" class="form-control">')
                    expect(subject.find('.form-control').at(11).html()).to.equal('<input type="number" name="goods[3].quantity" value="" placeholder="quantity" id="goods[3].quantity" class="form-control">')
                });
                it('点击“删除”按钮：删除该行商品信息', ()=> {
                    //没点击按钮前页面元素class为form-control个数
                    expect(subject.find('.form-control')).to.have.length(9)
                    const button = subject.find("button").at(0)
                    button.simulate("click")
                    //点击按钮后页面元素class为form-control个数
                    expect(subject.find('.form-control')).to.have.length(6)
                });
            })
            describe('测试点击“提交”按钮,提交订单', ()=> {
                it('当录入商品信息不完整时，不能成功提交订单', ()=> {
                    //添加一组新的商品信息录入元素
                    const button = subject.find("button").at(3)
                    button.simulate("click")
                    //点击提交订单按钮
                    const submit = subject.find("button").at(5)
                    submit.simulate("submit")
                    //没有产生订单，证明没有提交成功
                    expect(store.getState().orderIds.length).to.equal(0)
                });
                it('当录入完整的商品信息，点击“提交”按钮时，会成功提交订单，结果页面跳转进入“订单页面”', ()=> {
                    //点击提交订单按钮
                    const submit = subject.find("button").at(4)
                    submit.simulate("submit")
                    //设置订单管理服务返回值
                    server.send({
                        "eventType": "ORDER_ITEMS",
                        "orderId": "12",
                        "items": [{"name": "ONLY修身撞色拼接女针织裙", "price": 34950, "quantity": 2}, {
                            "name": "ONLY圆点荷叶边女修身裙",
                            "price": 19950,
                            "quantity": 1
                        }, {"name": "ONLY棉宽松字母牛仔女外套", "price": 27450, "quantity": 1}]
                    })
                    //查看store中state中是否包含该订单信息
                    expect(store.getState().orderIds.length).to.equal(1)
                    expect(store.getState().orderIds[0]).to.equal("12")
                    expect(store.getState().order[store.getState().orderIds[0]].orderId).to.equal("12")
                    //查看路由跳转地址是否是订单界面
                    expect(router.route).to.equal("/order")
                });
            });
            describe('测试“订单待支付”按钮', ()=> {
                describe('当商户端存在未支付完成的订单时，存在“订单待支付”按钮', ()=> {
                    it('点击“订单待支付”按钮，页面跳转到待支付的“订单页面”', ()=> {
                        //设置订单管理服务返回值
                        server.send({
                            "eventType": "ORDER_ITEMS",
                            "orderId": "12",
                            "items": [{
                                "name": "ONLY修身撞色拼接女针织裙",
                                "price": 34950,
                                "quantity": 2
                            }, {"name": "ONLY圆点荷叶边女修身裙", "price": 19950, "quantity": 1}, {
                                "name": "ONLY棉宽松字母牛仔女外套",
                                "price": 27450,
                                "quantity": 1
                            }]
                        })
                        //获取“订单待支付”按钮
                        const button = subject.find("button").at(5)
                        // 点击按钮
                        button.simulate("click")
                        //查看路由跳转地址是否是订单界面
                        expect(router.route).to.equal("/order")
                    })
                })
                describe('当商户端不存在未支付完成的订单时，不存在“订单待支付”按钮', ()=> {
                    it('当商户端不存在未支付完成的订单时，不存在“订单待支付”按钮', ()=> {
                        expect(subject.find(".hidden")).to.have.length(1);
                    });
                });
            });
            afterEach(()=> {
                server.close()
            })
        });
        describe('测试商户查看订单', ()=> {
            describe('测试点击“支付”按钮操作', ()=> {
                describe('无法点击“支付”按钮', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                        orderIds: ['1'],
                        order: {'1': {orderId: '1', items: [{name: "ONLY修身撞色拼接女针织裙", price: 1, quantity: 1}]}}
                    }
                    beforeEach(()=> {
                        store = createStore(reducer, state, DevTools.instrument())
                        Payment.setMsgHandler(msgHandler(store, router))
                        subject = mount(<Provider store={store}><App><Order/></App></Provider>, {
                            context: {
                                router: router
                            },
                            childContextTypes: {
                                router: React.PropTypes.object
                            }
                        })
                    })
                    it('当用户未匹配该订单时，商户无法看到优惠信息和结算信息，无法点击“支付”按钮', ()=> {
                        expect(subject.find("button").first().props().disabled).to.equal(true)
                    });
                    afterEach(()=> {
                        server.close()
                    })
                })
                describe('可以点击“支付”按钮', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                        orderIds: ['1'],
                        order: {'1': {orderId: '1', items: [{name: "ONLY修身撞色拼接女针织裙", price: 1, quantity: 1}]}},
                        marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
                    }
                    beforeEach(()=> {
                        store = createStore(reducer, state, DevTools.instrument())
                        Payment.setMsgHandler(msgHandler(store, router))
                        subject = mount(<Provider store={store}><App><Order/></App></Provider>, {
                            context: {
                                router: router
                            },
                            childContextTypes: {
                                router: React.PropTypes.object
                            }
                        })
                    })
                    it('当用户已匹配该订单时，商户可以点击“支付”按钮，页面跳转进入“订单支付”页面', ()=> {
                        //console.log(subject.find("button").at(0).html());
                        //获得支付按钮
                        const button = subject.find("button").first()
                        //是否可以点击支付按钮
                        expect(button.props().disabled).to.equal(false)
                        // 点击按钮
                        button.simulate("click")
                        //给服务初始化响应事件信息
                        server.send({eventType: "PAY_AUTH", orderId: "1"})
                        //查看路由跳转地址是否是订单界面
                        expect(router.route).to.equal("/pay/0")
                    })
                    afterEach(()=> {
                        server.close()
                    })
                })
            });
            describe('测试点击“取消”按钮操作', ()=> {
                describe('商户有多个未完成支付的订单时', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                        orderIds: ['1', '2'],
                        order: {
                            '1': {orderId: '1', items: [{name: 'ONLY修身撞色拼接女针织裙', price: 1, quantity: 1}]},
                            '2': {orderId: '2', items: [{name: 'ONLY修身撞色拼接女针织裙', price: 1, quantity: 1}]}
                        },
                        marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
                    }
                    beforeEach(()=> {
                        store = createStore(reducer, state, DevTools.instrument())
                        Payment.setMsgHandler(msgHandler(store, router))
                        subject = mount(<Provider store={store}><App><Order/></App></Provider>, {
                            context: {
                                router: router
                            },
                            childContextTypes: {
                                router: React.PropTypes.object
                            }
                        })
                    })
                    it('商户取消订单，订单切换为上一个订单信息', ()=> {
                        // //console.log(subject.find("button").last().html());
                        // //获得支付按钮
                        const button = subject.find("button").last()
                        // //点击按钮
                        button.simulate("click")
                        // 给服务初始化响应事件信息
                        server.send({
                            "eventType": "PAY_COMPLETED",
                            "orderId": "2",
                            "result": false,
                            "channel": "Client",
                            "msg": "取消"
                        })
                        expect(store.getState().orderIds.length).to.equal(1)
                        expect(store.getState().orderIds[0]).to.equal("1")
                        expect(store.getState().order[store.getState().orderIds[0]].orderId).to.equal("1")
                        expect(store.getState().order[store.getState().orderIds[0]].items[0].name).to.equal('ONLY修身撞色拼接女针织裙')
                        expect(store.getState().order[store.getState().orderIds[0]].items[0].price).to.equal(1)
                        expect(store.getState().order[store.getState().orderIds[0]].items[0].quantity).to.equal(1)
                        //界面td元素个数：一组商品抬头（3个td）加上一组商品信息（3个td）
                        expect(subject.find(OrderInfo).render().find("td")).to.have.length(6)
                    });
                    afterEach(()=> {
                        server.close()
                    })
                });
                describe('当商户只有一个订单时', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                        orderIds: ['1'],
                        order: {
                            '1': {orderId: '1', items: [{name: 'ONLY修身撞色拼接女针织裙', price: 1, quantity: 1}]}
                        },
                        marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
                    }
                    beforeEach(()=> {
                        store = createStore(reducer, state, DevTools.instrument())
                        Payment.setMsgHandler(msgHandler(store, router))
                        subject = mount(<Provider store={store}><App><Order/></App></Provider>, {
                            context: {
                                router: router
                            },
                            childContextTypes: {
                                router: React.PropTypes.object
                            }
                        })
                    })
                    afterEach(()=> {
                        server.close()
                    })
                    it('商户取消订单，页面跳转到“创建订单”页面，并且商户不会收到取消订单的通知', ()=> {
                        const button = subject.find("button").last()
                        // //点击按钮
                        button.simulate("click")
                        // 给服务初始化响应事件信息
                        server.send({
                            "eventType": "PAY_COMPLETED",
                            "orderId": "1",
                            "result": false,
                            "channel": "Client",
                            "msg": "取消"
                        })
                        expect(router.route).to.equal("/goods")
                        //无订单取消通知信息
                        expect(store.getState().dialog).to.have.length(0)
                    });
                })
            })
        })
        describe('商户支付订单', ()=> {
            describe('商户和用户都登陆，且用户已匹配该订单', ()=> {
                const state = {
                    user: {userId: '1', userType: 'MERCHANT'},
                    orderIds: ['1'],
                    order: {
                        '1': {orderId: '1', items: [{name: 'ONLY修身撞色拼接女针织裙', price: 1, quantity: 1}]}
                    },
                    marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
                }
                beforeEach(()=> {
                    store = createStore(reducer, state, DevTools.instrument())
                    Payment.setMsgHandler(msgHandler(store, router))
                    subject = mount(<Provider store={store}><App><Pay params={{index: "0"}}/></App></Provider>, {
                        context: {
                            router: router
                        },
                        childContextTypes: {
                            router: React.PropTypes.object
                        }
                    })
                })
                afterEach(()=> {
                    server.close()
                })
                describe('选择支付结果下拉菜单，点击“确定”按钮.', ()=> {
                    it('选择支付结果-成功,点击“确定”按钮.结果：页面跳转进"创建订单页面"，商户收到支付结果通知：支付完成，支付成功', ()=> {
                        subject.find("select").first().simulate("change", {target: {value: "0"}})
                        subject.find("form").simulate("submit")
                        expect(router.route).to.equal("/goods")
                        server.send({
                            "eventType": "PAY_COMPLETED",
                            "orderId": "1",
                            "result": true,
                            "channel": "测试渠道",
                            "msg": "成功"
                        })
                        expect(store.getState().dialog[0].show).to.equal(true)
                        expect(store.getState().dialog[0].header).to.equal("支付通知")
                        expect(store.getState().dialog[0].body).to.equal("订单【1】支付成功")
                    })
                    it('选择支付结果-失败,点击“确定”按钮.结果：页面跳转进"创建订单页面"，商户收到支付结果通知：支付完成，支付失败', ()=> {
                        subject.find("select").first().simulate("change", {target: {value: "1"}})
                        subject.find("form").simulate("submit")
                        expect(router.route).to.equal("/goods")
                        server.send({
                            "eventType": "PAY_COMPLETED",
                            "orderId": "1",
                            "result": false,
                            "channel": "测试渠道",
                            "msg": "失败"
                        })
                        expect(store.getState().dialog[0].show).to.equal(true)
                        expect(store.getState().dialog[0].header).to.equal("支付通知")
                        expect(store.getState().dialog[0].body).to.equal("订单【1】支付失败")
                    })
                });
                describe('点击“取消支付”按钮', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                        orderIds: ['1'],
                        order: {
                            '1': {orderId: '1', items: [{name: 'ONLY修身撞色拼接女针织裙', price: 1, quantity: 1}]}
                        },
                        marketing: {'1': {orderId: '1', amt: 58650, msg: '测试优惠, 一律5折'}}
                    }
                    beforeEach(()=> {
                        store = createStore(reducer, state, DevTools.instrument())
                        Payment.setMsgHandler(msgHandler(store, router))
                        subject = mount(<Provider store={store}><App><Pay params={{index: "0"}}/></App></Provider>, {
                            context: {
                                router: router
                            },
                            childContextTypes: {
                                router: React.PropTypes.object
                            }
                        })
                    })
                    afterEach(()=> {
                        server.close()
                    })
                    describe('只有商户操作该订单', ()=> {
                        it('商户点击“取消支付”按钮结果：页面跳转到“创建订单”页面', ()=> {
                            const button = subject.find("button").last()
                            button.simulate("click")
                            expect(router.route).to.equal("/goods")
                        })

                    })
                    describe('商户和用户操作同一订单，用户先进入“支付页面”，商户在“订单页面”再点击“支付”按钮变为灰色，用户在支付页面“取消支付”的情况.', ()=> {
                        it('用户点击“取消支付”按钮.结果：商户端获得支付授权，从“订单页面”跳转进入“支付页面”', ()=> {
                            //todo 待定测试方式
                        })
                    })

                });
            })
            describe('商户端通知', ()=> {
                describe('商户端和用户端已登陆的情况下，用户支付完成，商户会收到通知', ()=> {
                    const state = {
                        user: {userId: '1', userType: 'MERCHANT'},
                    }
                    beforeEach(()=> {
                        store = createStore(reducer,state, DevTools.instrument())
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
                    afterEach(()=> {
                        server.close()
                    })
                    it('无论商户端在哪个页面，用户支付成功订单，商户会收到支付成功通知。', ()=> {
                        server.send({
                            eventType: "PAY_COMPLETED",
                            orderId: "1", result: true,
                            channel: "测试渠道", msg: "成功"
                        })

                        // expect(store.getState().dialog[0].show).to.equal(true)
                        // expect(store.getState().dialog[0].header).to.equal("支付通知")
                        // expect(store.getState().dialog[0].body).to.equal("订单【1】支付成功")
                    })
                    it('无论商户端在哪个页面，用户支付失败订单，商户会收到支付失败通知。', ()=> {
                        server.send({
                            eventType: "PAY_COMPLETED",
                            orderId: "1", result: false,
                            channel: "测试渠道", msg: "失败"
                        })
                        // expect(store.getState().dialog[0].show).to.equal(true)
                        // expect(store.getState().dialog[0].header).to.equal("支付通知")
                        // expect(store.getState().dialog[0].body).to.equal("订单【1】支付失败")
                    })
                })
             });
        })
        afterEach(()=> {
            server.close()
        })
    })
})

