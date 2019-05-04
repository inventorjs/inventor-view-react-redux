/**
 * server 端视图引擎
 *
 * @author: sunkeysun
 */

import URL from 'url'
import React from 'react'
import { renderToStaticMarkup, renderToString } from 'react-dom/server'
import { combineReducers, createStore } from 'redux'
import DefaultHTML from './HTML'
import Root from './Root'

export default class Engine {
    _appPath = ''
    _commonPath = ''
    _vendorPath = ''

    constructor({ appPath, commonPath, vendorPath }) {
        this._appPath = appPath
        this._commonPath = commonPath
        this._vendorPath = vendorPath
    }

    render({ appName, href, viewConfig, initialState={}, locals={} }) {
        const { html, state } = this.renderApp({ appName, href, viewConfig, initialState, locals })

        const props = {
            ssr: viewConfig.ssr,
            locals: locals,
            initialState: state,
            appHTML: html,
            nodeEnv: process.env.NODE_ENV,
            appName: appName,
            appPath: this._appPath,
            commonPath: this._commonPath,
            vendorPath: this._vendorPath,
            publicHost: viewConfig.publicHost,
            rootDomId: _.get(viewConfig, 'rootDomId', '__APP__'),
            ignoreAssetHash: viewConfig.ignoreAssetHash,
        }

        let TargetHTML = viewConfig.HTML

        if (!TargetHTML) {
            TargetHTML = DefaultHTML
        }

        let docHTML = renderToStaticMarkup(<TargetHTML { ...props } />)

        docHTML = `<!DOCTYPE html>${docHTML}`

        return docHTML
    }

    renderApp({ appName, href, viewConfig, initialState={}, locals={} }) {
        let html = ''
        let state = initialState

        const App = require(`${viewConfig.appPath}/${appName}/App`).default
        const reducers = require(`${viewConfig.appPath}/${appName}/redux`).default

        const urlObj = URL.parse(href)

        const routing = {
            location: _.toPlainObject(urlObj),
        }

        const constants = _.get(locals, 'CONSTANTS', {})

        const rootReducer = combineReducers({
            ...reducers,
            constants: (state=constants) => state,
        })

        const store = createStore(rootReducer, initialState)

        const rootState = {
            App: App,
            store: store,
            context: {},
            location: urlObj.pathname,
        }

        state = store.getState()

        if (viewConfig.ssr) {
            html = renderToString(<Root { ...rootState } />)
        } else {
            console.warn('ssr is not open, render just return empty string content.')
        }

        return { html, state }
    }
}