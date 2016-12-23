'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.menu = {
        //创建菜单
        create: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(menu) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.post('/cgi-bin/menu/create?access_token=ACCESS_TOKEN', menu));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function create(_x) {return _ref.apply(this, arguments);}return create;}(),

        //查询菜单
        get: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:return _context2.abrupt('return',
                                _self.get('/cgi-bin/menu/get?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context2.stop();}}}, _callee2, this);}));function get() {return _ref2.apply(this, arguments);}return get;}(),

        //删除菜单
        delete: function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt('return',
                                _self.get('/cgi-bin/menu/delete?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context3.stop();}}}, _callee3, this);}));function _delete() {return _ref3.apply(this, arguments);}return _delete;}() };


};