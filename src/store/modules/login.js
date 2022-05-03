import { login } from '@/api';
import { account } from '@/util';

export default {
  namespaced: true,
  actions: {
    async login(context, data) {
      let result = await login(data);
      if (result.data.status == 200) {
        let token = result.data.data;
        // 存储token和身份
        localStorage.setItem('stx_TOKEN', token);
      } else {
        return Promise.reject(new Error('登录失败'));
      }
    },
  },
};
