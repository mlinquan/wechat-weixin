'use strict';

module.exports = function() {
    var _self = this;
    this.user = {
        //设置备注名
        updateremark: async function(openid, remark) {
            return _self.post('/cgi-bin/user/info/updateremark?access_token=ACCESS_TOKEN', {
                "openid": openid,
                "remark": remark
            });
        },
        //获取用户基本信息（包括UnionID机制）
        info: async function(openid, lang) {
            lang = lang || 'zh-CN';
            return _self.get('/cgi-bin/user/info?access_token=ACCESS_TOKEN&openid=' + openid + '&lang=' + lang);
        },
        //批量获取用户基本信息 100 pre time
        info_batchget: async function(user_list) {
            return _self.post('/cgi-bin/user/info/batchget?access_token=ACCESS_TOKEN', user_list);
        },
        //获取用户列表 10000 pre time
        get: async function(next_openid) {
            next_openid = next_openid || '';
            return _self.get('/cgi-bin/user/get?access_token=ACCESS_TOKEN&next_openid=' + next_openid);
        },
        get_all: async function(next_openid) {
            let user = this;
            let user_list = await this.get(next_openid);
            if(user.user_list) {
                user.user_list.data.openid = user.user_list.data.openid.concat(user_list.data.openid);
                user.user_list.count += user_list.count;
            }
            if(!user.user_list) {
                user.user_list = user_list;
            }
            if(user.user_list.count < user.user_list.total) {
                return get_all(user_list.next_openid);
            }
            let all_users = Object.assign({}, user.user_list);
            delete user.user_list;
            return all_users;
        },
        get_all_info: async function() {
            let user = this;
            let user_list = await this.get_all();
            let openid_list = user_list.data.openid;
            let count = openid_list.length;
            let time_get = Math.ceil(openid_list.length / 100);
            user.user_info_list = [];
            for(let i=0;i<time_get;i++) {
                let get_openid_list = openid_list.slice(i*100, 100);
                let user_list = {
                    "user_list": get_openid_list.map(function(openid) {
                        return {
                            "openid": openid,
                            "lang": 'zh-CN'
                        }
                    })
                };
                let result = await user.info_batchget(user_list);
                count -= 100;
                user.user_info_list = user.user_info_list.concat(result.user_info_list);
                if(count <= 0) {
                    let all_info = Object.assign({}, user.user_info_list);
                    delete user.user_info_list;
                    return all_info;
                }
            }
        }
    }
};