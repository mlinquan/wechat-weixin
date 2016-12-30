'use strict';var _stringify = require('babel-runtime/core-js/json/stringify');var _stringify2 = _interopRequireDefault(_stringify);var _regenerator = require('babel-runtime/regenerator');var _regenerator2 = _interopRequireDefault(_regenerator);var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);var _promise = require('babel-runtime/core-js/promise');var _promise2 = _interopRequireDefault(_promise);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var rp = require('request-promise');
var objectAssign = require('object-assign');
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');

var cacheManager = require('cache-manager');

var fsStore = require('cache-manager-fs');

var redisStore = require('cache-manager-redis');

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


    var redisConfig = objectAssign({}, {
        store: redisStore,
        ttl: 7140 },
    options.redis);

    var redisCache = options.redis && cacheManager.caching(redisConfig);

    this.options = objectAssign({
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
        get: function () {var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(key) {var redis, mem, disk;return _regenerator2.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.t0 =
                                redisCache;if (!_context.t0) {_context.next = 5;break;}_context.next = 4;return redisCache.get(key);case 4:_context.t0 = _context.sent;case 5:redis = _context.t0;_context.next = 8;return (
                                    memoryCache.get(key));case 8:mem = _context.sent;_context.next = 11;return (
                                    diskCache.get(key));case 11:disk = _context.sent;return _context.abrupt('return',
                                redis || mem || disk);case 13:case 'end':return _context.stop();}}}, _callee, this);}));function get(_x) {return _ref.apply(this, arguments);}return get;}(),

        set: function set(key, val) {
            redisCache && redisCache.set(key);
            memoryCache.set(key, val);
            diskCache.set(key, val);
        } };


    this.api_limit = api_limit;
    for (var name in libs) {
        this[name]();
    }
};

wechatapi.prototype = {
    jsonpf: function jsonpf(json) {
        return JSON.parse((0, _stringify2.default)(json));
    },

    timestamp: function timestamp(delay) {
        delay = Number(delay) || 0;
        return new Date().getTime() + delay * 1000;
    },

    aesEncrypt: function aesEncrypt(data, secretKey, iv, mode) {
        secretKey = secretKey || this.options.AESKey;
        mode = mode || 'aes-128-cbc';
        iv = iv || this.options.iv;
        secretKey = new Buffer(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = new Buffer(secretKey, "hex");
        var cipher = crypto.createCipheriv(mode, secretKey, iv),coder = [];
        coder.push(cipher.update(data, "utf8", "hex"));
        coder.push(cipher.final("hex"));
        return coder.join("");
    },

    aesDecrypt: function aesDecrypt(data, secretKey, iv, mode) {
        secretKey = secretKey || this.options.AESKey;
        mode = mode || 'aes-128-cbc';
        iv = iv || this.options.iv;
        secretKey = Buffer(secretKey, "utf8");
        secretKey = crypto.createHash("md5").update(secretKey).digest("hex");
        secretKey = new Buffer(secretKey, "hex");
        var cipher = crypto.createDecipheriv(mode, secretKey, iv),coder = [];
        coder.push(cipher.update(data, "hex", "utf8"));
        coder.push(cipher.final("utf8"));
        return coder.join("");
    },

    handleError: function handleError(errcode, onlymsg) {
        var errorConfig = objectAssign({
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
    get: function () {var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(path, content) {var method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';var refresh = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;var _self, options, opt, api_name, token, data;return _regenerator2.default.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
                            _self = this;
                            path = path.replace('APPID', _self.appid).replace('APPSECRET', _self.appsecret);
                            content = content || '';
                            options = {
                                url: 'https://api.weixin.qq.com' + path,
                                method: method,
                                agent: false,
                                rejectUnauthorized: false,
                                body: content,
                                json: true };

                            opt = options;
                            api_name = path.replace('/cgi-bin/', '').replace(/\?.*/, '').split('/').join('_');
                            if (api_name == 'user_info_batchget') {
                                api_name = 'user_info';
                            }if (!
                            /ACCESS_TOKEN/.test(opt.url)) {_context2.next = 16;break;}_context2.next = 10;return (
                                _self.accessToken(refresh));case 10:token = _context2.sent;if (!
                            token.access_token) {_context2.next = 15;break;}
                            opt.url = opt.url.replace('ACCESS_TOKEN', token.access_token);_context2.next = 16;break;case 15:return _context2.abrupt('return',

                            token);case 16:_context2.next = 18;return (


                                rp(opt));case 18:data = _context2.sent;if (!(

























                            data && data.errcode == 40001)) {_context2.next = 21;break;}return _context2.abrupt('return',
                            _self.get(path, content, method, true));case 21:if (!(


                            data && data.errcode)) {_context2.next = 23;break;}return _context2.abrupt('return',
                            _self.handleError(data.errcode));case 23:return _context2.abrupt('return',

















                            data);case 24:case 'end':return _context2.stop();}}}, _callee2, this);}));function get(_x2, _x3, _x4, _x5) {return _ref2.apply(this, arguments);}return get;}(),

    /**
                                                                                                                                                                                              * post request
                                                                                                                                                                                              * @return {Promise} []
                                                                                                                                                                                              */
    post: function () {var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(path, content) {return _regenerator2.default.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:return _context3.abrupt('return',
                            this.get(path, content, 'POST'));case 1:case 'end':return _context3.stop();}}}, _callee3, this);}));function post(_x8, _x9) {return _ref3.apply(this, arguments);}return post;}(),

    /**
                                                                                                                                                                                                                * get access_token
                                                                                                                                                                                                                * @return {String} []
                                                                                                                                                                                                                */
    accessToken: function () {var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(refresh) {var token;return _regenerator2.default.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.t1 =

                            !refresh && this.access_token.expires_on > this.timestamp() && this.access_token;if (_context4.t1) {_context4.next = 8;break;}_context4.t2 =
                            !refresh;if (!_context4.t2) {_context4.next = 7;break;}_context4.next = 6;return this.cache.get('access_token');case 6:_context4.t2 = _context4.sent;case 7:_context4.t1 = _context4.t2;case 8:_context4.t0 = _context4.t1;if (_context4.t0) {_context4.next = 13;break;}_context4.next = 12;return (
                                this.get('/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET'));case 12:_context4.t0 = _context4.sent;case 13:token = _context4.t0;

                            if (token.access_token) {
                                console.log(token.access_token);
                                if (token.expires_in) {
                                    token.expires_in = 0;
                                    token.expires_on = this.timestamp(7140);
                                    this.cache.set('access_token', token);
                                }
                                this.access_token = token;
                            }return _context4.abrupt('return',
                            token);case 16:case 'end':return _context4.stop();}}}, _callee4, this);}));function accessToken(_x10) {return _ref4.apply(this, arguments);}return accessToken;}() };



for (var name in libs) {
    wechatapi.prototype[name] = libs[name];
}

module.exports = wechatapi;