'use strict';

module.exports = {
    token: {
        explain: '获取access_token',
        limit: 2000 },

    message_custom_send: {
        explain: '发送客服消息',
        limit: 500000 },

    media_uploadnews: {
        explain: '群发接口-上传图文消息素材',
        limit: 100 },

    message_mass_sendall: {
        explain: '群发接口-根据分组进行群发',
        limit: 100 },

    message_mass_send: {
        explain: '群发接口-根据OpenID列表群发',
        limit: 100 },

    message_mass_delete: {
        explain: '群发接口-删除群发',
        limit: 10 },

    message_mass_preview: {
        explain: '群发接口-发送预览',
        limit: 100 },

    message_mass_get: {
        explain: '群发接口-查看发送状态',
        limit: 1000 },

    message_template_send: {
        explain: '模板消息（业务通知）',
        limit: 100000 },

    groups_create: {
        explain: '创建分组',
        limit: 1000 },

    groups_get: {
        explain: '查询所有分组',
        limit: 1000 },

    groups_getid: {
        explain: '查询用户所在分组',
        limit: 10000 },

    groups_update: {
        explain: '修改分组名',
        limit: 1000 },

    groups_members_update: {
        explain: '移动用户分组',
        limit: 100000 },

    user_updateremark: {
        explain: '设置用户备注名',
        limit: 10000 },

    user_info: {
        explain: '获取用户基本信息',
        limit: 5000000 },

    user_get: {
        explain: '获取用户列表',
        limit: 500 },

    qrcode_create: {
        explain: '生成带参数的二维码',
        limit: 100000 },

    shorturl: {
        explain: '长链接转短链接接口',
        limit: 1000 },

    menu_create: {
        explain: '自定义菜单创建',
        limit: 500 },

    menu_delete: {
        explain: '自定义菜单删除',
        limit: 1000 },

    menu_get: {
        explain: '自定义菜单查询',
        limit: 10000 },

    menu_addconditional: {
        explain: '增加个性化菜单',
        limit: 2000 },

    menu_delconditional: {
        explain: '删除个性化菜单',
        limit: 2000 },

    menu_trymatch: {
        explain: '测试个性化菜单匹配结果',
        limit: 20000 },

    material_add_material: {
        explain: '上传永久多媒体素材',
        limit: 1000 },

    material_add_news: {
        explain: '上传永久图文素材',
        limit: 1000 },

    material_get_material: {
        explain: '获取永久素材',
        limit: 1000 },

    material_update_news: {
        explain: '修改永久图文素材',
        limit: 1000 },

    material_get_materialcount: {
        explain: '获取永久素材总数',
        limit: 1000 },

    material_batchget_material: {
        explain: '获取永久素材列表',
        limit: 1000 },

    material_del_material: {
        explain: '删除永久素材',
        limit: 1000 },

    media_upload: {
        explain: '上传临时素材',
        limit: 5000 },

    media_get: {
        explain: '下载临时素材',
        limit: 10000 },

    media_uploadimg: {
        explain: '上传图片获得URL（在群发接口中使用）',
        limit: 500 },

    semantic_semproxy_search: {
        explain: '语义理解接口',
        limit: 1000 },

    customservice_msgrecord_getrecord: {
        explain: '获取客服聊天记录',
        limit: 5000 },

    customservice_getkflist: {
        explain: '获取客服基本信息',
        limit: 500000 },

    customservice_getonlinekflist: {
        explain: '获取在线客服接待信息',
        limit: 500000 },

    customservice_kfaccount_add: {
        explain: '添加客服账号',
        limit: 500 },

    customservice_kfaccount_del: {
        explain: '删除客服账号',
        limit: 500 },

    customservice_kfaccount_update: {
        explain: '设置客服信息',
        limit: 500 },

    customservice_kfaccount_uploadheadimg: {
        explain: '上传客服头像',
        limit: 500 },

    customservice_kfsession_create: {
        explain: '创建会话',
        limit: 2000 },

    customservice_kfsession_close: {
        explain: '关闭会话',
        limit: 2000 },

    customservice_kfsession_getsession: {
        explain: '获取客户的会话状态',
        limit: 2000 },

    customservice_kfsession_getsessionlist: {
        explain: '获取客服的会话列表',
        limit: 2000 },

    customservice_kfsession_getwaitcase: {
        explain: '获取未接入会话列表',
        limit: 2000 } };