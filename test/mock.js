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

    send(msg) {
        this.server.send(JSON.stringify(msg))
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