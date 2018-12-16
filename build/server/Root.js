'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Root = function (_Component) {
    (0, _inherits3.default)(Root, _Component);

    function Root() {
        (0, _classCallCheck3.default)(this, Root);
        return (0, _possibleConstructorReturn3.default)(this, (Root.__proto__ || Object.getPrototypeOf(Root)).apply(this, arguments));
    }

    (0, _createClass3.default)(Root, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$context = _props.context,
                context = _props$context === undefined ? {} : _props$context,
                store = _props.store,
                location = _props.location,
                App = _props.App;


            return _react2.default.createElement(
                _reactRedux.Provider,
                { store: store },
                _react2.default.createElement(
                    _reactRouterDom.StaticRouter,
                    { location: location, context: context },
                    _react2.default.createElement(App, null)
                )
            );
        }
    }]);
    return Root;
}(_react.Component); /**
                      * 应用入口
                      *
                      * @author : sunkeysun
                      */

exports.default = Root;