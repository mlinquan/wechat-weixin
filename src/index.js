'use strict';

var axios = require('axios');
var crypto = require('crypto');

var cacheManager = require('cache-manager');

var fsStore = require('cache-manager-fs');

var redisStore = require('cache-manager-redis-store');

var errors = require('./lib/errors.js');
var api_limit = require('./lib/api_limit.js');

var libs = require('./lib');

var wechatapi = function(options) {

    var memoryCache = cacheManager.caching({
        store: 'memory',
        max: 100,
        ttl: 7140,
        promiseDependency: Promise
    });

    var diskCache = cacheManager.caching({
        store: fsStore,
        options: {
            ttl: 7140,
            maxsize: 1000 * 1000 * 1000,
            path: 'cache',
            preventfill: true
        },
        promiseDependency: Promise
    });

    var redisConfig = Object.assign({}, {
        store: redisStore,
        ttl: 7140
    }, options.redis);

    var redisCache = options.redis && cacheManager.caching(redisConfig);

    this.options = Object.assign({
        pathname: 'wechatapi'
    }, options);
    this.token = this.options.token;
    this.appid = this.options.appid;
    this.appsecret = this.options.appsecret;
    this.encodingAESKey = this.options.encodingAESKey;

    this.access_token = {
        "access_token": null,
        "expires_on": 0
    };

    this.jsapi_ticket = {};

    this.cache = {
        get: async function(key) {
            let redis = redisCache && await redisCache.get(key);
            if(redis) {
                return redis
            }
            let mem = await memoryCache.get(key);
            if(mem) {
                return mem
            }
            let disk = await diskCache.get(key);
            if(disk) {
                return disk
            }
            return null
        },
        set: async function(key, val) {
            let redis = redisCache && await redisCache.set(key, val);
            if(redis) {
                return
            }
            let mem = await memoryCache.set(key, val);
            if(mem) {
                return
            }
            let disk = await diskCache.set(key, val);
        }
    }

    this.api_limit = api_limit;
    for (let name in libs) {
        this[name]();
    }
};

wechatapi.prototype = {

    timestamp: function(delay) {
        delay = Number(delay) || 0;
        return new Date().getTime() + delay * 1000;
    },

    aesEncrypt: function(data, secretKey, iv, mode) {
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

    aesDecrypt: function(data, secretKey, iv, mode) {
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

    handleError: function(errcode, onlymsg) {
        let errorConfig = Object.assign({
            "key": "errcode",
            "msg": "errmsg"
        }, this.options.error);
        var result = {};
        result[errorConfig.key] = (errors[errcode] && errcode) || 0;
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
    get: async function(path, content, method = 'get', refresh = false) {
        let _self = this;
        path = path.replace('APPID', _self.appid).replace('APPSECRET', _self.appsecret);
        content = content || {};
        let opt = {
            url: 'https://api.weixin.qq.com' + path,
            method: method
        };
        if (method === 'post') {
            opt.data = content
        } else {
            opt.params = content
        }
        var api_name = path.replace('/cgi-bin/', '').replace(/\?.*/, '').split('/').join('_');
        if (api_name == 'user_info_batchget') {
            api_name = 'user_info';
        }
        if (/ACCESS_TOKEN/.test(opt.url)) {
            let token = await _self.accessToken(refresh);
            if (token.access_token) {
                opt.url = opt.url.replace('ACCESS_TOKEN', token.access_token);
            } else {
                return token;
            }
        }
        var data = await axios(opt);
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

        if (data && data.errcode == 40001) {
            return _self.get(path, content, method, true);
        }

        if (data && data.errcode) {
            console.log(data);
            return _self.handleError(data.errcode);
        }

        // if(api_limit[api_name]) {
        //     _self.model.api_usage.where({"used_date": today, "api_name": api_name}).increment("today_used")
        //     .then(function(api_used) {
        //         if(api_used == 0) {
        //             _self.model.api_usage.add({"used_date": today, "api_name": api_name, "today_used": 1})
        //             .then(function(api_used_id) {

        //             }, function(error) {

        //             });
        //         }
        //     }, function(error) {

        //     });
        // }
        return data;
    },

    /**
     * post request
     * @return {Promise} []
     */
    post: async function(path, content) {
        return this.get(path, content, 'post');
    },

    /**
     * get access_token
     * @return {String} []
     */
    accessToken: async function(refresh) {
        let token =
            (!refresh && ((this.access_token.expires_on > this.timestamp()) && this.access_token)) ||
            (!refresh && await this.cache.get('access_token')) ||
            await this.get('/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET');
        if (token.access_token) {
            if (token.expires_in) {
                token.expires_in = 0;
                token.expires_on = this.timestamp(7140);
            }
            this.access_token = token;
            await this.cache.set('access_token', token);
        }
        return token;
    }
};

for (let name in libs) {
    wechatapi.prototype[name] = libs[name];
}

module.exports = wechatapi;