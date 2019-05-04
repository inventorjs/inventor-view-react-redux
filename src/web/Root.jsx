/**
 * 应用入口
 *
 * @author : sunkeysun
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

export default class Root extends Component {
    render() {
        const { store, App } = this.props

        return (
            <Provider store={ store }>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </Provider>
        )
    }
}
