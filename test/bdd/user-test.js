/**
 * Author：likon
 * Create Date：2016/9/23
 * Modified By：likon
 * Why & What is modified  添加用户端BDD测试方式的功能描述框架
 * <文件描述>：测试客户端中终端类型为用户的功能，包括：登陆、扫描订单、查看订单信息、支付订单、通知
 */
import React from 'react'
import {expect} from 'chai'
import {mount} from 'enzyme';
import {createStore} from 'redux'
import {Provider} from "react-redux"
import {MockServer, MockHistory} from "../mock"
import Payment from "../../src/Payment"
import {msgHandler} from "../../src/handler"
import reducer from "../../src/reducers"
import DevTools from "../../src/containers/DevTools"
import App from "../../src/containers/App"
import Login from "../../src/containers/Login"

describe('支付系统分两块，包括客户端和服务端', ()=> {
    describe('客户端环境：不确定，可能是PC端的Windows系统、嵌入式系统也可能是手机', ()=> {
        describe('测试客户端登陆：它分为两种类型包括商户端和用户端', ()=> {
            let server = null
            let store = null
            let history = null
            let subject = null
            before(() => {
                server = new MockServer()
                store = createStore(reducer, DevTools.instrument())
                history = new MockHistory()
                Payment.setMsgHandler(msgHandler(store, history))
                subject = mount(<Provider store={store}><App><Login/></App></Provider>, {
                    context: {
                        history: history
                    },
                    childContextTypes: {
                        history: React.PropTypes.object
                    }
                })
            })
            it('测试用户登陆成功', ()=> {
                subject.find("input").first().simulate("change", {target: {value: "1"}})
                subject.find("input").at(2).simulate("change")
                subject.find("form").simulate("submit")
                expect(store.getState().user.userId).to.equal("1")
                expect(store.getState().user.userType).to.equal("USER")
                expect(history.routes[history.routes.length - 1]).to.equal("/orderId")
            });
            it('测试商户端登陆失败', ()=> {
                expect(subject.find("button").first().props().disabled).to.equal(false)
            });
        });
        describe('测试扫描订单', ()=> {
            describe('单个用户登陆时，用户在扫描订单页面的情况', ()=> {
                describe('点击“待支付”按钮：未支付完成的订单。已完成的订单状态包括：订单支付成功、订单支付失败、取消订单。未支付完成：非已完成订单', ()=> {
                    it('当用户没有未完成支付的订单时，结果不会显示“待支付”按钮', ()=> {

                    })
                    describe('当用户存在至少一个未完成支付的订单时，结果会显示带有待支付订单的个数“待支付”按钮', ()=> {
                        it('用户点击“待支付”按钮，页面跳转进入“订单页面”', ()=> {

                        })
                    })
                })
                describe('在文本框内录入订单号操作，用户点击“加入”按钮：匹配商户端创建的订单操作', ()=> {
                    it('当加入的订单号是商户端创建但未完成的订单时，页面会跳转到当前订单的“订单页面”', ()=> {

                    })
                    it('当加入的订单号是商户已完成的订单或者不存在的订单时，页面会跳到已经匹配完成的“订单页面”', ()=> {

                    })
                })
            })
            describe('同一用户多处登陆时，用户在扫描订单页面的情况', ()=> {
                describe('前提：商户生成多个订单，用户1和用户2是同一用户，且同时登陆的情况', ()=> {
                    it('用户1在扫描订单页面，加入成功1个订单。用户2在扫描订单页面，结果会出现“1个待支付”按钮', ()=> {

                    })
                    it('用户1在扫描订单页面，加入成功1个订单。用户2在订单页面，结果出现用户1加入成功的订单', ()=> {

                    })
                })
            })
            describe('不同用户登陆，匹配同一订单的情况', ()=> {
                describe('前提：商户生成1个订单，用户1和用户2时不同的两个用户', ()=> {
                    it('用户1在“扫描订单”页面点击“加入”一个订单，页面跳转进入该订单的“支付页面”，用户2也去“加入”该订单，用户2跳转进入该订单的“支付页面”，用户1收到通知：用户 u2 参与支付', ()=> {

                    })
                    it('用户1进入支付页面，用户2在“扫描订单页面”，用户2会收到通知：订单正在支付, 当前用户不能参与支付', ()=> {

                    })
                })
            })
        })
        describe('用户查看订单', ()=> {
            describe('一个用户登陆的情况下', ()=> {
                describe('测试“支付”按钮', ()=> {
                    it('商户在订单页面未操作，用户在订单页面，点击“支付”按钮，用户进入“支付页面”', ()=> {

                    })
                    it('商户在订单页面点击“支付”按钮，进入订单的支付页面。用户在订单页面，点击“支付”按钮，按钮变为灰色的情况', ()=> {

                    })
                })
            })
            describe('多个不同用户同时登陆，操作同一个订单的情况', ()=> {
                describe('测试“支付”按钮，前提：用户1和用户2是不同用户', ()=> {
                    it('用户1在订单页面先点击“支付”按钮，进入订单的支付页面。用户2在订单页面，点击“支付”按钮，按钮变为灰色的情况', ()=> {

                    })
                })
            })

        })
        describe('用户支付订单', ()=> {
            describe('单个用户登陆的情况', ()=> {
                describe('商户和用户都登陆，且用户已匹配该订单', ()=> {
                    describe('选择支付结果下拉菜单，点击“确定”按钮.', ()=> {
                        it('选择支付结果-成功,点击“确定”按钮.结果：页面跳转进"扫描订单页面"，用户收到支付结果通知：支付完成，支付成功', ()=> {

                        });
                        it('选择支付结果-失败,点击“确定”按钮.结果：页面跳转进"扫描订单页面"，用户收到支付结果通知：支付完成，支付失败', ()=> {

                        })

                    });
                    describe('点击“取消支付”按钮操作', ()=> {
                        describe('商户和用户操作同一订单，商户先进入“支付页面”，用户在“订单页面”再点击“支付”按钮变为灰色，商户在支付页面“取消支付”的情况', ()=> {
                            it('操作：商户点击“取消支付”按钮，结果：用户端获得支付授权，从“订单页面”跳转进入“支付页面”', ()=> {

                            })
                        })
                    })
                })
            })
            describe('多个同一用户同时登陆的情况', ()=> {
                describe('商户端生成两个订单，用户1和用户2是同一用户', ()=> {
                    it('用户1在“支付”页面支付成功两个订单，用户2在“订单页面”连续收到两个通知：订单支付成功。', ()=> {

                    })
                })

            })
        })
        describe('用户通知', ()=> {
            describe('商户和用户都登陆的情况，商户在“订单页面”点击“取消”按钮，用户无论在哪个页面都会收到“订单通知”', ()=> {
                describe('用户收到多条通知的情况', ()=> {
                    it('用户在扫描在订单页面，已加入三个订单，商户在“订单页面”连续取消该2个订单，即点击2次“取消”按钮。结果用户端会在“订单页面”切换到第三个订单的页面，并且会收到两个订单取消的通知', ()=> {

                    })
                    it('用户在扫描在订单页面，已加入三个订单，商户在“订单页面”连续取消该3个订单，即点击3次“取消”按钮。结果用户端会跳转到“扫描订单页面”，并且会收到三个订单取消的通知 ', ()=> {

                    })
                })
            })
        })

    });
})

describe('', ()=> {
    it('', ()=> {

    })
})

