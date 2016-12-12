'use strict';
module.exports = function() {
    var _self = this;
    this.ticket = {
        getticket: async function(type, refresh) {
            type = type || 'jsapi';
            refresh = refresh || false;
            let token = 
            (!refresh && ((_self.jsapi_ticket[type].expires_on > _self.timestamp()) && _self.jsapi_ticket[type]))
            || (!refresh && await _self.cache.get('jsapi_ticket_' + type))
            || await _self.get('/cgi-bin/ticket/getticket?access_token=ACCESS_TOKEN&type=' + type)
            ;
            if(token.ticket) {
                if(token.expires_in) {
                    token.expires_in = 0;
                    token.expires_on = _self.timestamp(7140);
                    _self.cache.set('jsapi_ticket_' + type, token);
                }
                _self.jsapi_ticket[type] = token;
            }
            return token;
        }
    }
};