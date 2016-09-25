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
        this.server.on("message", (data) => {
            this.clientDate = JSON.parse(data)
        })
    }

    send(msg) {
        this.server.send(JSON.stringify(msg))
    }

    close() {
        this.server.close()
    }
}

export class MockRouter {
    push(path) {
        this.route = path
    }
}