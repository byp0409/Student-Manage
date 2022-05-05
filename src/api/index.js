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

// 修改密码
export const modifyPassword = params => request({ url: '/modify/password', method: 'get', params });

// 发布任务
export const getrelease = params => request({ url: '/releasetask', method: 'get', params });

// 获取任务
export const gettask = () => request.get('/gettask');

// 删除任务
export const deletetask = data => request({ url: '/deletetask', method: 'delete', data });

// 获取任务完成情况
export const getcomplete = params => request({ url: '/getcomplete', method: 'get', params });

// 更新任务完成情况
export const updatecomplete = data => request({ url: '/updatecomplete', method: 'post', data });

// 发布知识点
export const releaseK = data => request({ url: '/releaseknowledge', method: 'post', data });

// 获取知识点
export const getK = params => request({ url: '/getaknowledge', method: 'get', params });

// 更新学习情况
export const updateK = params => request({ url: '/updateknowledge', method: 'get', params });

// 获取某学生知识点掌握情况
export const getstuK = params => request({ url: '/getstuknowledge', method: 'get', params });
