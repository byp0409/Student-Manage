import { reqAllUserInfo, deleteInfo, updateInfo, reqPersonInfo, getstuK } from '@/api';
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
    // 更新学生信息
    async updateInfo({ commit }, params) {
      let result = await updateInfo(params);
      if (result.data.status == 200) {
        return '修改成功';
      } else {
        return Promise.reject(new Error('修改失败'));
      }
    },
    // 个人信息
    async reqPersonInfo({ commit }, data) {
      let params = { Sno: data };
      let result = await reqPersonInfo(params);
      if (result.data.status == 200) {
        commit('REQPERSONINFO', result.data.result[0]);
        return 'ok';
      } else {
        return Promise.reject(new Error('请求个人信息失败'));
      }
    },
    // 知识点掌握情况
    async getstuK({ commit }, params) {
      let result = await getstuK(params);
      if (result.data.status == 200 && result.data.stuscase !== null) {
        return result.data.stuscase;
      } else {
        return Promise.reject(new Error('暂无数据'));
      }
    },
  },
  mutations: {
    REQINFO(state, info) {
      state.info = info;
    },
    REQPERSONINFO(state, pinfo) {
      state.pinfo = pinfo;
    },
  },
  state: {
    info: [],
    pinfo: {},
  },
};
