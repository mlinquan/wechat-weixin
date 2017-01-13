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
        //删除菜单(此接口会删除默认菜单及全部个性化菜单,慎用)
        delete: async function() {
            return _self.get('/cgi-bin/menu/delete?access_token=ACCESS_TOKEN');
        },
        //创建个性化菜单
        addconditional: async function(menu) {
            return _self.post('/cgi-bin/menu/addconditional?access_token=ACCESS_TOKEN', menu);
        },
        //删除个性化菜单
        delconditional: async function(menuid) {
            return _self.post('/cgi-bin/menu/delconditional?access_token=ACCESS_TOKEN', {menuid: menuid});
        },
        //测试个性化菜单匹配结果
        trymatch: async function(search) {
            return _self.post('/cgi-bin/menu/trymatch?access_token=ACCESS_TOKEN', search);
        }
    }
    //获取自定义菜单配置
    this.get_current_selfmenu_info = async function() {
        return _self.get('/cgi-bin/get_current_selfmenu_info?access_token=ACCESS_TOKEN');
    }
};