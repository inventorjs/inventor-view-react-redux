'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = engine;

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

var _createBrowserHistory = require('history/createBrowserHistory');

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * web 渲染器
 *
 * @author: sunkeysun
 */
var appEntryTpl = '\n    import Kernel from \'inventor/web\'\n    import viewEngine from \'inventor-view-react-redux/web\'\n    import App from \'<-appPath->/App\'\n    import reducers from \'<-appPath->/redux\'\n    import appConfig from \'<-webPath->/config/app\'\n\n    const kernel = new Kernel({ appConfig, App, reducers })\n    kernel.run(() => {\n        viewEngine.render({ App, reducers })\n    })\n';

function engine() {
    return {
        render: function render(_ref) {
            var App = _ref.App,
                reducers = _ref.reducers;

            var initialState = window.__INITIAL_STATE__;
            var ssr = window.__SSR__;
            var appName = window.__APP_NAME__;
            var rootDomId = window.__ROOT_DOM_ID__;
            var _constants = window.__CONSTANTS__;

            var history = (0, _createBrowserHistory2.default)();

            var rootReducer = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
                constants: function constants() {
                    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants;
                    return state;
                },
                routing: _reactRouterRedux.routerReducer
            }));

            var store = (0, _redux.createStore)(rootReducer, initialState);

            var render = ReactDom.render;
            if (ssr) {
                render = ReactDom.hydrate;
            }

            var rootState = { store: store, App: App, history: history };

            render(React.createElement(_Root2.default, rootState), document.getElementById(rootDomId));
        },
        getAppEntry: function getAppEntry(_ref2) {
            var appPath = _ref2.appPath,
                webPath = _ref2.webPath;

            var tplContent = appEntryTpl.replace(/<-appPath->/g, appPath).replace(/<-webPath->/g, webPath);
            return tplContent;
        }
    };
}