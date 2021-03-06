/**
 * 应用入口
 *
 * @author : sunkeysun
 */

import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'

export default class Root extends Component {
    render() {
        const { store, history, App } = this.props

        return (
            <Provider store={ store }>
                <ConnectedRouter history={ history }>
                    <App />
                </ConnectedRouter>
            </Provider>
        )
    }
}
