/**
 * 通用页面框架
 *
 * @author : sunkeysun
 */

import React from 'react'

function _getAssetLink({ link, publicHost }={ publicHost: '' }) {
    return /^(https?:)|(\/\/)/.test(link) ? link : `${publicHost}${link}`
}

export default function(props={}) {
    const {
        locals={},
        nodeEnv='',
        appHTML='',
        initialState={},
        appPath='',
        appName='',
        commonPath='',
        vendorPath='',
        ssr=false,
        publicHost='',
        rootDomId='',
        constants={},
        ignoreAssetHash=false,
    } = props

    const { jsList: vendorJsList=[], cssList: vendorCssList=[] } = require(`${vendorPath}/addon`)
    const { jsList: commonJsList=[], cssList: commonCssList=[] } = require(`${commonPath}/addon`)
    const { jsList: appJsList=[], cssList: appCssList=[] } = require(`${appPath}/${appName}/addon`)

    let realJsList = vendorJsList.concat(commonJsList).concat(appJsList)
    let realCssList = vendorCssList.concat(commonCssList).concat(appCssList)

    let localJsList = _.get(locals, 'JS_LIST', [])
    let localCssList = _.get(locals, 'CSS_LIST', [])

    if (localJsList.length) {
        realJsList = localJsList
    }

    if (localCssList.length) {
        realCssList = localCssList
    }

    if (ignoreAssetHash) {
        realJsList = _.map(realJsList, (js) => js.replace(/(.*)\.\w{10,}\.js$/, '$1.js'))
        realCssList = _.map(realCssList, (css) => css.replace(/(.*)\.\w{10,}\.css$/, '$1.css'))
    }

    const initialStateJson = JSON.stringify(initialState)
    const contantsJson = JSON.stringify(locals.CONSTANTS)

    return (
        <html>
            <head>
                <meta httpEquiv="keywords" content={ locals.PAGE_KEYWORDS } />
                <meta httpEquiv="description" content={ locals.PAGE_DESCRIPTION } />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
                <title>{ locals.PAGE_TITLE }</title>
                {
                    _.map(realCssList, (css, index) =>
                        <link key={ index } href={ _getAssetLink({ link: css, publicHost }) } rel="stylesheet" media="screen" />
                    )
                }
                <script dangerouslySetInnerHTML={ {
                    __html: `
                        window.__SSR__ = ${ssr}
                        window.__INITIAL_STATE__ = ${initialStateJson}
                        window.__NODE_ENV__ = '${nodeEnv}'
                        window.__APP_NAME__ = '${appName}'
                        window.__ROOT_DOM_ID__ = '${rootDomId}'
                        window.__CONSTANTS__ = ${contantsJson}
                    `
                } }></script>
            </head>
            <body>
            <div id={ rootDomId } dangerouslySetInnerHTML={ {
                __html: appHTML
            } }></div>
            {
                _.map(realJsList, (js, index) =>
                    <script key={ index } type="text/javascript" src={ _getAssetLink({ link: js, publicHost }) }></script>
                )
            }
            </body>
        </html>
    )
}
