/**
 * Author：liRenhao
 * Create Date：2016/9/10
 * Modified By：liRenhao
 * Why & What is modified  devTools工具默认隐藏
 * redux-devtools的插件用于开发过程中方便查看store中state的值
 * Modified By：kongli
 * Why & What is modified 添加注释
 */
import React from 'react'
import {createDevTools} from 'redux-devtools'
import DockMonitor from 'redux-devtools-dock-monitor'
import LogMonitor from 'redux-devtools-log-monitor'

/**
 * 输出创建redux调试工具
 * createDevTools:可以检查redux的每一个状态和action
 * <DockMonitor></DockMonitor>：可调整大小的,可移动的react的DevTools监视器
 * defaultIsVisible：DockMonitor的属性，默认调试工具是否显示
 * toggleVisibilityKey：DockMonitor的属性，切换可见性的键
 * changePositionKey：DockMonitor的属性，改变位置的键，使它可停靠在不同的屏幕边缘。
 * <LogMonitor />：日志监控
 */
export default createDevTools(
    <DockMonitor defaultIsVisible={false}
                 toggleVisibilityKey='ctrl-h'
                 changePositionKey='ctrl-q'>
        <LogMonitor />
    </DockMonitor>
)