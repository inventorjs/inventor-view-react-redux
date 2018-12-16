'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = engine;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _redux = require('redux');

var _HTML = require('./HTML');

var _HTML2 = _interopRequireDefault(_HTML);

var _Root = require('./Root');

var _Root2 = _interopRequireDefault(_Root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * server 端渲染器
 *
 * @author: sunkeysun
 */
function engine(_ref) {
    var appPath = _ref.appPath,
        commonPath = _ref.commonPath,
        vendorPath = _ref.vendorPath;

    return {
        render: function render(_ref2) {
            var appName = _ref2.appName,
                href = _ref2.href,
                viewConfig = _ref2.viewConfig,
                _ref2$initialState = _ref2.initialState,
                initialState = _ref2$initialState === undefined ? {} : _ref2$initialState,
                _ref2$locals = _ref2.locals,
                locals = _ref2$locals === undefined ? {} : _ref2$locals;

            var _renderApp = this.renderApp({ appName: appName, href: href, viewConfig: viewConfig, initialState: initialState, locals: locals }),
                html = _renderApp.html,
                state = _renderApp.state;

            var props = {
                ssr: viewConfig.ssr,
                locals: locals,
                initialState: state,
                appHTML: html,
                nodeEnv: process.env.NODE_ENV,
                appName: appName,
                appPath: appPath,
                commonPath: commonPath,
                vendorPath: vendorPath,
                publicHost: viewConfig.publicHost,
                rootDomId: _.get(viewConfig, 'rootDomId', '__APP__'),
                ignoreAssetHash: viewConfig.ignoreAssetHash
            };

            var TargetHTML = viewConfig.HTML;

            if (!TargetHTML) {
                TargetHTML = _HTML2.default;
            }

            var docHTML = (0, _server.renderToStaticMarkup)(_react2.default.createElement(TargetHTML, props));

            docHTML = '<!DOCTYPE html>' + docHTML;

            return docHTML;
        },
        renderApp: function renderApp(_ref3) {
            var appName = _ref3.appName,
                href = _ref3.href,
                viewConfig = _ref3.viewConfig,
                _ref3$initialState = _ref3.initialState,
                initialState = _ref3$initialState === undefined ? {} : _ref3$initialState,
                _ref3$locals = _ref3.locals,
                locals = _ref3$locals === undefined ? {} : _ref3$locals;

            var html = '';
            var state = initialState;

            var App = require(viewConfig.appPath + '/' + appName + '/App').default;
            var reducers = require(viewConfig.appPath + '/' + appName + '/redux').default;

            var urlObj = _url2.default.parse(href);

            var _routing = {
                location: _.toPlainObject(urlObj)
            };

            var _constants = _.get(locals, 'CONSTANTS', {});

            var rootReducer = (0, _redux.combineReducers)((0, _extends3.default)({}, reducers, {
                constants: function constants() {
                    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _constants;
                    return state;
                },
                routing: function routing() {
                    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _routing;
                    return state;
                }
            }));

            var store = (0, _redux.createStore)(rootReducer, initialState);

            var rootState = {
                App: App,
                store: store,
                context: {},
                location: urlObj.pathname
            };

            state = store.getState();

            if (viewConfig.ssr) {
                html = (0, _server.renderToString)(_react2.default.createElement(_Root2.default, rootState));
            } else {
                console.warn('ssr is not open, render just return empty string content.');
            }

            return { html: html, state: state };
        }
    };
}