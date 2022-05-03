import request from './request';
// 导入qs将对象转换成url，用&拼接在url后，解决请求体为urlencoded时url错误的bug
const qs = require('qs');

// 登录
export const login = data => request.post('/login', qs.stringify(data));

// 全部学生信息
export const reqAllUserInfo = () => request.get('/allUserInfo');

// 删除学生信息
export const deleteInfo = Sno => request({ url: '/deleteUser', method: 'delete', data: { Sno } });

// 更新学生信息
export const updateInfo = params => request({ url: 'modify/userinfo', method: 'get', params });

// 注册
export const register = data => request({ url: '/register', method: 'post', data });

// 获取个人信息
export const reqPersonInfo = params => request({ url: '/getUserInfo', method: 'get', params });

export const modifyPassword = params => request({ url: '/modify/password', method: 'get', params });
