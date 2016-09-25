/**
 * Author：liRenhao
 * Create Date：2016/9/24
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import {Server} from 'mock-socket'

export class MockServer {
    constructor() {
        this.server = new Server(process.env.wsUrl)
    }

    getClientDate() {
        return this.clientDate
    }

    sendOrder(order) {
        this.server.send(JSON.stringify(order))
    }

    sendMarketing(marketing) {
        this.server.send(JSON.stringify(marketing))
    }

    sendPayAuth() {
        this.server.send(JSON.stringify(order))
    }

    sendPayCompleted(order) {
        this.server.send(JSON.stringify(order))
    }

    sendFail() {
        this.server.send(JSON.stringify(order))
    }

    sendMessage() {
        this.server.send(JSON.stringify(order))
    }
}

export class MockHistory {
    constructor() {
        this.routes = []
    }

    push(path) {
        this.routes.push(path)
    }

}