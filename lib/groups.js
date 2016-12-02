'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.groups = {
        //创建分组
        create: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(name) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.post('/cgi-bin/groups/create?access_token=ACCESS_TOKEN', { "group": { "name": name } }));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function create(_x) {return _ref.apply(this, arguments);}return create;}(),

        //查询所有分组
        get: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:return _context2.abrupt('return',
                                _self.get('/cgi-bin/groups/get?access_token=ACCESS_TOKEN'));case 1:case 'end':return _context2.stop();}}}, _callee2, this);}));function get() {return _ref2.apply(this, arguments);}return get;}(),

        //查询用户所在分组
        getid: function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(openid) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt('return',
                                _self.post('/cgi-bin/groups/getid?access_token=ACCESS_TOKEN', { "openid": openid }));case 1:case 'end':return _context3.stop();}}}, _callee3, this);}));function getid(_x2) {return _ref3.apply(this, arguments);}return getid;}(),

        //修改分组名
        update: function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(id, name) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:return _context4.abrupt('return',
                                _self.post('/cgi-bin/groups/update?access_token=ACCESS_TOKEN', { "group": { "id": id, "name": name } }));case 1:case 'end':return _context4.stop();}}}, _callee4, this);}));function update(_x3, _x4) {return _ref4.apply(this, arguments);}return update;}(),

        //移动用户分组
        members_update: function () {var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(openid, to_groupid) {return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:return _context5.abrupt('return',
                                _self.post('/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN', { "openid": openid, "to_groupid": to_groupid }));case 1:case 'end':return _context5.stop();}}}, _callee5, this);}));function members_update(_x5, _x6) {return _ref5.apply(this, arguments);}return members_update;}(),

        //批量移动用户分组
        members_batchupdate: function () {var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(openid_list, to_groupid) {return _regenerator2.default.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:return _context6.abrupt('return',
                                _self.post('/cgi-bin/groups/members/batchupdate?access_token=ACCESS_TOKEN', { "openid_list": openid_list, "to_groupid": to_groupid }));case 1:case 'end':return _context6.stop();}}}, _callee6, this);}));function members_batchupdate(_x7, _x8) {return _ref6.apply(this, arguments);}return members_batchupdate;}(),

        //删除分组
        delete: function () {var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(id) {return _regenerator2.default.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:return _context7.abrupt('return',
                                _self.post('/cgi-bin/groups/delete?access_token=ACCESS_TOKEN', { "group": { "id": id } }));case 1:case 'end':return _context7.stop();}}}, _callee7, this);}));function _delete(_x9) {return _ref7.apply(this, arguments);}return _delete;}() };


};