/**
 * web 端视图引擎
 *
 * @author: sunkeysun
 */

import React from 'react'
import ReactDom from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import createHistory from 'history/createBrowserHistory'
import Root from './Root'

export default class Engine {
    _appEntryTpl = `
        import Kernel from 'inventor/web'
        import ViewEngine from 'inventor-view-react-redux/web'
        import App from '<-appPath->/App'
        import reducers from '<-appPath->/redux'
        import appConfig from '<-webPath->/config/app'

        const kernel = new Kernel({ appConfig })
        const engine = new ViewEngine()
        kernel.run(() => {
            engine.render({ App, reducers })
        })
    `

    render({ App, reducers }) {
        const initialState = window.__INITIAL_STATE__
        const ssr = window.__SSR__
        const appName = window.__APP_NAME__
        const rootDomId = window.__ROOT_DOM_ID__
        const constants = window.__CONSTANTS__

        const history = createHistory()

        const rootReducer = combineReducers({
            ...reducers,
            constants: (state=constants) => state,
            routing: connectRouter(history),
        })

        const store = createStore(rootReducer, initialState)

        let render = ReactDom.render
        if (ssr) {
            render = ReactDom.hydrate
        }

        const rootState = { store, App, history }

        render(
            <Root { ...rootState } />,
            document.getElementById(rootDomId)
        )
    }

    getEntryTpl({ appPath, webPath }) {
        const tplContent = this._appEntryTpl.replace(/<-appPath->/g, appPath)
                                            .replace(/<-webPath->/g, webPath)
        return tplContent
    }
}