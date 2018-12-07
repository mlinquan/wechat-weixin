'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
module.exports = function () {
    var _self = this;
    this.ticket = {
        getticket: function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(type, refresh) {var token;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                                type = type || 'jsapi';_context.t1 =

                                !refresh && _self.jsapi_ticket[type] && _self.jsapi_ticket[type].expires_on > _self.timestamp() && _self.jsapi_ticket[type];if (_context.t1) {_context.next = 9;break;}_context.t2 =
                                !refresh;if (!_context.t2) {_context.next = 8;break;}_context.next = 7;return _self.cache.get('jsapi_ticket_' + type);case 7:_context.t2 = _context.sent;case 8:_context.t1 = _context.t2;case 9:_context.t0 = _context.t1;if (_context.t0) {_context.next = 14;break;}_context.next = 13;return (
                                    _self.get('/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=' + type));case 13:_context.t0 = _context.sent;case 14:token = _context.t0;

                                if (token.ticket) {
                                    if (token.expires_in) {
                                        token.expires_in = 0;
                                        token.expires_on = _self.timestamp(7140);
                                        _self.cache.set('jsapi_ticket_' + type, token);
                                    }
                                    _self.jsapi_ticket[type] = token;
                                }return _context.abrupt('return',
                                token);case 17:case 'end':return _context.stop();}}}, _callee, this);}));function getticket(_x, _x2) {return _ref.apply(this, arguments);}return getticket;}() };


};