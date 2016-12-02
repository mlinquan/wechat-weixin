'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

module.exports = function () {
    var _self = this;
    this.message = {
        /*
                     发送模板消息
                     {
                         "touser": "OPENID",
                         "template_id": "ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY",
                         "url": "http://weixin.qq.com/download",
                         "topcolor": "#FF0000",
                         "data": {
                             "User": {
                                 "value": "黄先生",
                                 "color": "#173177"
                             }
                         }
                     }*/
        template_send: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(data) {return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:return _context.abrupt('return',
                                _self.post('/cgi-bin/message/template/send?access_token=ACCESS_TOKEN', data));case 1:case 'end':return _context.stop();}}}, _callee, this);}));function template_send(_x) {return _ref.apply(this, arguments);}return template_send;}(),

        push_all: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(data) {var user_list, i, to_data, send_to;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
                                    _self.user.get_all());case 2:user_list = _context2.sent;
                                user_list = user_list.data.openid;
                                i = 0;case 5:if (!(i < user_list.length)) {_context2.next = 15;break;}
                                to_data = data;
                                to_data.touser = user_list[i];_context2.next = 10;return (
                                    this.template_send(to_data));case 10:send_to = _context2.sent;
                                console.log(send_to);case 12:i++;_context2.next = 5;break;case 15:return _context2.abrupt('return',

                                true);case 16:case 'end':return _context2.stop();}}}, _callee2, this);}));function push_all(_x2) {return _ref2.apply(this, arguments);}return push_all;}()

        // push_all: async function(data) {
        //     let user_list = await _self.user.get_all();
        //     user_list = user_list.data.openid;
        //     let message = this;
        //     return new Promise(function(resolve, reject) {
        //         let total = user_list.length;
        //         var count = 0;
        //         var push_one = async function() {
        //             let to_data = data;
        //             to_data.touser = user_list[count];
        //             count++;
        //             if(count < total - 1) {
        //                 push_one();
        //             }
        //             let to_user = await message.template_send(to_data);
        //             if(count == (total - 1)) {
        //                 resolve(true);
        //             }
        //         };
        //         push_one();
        //     });
        // }
    };
};