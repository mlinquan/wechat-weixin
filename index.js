'use strict';var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _assign = require('babel-runtime/core-js/object/assign');var _assign2 = _interopRequireDefault(_assign);var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var axios = require('axios');
var crypto = require('crypto');

var cacheManager = require('cache-manager');

var fsStore = require('cache-manager-fs');

var redisStore = require('cache-manager-redis-store');

var errors = require('./lib/errors.js');
var api_limit = require('./lib/api_limit.js');

var libs = require('./lib');

var wechatapi = function wechatapi(options) {

    var memoryCache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 7140,
        promiseDependency: _promise2.default });


    var diskCache = cacheManager.caching({
        store: fsStore,
        options: {
            ttl: 7140,
            maxsize: 1000 * 1000 * 1000,
            path: 'cache',
            preventfill: true },

        promiseDependency: _promise2.default });


    var redisConfig = (0, _assign2.default)({}, {
        store: redisStore,
        ttl: 7140 },
    options.redis);

    var redisCache = options.redis && cacheManager.caching(redisConfig);

    this.options = (0, _assign2.default)({
        pathname: 'wechatapi' },
    options);
    this.token = this.options.token;
    this.appid = this.options.appid;
    this.appsecret = this.options.appsecret;
    this.encodingAESKey = this.options.encodingAESKey;

    this.access_token = {
        "access_token": null,
        "expires_on": 0 };


    this.jsapi_ticket = {};

    this.cache = {
        get: function () {var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(key) {var redis, mem, disk;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.t0 =
                                redisCache;if (!_context.t0) {_context.next = 5;break;}_context.next = 4;return redisCache.get(key);case 4:_context.t0 = _context.sent;case 5:redis = _context.t0;if (!
                                redis) {_context.next = 8;break;}return _context.abrupt('return',
                                redis);case 8:_context.next = 10;return (

                                    memoryCache.get(key));case 10:mem = _context.sent;if (!
                                mem) {_context.next = 13;break;}return _context.abrupt('return',
                                mem);case 13:_context.next = 15;return (

                                    diskCache.get(key));case 15:disk = _context.sent;if (!
                                disk) {_context.next = 18;break;}return _context.abrupt('return',
                                disk);case 18:return _context.abrupt('return',

                                null);case 19:case 'end':return _context.stop();}}}, _callee, this);}));function get(_x) {return _ref.apply(this, arguments);}return get;}(),

        set: function () {var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(key, val) {var redis, mem, disk;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.t0 =
                                redisCache;if (!_context2.t0) {_context2.next = 5;break;}_context2.next = 4;return redisCache.set(key, val);case 4:_context2.t0 = _context2.sent;case 5:redis = _context2.t0;if (!
                                redis) {_context2.next = 8;break;}return _context2.abrupt('return');case 8:_context2.next = 10;return (


                                    memoryCache.set(key, val));case 10:mem = _context2.sent;if (!
                                mem) {_context2.next = 13;break;}return _context2.abrupt('return');case 13:_context2.next = 15;return (


                                    diskCache.set(key, val));case 15:disk = _context2.sent;case 16:case 'end':return _context2.stop();}}}, _callee2, this);}));function set(_x2, _x3) {return _ref2.apply(this, arguments);}return set;}() };



    this.api_limit = api_limit;
    for (var name in libs) {
        this[name]();
    }
};

