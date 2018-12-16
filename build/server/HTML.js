'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _props$locals = props.locals,
        locals = _props$locals === undefined ? {} : _props$locals,
        _props$nodeEnv = props.nodeEnv,
        nodeEnv = _props$nodeEnv === undefined ? '' : _props$nodeEnv,
        _props$appHTML = props.appHTML,
        appHTML = _props$appHTML === undefined ? '' : _props$appHTML,
        _props$initialState = props.initialState,
        initialState = _props$initialState === undefined ? {} : _props$initialState,
        _props$appPath = props.appPath,
        appPath = _props$appPath === undefined ? '' : _props$appPath,
        _props$appName = props.appName,
        appName = _props$appName === undefined ? '' : _props$appName,
        _props$commonPath = props.commonPath,
        commonPath = _props$commonPath === undefined ? '' : _props$commonPath,
        _props$vendorPath = props.vendorPath,
        vendorPath = _props$vendorPath === undefined ? '' : _props$vendorPath,
        _props$ssr = props.ssr,
        ssr = _props$ssr === undefined ? false : _props$ssr,
        _props$publicHost = props.publicHost,
        publicHost = _props$publicHost === undefined ? '' : _props$publicHost,
        _props$rootDomId = props.rootDomId,
        rootDomId = _props$rootDomId === undefined ? '' : _props$rootDomId,
        _props$constants = props.constants,
        constants = _props$constants === undefined ? {} : _props$constants,
        _props$ignoreAssetHas = props.ignoreAssetHash,
        ignoreAssetHash = _props$ignoreAssetHas === undefined ? false : _props$ignoreAssetHas;

    var _require = require(vendorPath + '/addon'),
        _require$jsList = _require.jsList,
        vendorJsList = _require$jsList === undefined ? [] : _require$jsList,
        _require$cssList = _require.cssList,
        vendorCssList = _require$cssList === undefined ? [] : _require$cssList;

    var _require2 = require(commonPath + '/addon'),
        _require2$jsList = _require2.jsList,
        commonJsList = _require2$jsList === undefined ? [] : _require2$jsList,
        _require2$cssList = _require2.cssList,
        commonCssList = _require2$cssList === undefined ? [] : _require2$cssList;

    var _require3 = require(appPath + '/' + appName + '/addon'),
        _require3$jsList = _require3.jsList,
        appJsList = _require3$jsList === undefined ? [] : _require3$jsList,
        _require3$cssList = _require3.cssList,
        appCssList = _require3$cssList === undefined ? [] : _require3$cssList;

    var realJsList = vendorJsList.concat(commonJsList).concat(appJsList);
    var realCssList = vendorCssList.concat(commonCssList).concat(appCssList);

    var localJsList = _.get(locals, 'JS_LIST', []);
    var localCssList = _.get(locals, 'CSS_LIST', []);

    if (localJsList.length) {
        realJsList = localJsList;
    }

    if (localCssList.length) {
        realCssList = localCssList;
    }

    if (!ignoreAssetHash) {
        realJsList = _.map(realJsList, function (js) {
            return js.replace(/(.*)\.\w{10,}\.js$/, '$1.js');
        });
        realCssList = _.map(realCssList, function (css) {
            return css.replace(/(.*)\.\w{10,}\.css$/, '$1.css');
        });
    }

    var initialStateJson = JSON.stringify(initialState);
    var contantsJson = JSON.stringify(locals.CONSTANTS);

    return _react2.default.createElement(
        'html',
        null,
        _react2.default.createElement(
            'head',
            null,
            _react2.default.createElement('meta', { httpEquiv: 'keywords', content: locals.PAGE_KEYWORDS }),
            _react2.default.createElement('meta', { httpEquiv: 'description', content: locals.PAGE_DESCRIPTION }),
            _react2.default.createElement('meta', { httpEquiv: 'Content-Type', content: 'text/html; charset=UTF-8' }),
            _react2.default.createElement('meta', { httpEquiv: 'X-UA-Compatible', content: 'IE=edge,chrome=1' }),
            _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1' }),
            _react2.default.createElement(
                'title',
                null,
                locals.PAGE_TITLE
            ),
            _.map(realCssList, function (css, index) {
                return _react2.default.createElement('link', { key: index, href: _getAssetLink({ link: css, publicHost: publicHost }), rel: 'stylesheet', media: 'screen' });
            }),
            _react2.default.createElement('script', { dangerouslySetInnerHTML: {
                    __html: '\n                        window.__SSR__ = ' + ssr + '\n                        window.__INITIAL_STATE__ = ' + initialStateJson + '\n                        window.__NODE_ENV__ = \'' + nodeEnv + '\'\n                        window.__APP_NAME__ = \'' + appName + '\'\n                        window.__ROOT_DOM_ID__ = \'' + rootDomId + '\'\n                        window.__CONSTANTS__ = ' + contantsJson + '\n                    '
                } })
        ),
        _react2.default.createElement(
            'body',
            null,
            _react2.default.createElement('div', { id: rootDomId, dangerouslySetInnerHTML: {
                    __html: appHTML
                } }),
            _.map(realJsList, function (js, index) {
                return _react2.default.createElement('script', { key: index, type: 'text/javascript', src: _getAssetLink({ link: js, publicHost: publicHost }) });
            })
        )
    );
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getAssetLink() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { publicHost: '' },
        link = _ref.link,
        publicHost = _ref.publicHost;

    return (/^(https?:)|(\/\/)/.test(link) ? link : '' + publicHost + link
    );
} /**
   * 通用页面框架
   *
   * @author : sunkeysun
   */