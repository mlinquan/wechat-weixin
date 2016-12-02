'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.sns = {
        oauth2: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(code) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.get('/sns/oauth2/access_token?appid=APPID&secret=APPSECRET&code=' + code + '&grant_type=authorization_code'));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function oauth2(_x) {return _ref.apply(this, arguments);}return oauth2;}(),

        userinfo: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(openid, access_token) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:return _context2.abrupt('return',
                                _self.get('/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN'));case 1:case 'end':return _context2.stop();}}}, _callee2, this);}));function userinfo(_x2, _x3) {return _ref2.apply(this, arguments);}return userinfo;}() };


};