/**
 * server 端渲染器
 *
 * @author: sunkeysun
 */
import URL from 'url'

import DefaultHTML from './HTML'
import Root from './Root'

export function render({ appName, href, viewConfig, initialState={}, locals={} }) {
    const { content, state } = render({ appName, href, viewConfig, initialState, locals })

    const props = {
        ssr: viewConfig.ssr,
        locals: locals,
        initialState: state,
        appContent: content,
        nodeEnv: process.env.NODE_ENV,
        appName: appName,
        appPath: `${viewConfig.appPath}/${appName}`,
        commonPath: `${viewConfig.commonPath}`,
        vendorPath: `${viewConfig.vendorPath}`,
        publicHost: viewConfig.publicHost,
        rootDomId: _.get(viewConfig, 'rootDomId', '__APP__'),
        ignoreAssetHash: viewConfig.ignoreAssetHash,
    }

    let TargetHTML = viewConfig.HTML

    if (!TargetHTML) {
        TargetHTML = DefaultHTML
    }

    let htmlContent = renderToStaticMarkup(<TargetHTML { ...props } />)

    htmlContent = `<!DOCTYPE html>${htmlContent}`

    return htmlContent
}

export function renderApp({ appName, href, viewConfig, initialState={}, locals={} }) {
    let appContent = ''
    let appState = initialState

    const App = require(`${viewConfig.appPath}/${appName}/App`).default
    const reducers = require(`${appPath}/redux`).default

    const urlObj = URL.parse(href)

    const routing = {
        location: urlObj,
    }

    const rootReducer = combineReducers({
        ...reducers,
        constants: (state=locals.CONSTANTS) => state,
        routing: (state=routing) => state,
    })

    const store = createStore(rootReducer, initialState)

    const rootState = {
        App: App,
        store: store,
        context: {},
        location: this._ctx.request.path,
    }

    appState = store.getState()

    if (viewConfig.ssr) {
        appContent = renderToString(<Root { ...rootState } />)
    } else {
        console.warn('ssr is not open, render just return empty string content.')
    }

    return {
        content: appContent,
        state: appState,
    }
}