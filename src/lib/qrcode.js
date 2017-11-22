'use strict';

module.exports = function() {
    var _self = this;
    this.qrcode = {
        //创建临时二维码
        create: async function(data) {
            return _self.post('/cgi-bin/qrcode/create?access_token=ACCESS_TOKEN', data);
        }
    }
};