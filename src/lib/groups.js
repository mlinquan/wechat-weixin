'use strict';

module.exports = function() {
    var _self = this;
    this.groups = {
        //创建分组
        create: async function(name) {
            return _self.post('/cgi-bin/groups/create?access_token=ACCESS_TOKEN', {"group":{"name":name}});
        },
        //查询所有分组
        get: async function() {
            return _self.get('/cgi-bin/groups/get?access_token=ACCESS_TOKEN');
        },
        //查询用户所在分组
        getid: async function(openid) {
            return _self.post('/cgi-bin/groups/getid?access_token=ACCESS_TOKEN', {"openid":openid});
        },
        //修改分组名
        update: async function(id, name) {
            return _self.post('/cgi-bin/groups/update?access_token=ACCESS_TOKEN', {"group":{"id":id,"name":name}});
        },
        //移动用户分组
        members_update: async function(openid, to_groupid) {
            return _self.post('/cgi-bin/groups/members/update?access_token=ACCESS_TOKEN', {"openid":openid,"to_groupid":to_groupid});
        },
        //批量移动用户分组
        members_batchupdate: async function(openid_list, to_groupid) {
            return _self.post('/cgi-bin/groups/members/batchupdate?access_token=ACCESS_TOKEN', {"openid_list":openid_list,"to_groupid":to_groupid});
        },
        //删除分组
        delete: async function(id) {
            return _self.post('/cgi-bin/groups/delete?access_token=ACCESS_TOKEN', {"group":{"id":id}});
        }
    };
};