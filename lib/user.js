'use strict';var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.user = {
        //设置备注名
        updateremark: function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(openid, remark) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.post('/cgi-bin/user/info/updateremark?access_token=ACCESS_TOKEN', {
                                    "openid": openid,
                                    "remark": remark }));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function updateremark(_x, _x2) {return _ref.apply(this, arguments);}return updateremark;}(),


        //获取用户基本信息（包括UnionID机制）
        info: function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(openid, lang) {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                                lang = lang || 'zh-CN';return _context2.abrupt('return',
                                _self.get('/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=' + openid + '&lang=' + lang));case 2:case 'end':return _context2.stop();}}}, _callee2, this);}));function info(_x3, _x4) {return _ref2.apply(this, arguments);}return info;}(),

        //批量获取用户基本信息 100 pre time
        info_batchget: function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(user_list) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt('return',
                                _self.post('/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN', user_list));case 1:case 'end':return _context3.stop();}}}, _callee3, this);}));function info_batchget(_x5) {return _ref3.apply(this, arguments);}return info_batchget;}(),

        //获取用户列表 10000 pre time
        get: function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(next_openid) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
                                next_openid = next_openid || '';return _context4.abrupt('return',
                                _self.get('/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=' + next_openid));case 2:case 'end':return _context4.stop();}}}, _callee4, this);}));function get(_x6) {return _ref4.apply(this, arguments);}return get;}(),

        get_all: function (_get_all) {function get_all(_x7) {return _get_all.apply(this, arguments);}get_all.toString = function () {return _get_all.toString();};return get_all;}(function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(next_openid) {var user, user_list, all_users;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
                                user = this;_context5.next = 3;return (
                                    this.get(next_openid));case 3:user_list = _context5.sent;
                                if (user.user_list) {
                                    user.user_list.data.openid = user.user_list.data.openid.concat(user_list.data.openid);
                                    user.user_list.count += user_list.count;
                                }
                                if (!user.user_list) {
                                    user.user_list = user_list;
                                }if (!(
                                user.user_list.count < user.user_list.total)) {_context5.next = 8;break;}return _context5.abrupt('return',
                                get_all(user_list.next_openid));case 8:

                                all_users = (0, _assign2.default)({}, user.user_list);
                                delete user.user_list;return _context5.abrupt('return',
                                all_users);case 11:case 'end':return _context5.stop();}}}, _callee5, this);}));return function (_x8) {return _ref5.apply(this, arguments);};}()),

        get_all_info: function () {var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {var user, user_list, openid_list, count, time_get, i, get_openid_list, _user_list, result, all_info;return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
                                user = this;_context6.next = 3;return (
                                    this.get_all());case 3:user_list = _context6.sent;
                                openid_list = user_list.data.openid;
                                count = openid_list.length;
                                time_get = Math.ceil(openid_list.length / 100);
                                user.user_info_list = [];
                                i = 0;case 9:if (!(i < time_get)) {_context6.next = 24;break;}
                                get_openid_list = openid_list.slice(i * 100, 100);
                                _user_list = {
                                    "user_list": get_openid_list.map(function (openid) {
                                        return {
                                            "openid": openid,
                                            "lang": 'zh-CN' };

                                    }) };_context6.next = 14;return (

                                    user.info_batchget(_user_list));case 14:result = _context6.sent;
                                count -= 100;
                                user.user_info_list = user.user_info_list.concat(result.user_info_list);if (!(
                                count <= 0)) {_context6.next = 21;break;}
                                all_info = (0, _assign2.default)({}, user.user_info_list);
                                delete user.user_info_list;return _context6.abrupt('return',
                                all_info);case 21:i++;_context6.next = 9;break;case 24:case 'end':return _context6.stop();}}}, _callee6, this);}));function get_all_info() {return _ref6.apply(this, arguments);}return get_all_info;}() };




};