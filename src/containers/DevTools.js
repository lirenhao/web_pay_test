/**
 * Author：liRenhao
 * Create Date：2016/9/10
 * Modified By：liRenhao
 * Why & What is modified  <修改原因描述>
 * redux-devtools的插件用于开发过程中方便查看store中state的值
 */
import React from 'react'
import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

export default createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <LogMonitor />
    </DockMonitor>
)