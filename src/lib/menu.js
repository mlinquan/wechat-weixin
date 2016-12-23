'use strict';

module.exports = function() {
    var _self = this;
    this.menu = {
        //创建菜单
        create: async function(menu) {
            return _self.post('/cgi-bin/menu/create?access_token=ACCESS_TOKEN', menu);
        },
        //查询菜单
        get: async function() {
            return _self.get('/cgi-bin/menu/get?access_token=ACCESS_TOKEN');
        },
        //删除菜单
        delete: async function() {
            return _self.get('/cgi-bin/menu/delete?access_token=ACCESS_TOKEN');
        }
    }
};