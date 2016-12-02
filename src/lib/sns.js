'use strict';

module.exports = function() {
    var _self = this;
    this.sns = {
        oauth2: async function(code) {
            return _self.get('/sns/oauth2/access_token?appid=APPID&secret=APPSECRET&code=' + code + '&grant_type=authorization_code');
        },
        userinfo: async function(openid, access_token) {
            return _self.get('/sns/userinfo?access_token=' + access_token + '&openid=' + openid + '&lang=zh_CN');
        }
    }
};