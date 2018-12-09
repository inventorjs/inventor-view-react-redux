/**
 * 应用入口
 *
 * @author : sunkeysun
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

export default (props={}) => {
    const { context={}, store, location, App } = props

    return (
        <Provider store={ store }>
            <StaticRouter location={ location } context={ context }>
                <App />
            </StaticRouter>
        </Provider>
    )
}
