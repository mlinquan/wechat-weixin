'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.menu = {
        //创建菜单
        create: function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(menu) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.post('/cgi-bin/menu/create?access_token=ACCESS_TOKEN', menu));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function create(_x) {return _ref.apply(this, arguments);}return create;}(),

        //查询菜单
        get: function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:return _context2.abrupt('return',
                                _self.get('/cgi-bin/menu/get?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context2.stop();}}}, _callee2, this);}));function get() {return _ref2.apply(this, arguments);}return get;}(),

        //删除菜单(此接口会删除默认菜单及全部个性化菜单,慎用)
        delete: function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt('return',
                                _self.get('/cgi-bin/menu/delete?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context3.stop();}}}, _callee3, this);}));function _delete() {return _ref3.apply(this, arguments);}return _delete;}(),

        //创建个性化菜单
        addconditional: function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(menu) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:return _context4.abrupt('return',
                                _self.post('/cgi-bin/menu/addconditional?access_token=ACCESS_TOKEN', menu));case 1:case 'end':return _context4.stop();}}}, _callee4, this);}));function addconditional(_x2) {return _ref4.apply(this, arguments);}return addconditional;}(),

        //删除个性化菜单
        delconditional: function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(menuid) {return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:return _context5.abrupt('return',
                                _self.post('/cgi-bin/menu/delconditional?access_token=ACCESS_TOKEN', { menuid: menuid }));case 1:case 'end':return _context5.stop();}}}, _callee5, this);}));function delconditional(_x3) {return _ref5.apply(this, arguments);}return delconditional;}(),

        //测试个性化菜单匹配结果
        trymatch: function () {var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(search) {return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:return _context6.abrupt('return',
                                _self.post('/cgi-bin/menu/trymatch?access_token=ACCESS_TOKEN', search));case 1:case 'end':return _context6.stop();}}}, _callee6, this);}));function trymatch(_x4) {return _ref6.apply(this, arguments);}return trymatch;}()


        //获取自定义菜单配置
    };this.get_current_selfmenu_info = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:return _context7.abrupt('return',
                        _self.get('/cgi-bin/get_current_selfmenu_info?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context7.stop();}}}, _callee7, this);}));

};