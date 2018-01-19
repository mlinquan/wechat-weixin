'use strict';

module.exports = function() {
    var _self = this;
    this.message = {
        /*
        发送模板消息
        {
            "touser": "OPENID",
            "template_id": "ngqIpbwh8bUfcSsECmogfXcV14J0tQlEpBO27izEYtY",
            "url": "http://weixin.qq.com/download",
            "topcolor": "#FF0000",
            "data": {
                "User": {
                    "value": "黄先生",
                    "color": "#173177"
                }
            }
        }*/
        template_send: async function(data) {
            return _self.post('/cgi-bin/message/template/send?access_token=ACCESS_TOKEN', data);
        },
        wxopen_template_send: async function(data) {
            return _self.post('/cgi-bin/message/wxopen/template/send?access_token=ACCESS_TOKEN', data);
        },
        push_all: async function(data) {
            let user_list = await _self.user.get_all();
            user_list = user_list.data.openid;
            for(let i=0;i<user_list.length;i++) {
                let to_data = data;
                to_data.touser = user_list[i];
                let send_to = await this.template_send(to_data);
                console.log(send_to);
            }
            return true;
        }
        // push_all: async function(data) {
        //     let user_list = await _self.user.get_all();
        //     user_list = user_list.data.openid;
        //     let message = this;
        //     return new Promise(function(resolve, reject) {
        //         let total = user_list.length;
        //         var count = 0;
        //         var push_one = async function() {
        //             let to_data = data;
        //             to_data.touser = user_list[count];
        //             count++;
        //             if(count < total - 1) {
        //                 push_one();
        //             }
        //             let to_user = await message.template_send(to_data);
        //             if(count == (total - 1)) {
        //                 resolve(true);
        //             }
        //         };
        //         push_one();
        //     });
        // }
    }
};