import { reqAllUserInfo, deleteInfo } from '@/api';
export default {
  namespaced: true,
  actions: {
    // 全部学生信息
    async reqinfo({ commit }) {
      let result = await reqAllUserInfo();
      if (result.data.status == 200) {
        commit('REQINFO', result.data.result);
      }
    },
    // 删除
    async deleteinfo({ commit }, Sno) {
      let result = await deleteInfo(Sno);
      if (result.data.status == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('删除失败'));
      }
    },
  },
  mutations: {
    REQINFO(state, info) {
      state.info = info;
    },
  },
  state: {
    info: [],
  },
};