wechatapi.prototype = {

    timestamp: function timestamp(delay) {
        delay = Number(delay) || 0;
        return new Date().getTime() + delay * 1000;
    },

    aesEncrypt: function aesEncrypt(data, secretKey, iv, mode) {
        secretKey = secretKey || this.options.encodingAESKey;
        mode = mode || 'aes-128-cbc';
        iv = iv || this.options.iv;
        secretKey = Buffer.from(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = Buffer.from(secretKey, "hex");
        var cipher = crypto.createCipheriv(mode, secretKey, iv),
        coder = [];
        coder.push(cipher.update(data, "utf8", "hex"));
        coder.push(cipher.final("hex"));
        return coder.join("");
    },

    aesDecrypt: function aesDecrypt(data, secretKey, iv, mode) {
        secretKey = secretKey || this.options.encodingAESKey;
        mode = mode || 'aes-128-cbc';
        iv = iv || this.options.iv;
        secretKey = Buffer.from(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = Buffer.from(secretKey, "hex");
        var cipher = crypto.createDecipheriv(mode, secretKey, iv),
        coder = [];
        coder.push(cipher.update(data, "hex", "utf8"));
        coder.push(cipher.final("utf8"));
        return coder.join("");
    },

    handleError: function handleError(errcode, onlymsg) {
        var errorConfig = (0, _assign2.default)({
            "key": "errcode",
            "msg": "errmsg" },
        this.options.error);
        var result = {};
        result[errorConfig.key] = errors[errcode] && errcode || 0;
        result[errorConfig.msg] = errors[errcode] || "";
        if (onlymsg) {
            return result[errorConfig.msg];
        }
        return result;
    },

    /**
        * get request
        * @return {Promise} []
        */
    get: function () {var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(path, content) {var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'get';var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var _self, opt, api_name, token, data;return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
                            _self = this;
                            path = path.replace('APPID', _self.appid).replace('APPSECRET', _self.appsecret);
                            content = content || {};
                            opt = {
                                url: 'https://api.weixin.qq.com' + path,
                                method: method };

                            if (method === 'post') {
                                opt.data = content;
                            } else {
                                opt.params = content;
                            }
                            api_name = path.replace('/cgi-bin/', '').replace(/\?.*/, '').split('/').join('_');
                            if (api_name == 'user_info_batchget') {
                                api_name = 'user_info';
                            }if (!
                            /ACCESS_TOKEN/.test(opt.url)) {_context3.next = 16;break;}_context3.next = 10;return (
                                _self.accessToken(refresh));case 10:token = _context3.sent;if (!
                            token.access_token) {_context3.next = 15;break;}
                            opt.url = opt.url.replace('ACCESS_TOKEN', token.access_token);_context3.next = 16;break;case 15:return _context3.abrupt('return',

                            token);case 16:_context3.next = 18;return (


                                axios(opt));case 18:data = _context3.sent;
                            data && data.data && (data = data.data);
                            // let today = moment().format('YYYY-MM-DD');
                            // if(api_limit[api_name]) {
                            //     let now_time = moment().format('YYYY-MM-DD HH:mm:ss.SSS');
                            //     _self.model.api_log.add({"used_time": now_time, "api_name": api_name})
                            //     .then(function(api_log_id) {

                            //     }, function(error) {

                            //     });
                            // }
                            // if(api_name == "message_template_send") {
                            //     var message_info = _self.jsonpf(content);
                            //     message_info.data = JSON.stringify(content.data);
                            //     message_info.MsgID = data.msgid;
                            //     if(data && data.errcode == 43004 && message_info) {
                            //         message_info.Status = _self.handleError(data.errcode, true);
                            //     }
                            //     _self.model.push_log.add(message_info)
                            //     .then(function(push_log_id) {

                            //     }, function(error) {

                            //     });
                            // }
                            if (!(
                            data && data.errcode == 40001)) {_context3.next = 22;break;}return _context3.abrupt('return',
                            _self.get(path, content, method, true));case 22:if (!(


                            data && data.errcode)) {_context3.next = 25;break;}
                            console.log(data);return _context3.abrupt('return',
                            _self.handleError(data.errcode));case 25:return _context3.abrupt('return',

















                            data);case 26:case 'end':return _context3.stop();}}}, _callee3, this);}));function get(_x4, _x5) {return _ref3.apply(this, arguments);}return get;}(),


    /**
                                                                                                                                                                                    * post request
                                                                                                                                                                                    * @return {Promise} []
                                                                                                                                                                                    */
    post: function () {var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(path, content) {return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:return _context4.abrupt('return',
                            this.get(path, content, 'post'));case 1:case 'end':return _context4.stop();}}}, _callee4, this);}));function post(_x8, _x9) {return _ref4.apply(this, arguments);}return post;}(),


    /**
                                                                                                                                                                                                                * get access_token
                                                                                                                                                                                                                * @return {String} []
                                                                                                                                                                                                                */
    accessToken: function () {var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(refresh) {var token;return _regenerator2.default.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.t1 =

                            !refresh && this.access_token.expires_on > this.timestamp() && this.access_token;if (_context5.t1) {_context5.next = 8;break;}_context5.t2 =
                            !refresh;if (!_context5.t2) {_context5.next = 7;break;}_context5.next = 6;return this.cache.get('access_token');case 6:_context5.t2 = _context5.sent;case 7:_context5.t1 = _context5.t2;case 8:_context5.t0 = _context5.t1;if (_context5.t0) {_context5.next = 13;break;}_context5.next = 12;return (
                                this.get('/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'));case 12:_context5.t0 = _context5.sent;case 13:token = _context5.t0;if (!
                            token.access_token) {_context5.next = 19;break;}
                            if (token.expires_in) {
                                token.expires_in = 0;
                                token.expires_on = this.timestamp(7140);
                            }
                            this.access_token = token;_context5.next = 19;return (
                                this.cache.set('access_token', token));case 19:return _context5.abrupt('return',

                            token);case 20:case 'end':return _context5.stop();}}}, _callee5, this);}));function accessToken(_x10) {return _ref5.apply(this, arguments);}return accessToken;}() };



for (var name in libs) {
    wechatapi.prototype[name] = libs[name];
}

module.exports = wechatapi;