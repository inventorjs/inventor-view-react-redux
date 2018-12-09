/**
 * 应用入口
 *
 * @author : sunkeysun
 */

import Kernel from 'inventor/web'
import viewEngine from 'inventor-view-react-redux/web'
import App from '<-appPath->/App'
import reducers from '<-appPath->/redux'
import appConfig from '<-webPath->/config/app'

const kernel = new Kernel({ appConfig, App, reducers })
kernel.run(() => {
    viewEngine.render({ App, reducers })
})
