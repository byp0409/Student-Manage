import { login } from '@/api';
import { identity } from '@/util';

export default {
  namespaced: true,
  actions: {
    async login({ commit }, data) {
      let result = await login(data);
      if (result.data.status == 200) {
        let token = result.data.data;
        // 存储token和身份
        localStorage.setItem('stx_TOKEN', token);
        localStorage.setItem('identity', identity(token).identity);
      } else {
        return Promise.reject(new Error('登录失败'));
      }
    },
  },
};
