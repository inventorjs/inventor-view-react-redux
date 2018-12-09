/**
 * web 渲染器
 *
 * @author: sunkeysun
 */
import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import Root from './Root'

export function render({ App, reducers }) {
    const initialState = window.__INITIAL_STATE__
    const ssr = window.__SSR__
    const appName = window.__APP_NAME__
    const rootDomId = window.__ROOT_DOM_ID__
    const constants = window.__CONSTANTS__

    const history = createHistory()

    const rootReducer = combineReducers({
        ...reducers,
        constants: (state=constants) => state,
        routing: routerReducer,
    })

    const store = createStore(rootReducer, initialState)

    let render = ReactDom.render
    if (!!ssr) {
        render = ReactDom.hydrate
    }

    const rootState = { store, App, history }

    render(
        <Root { ...rootState } />,
        document.getElementById(rootDomId)
    )
}

export function getAppEntry({ appPath, webPath }) {
    let tplContent = fs.readFileSync(path.resolve(__dirname, 'entry.tpl'), 'utf-8')

    this._checkCreateDir(path.dirname(entryPath))

    tplContent = tplContent.replace(/<-appPath->/g, appPath)
                           .replace(/<-webPath->/g, webPath)
    return tplContent
}