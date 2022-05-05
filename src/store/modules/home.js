import {
  getrelease,
  gettask,
  deletetask,
  getcomplete,
  updatecomplete,
  releaseK,
  getK,
} from '@/api';

export default {
  namespaced: true,
  actions: {
    // 发布任务
    async getrelease(content, params) {
      let result = await getrelease(params);
      if (result.data.status == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('发布失败'));
      }
    },
    // 获取任务
    async gettask({ commit }) {
      let result = await gettask();
      if (result.data.status == 200) {
        commit('GETTASK', result.data);
        return 'ok';
      } else {
        return Promise.reject(new Error('获取任务失败'));
      }
    },
    // 删除任务
    async deletetask(content, data) {
      let result = await deletetask(data);
      if (result.data.status == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('删除失败'));
      }
    },
    // 获取任务完成情况
    async getcomplete({ commit }, params) {
      let result = await getcomplete(params);
      if (result.data.status == 200) {
        commit('GETCOMPLETE', result.data.complete);
        return 'ok';
      } else {
        console.log('请求失败');
        return Promise.reject(new Error('获取任务完成情况失败'));
      }
    },
    // 更新任务完成情况
    async updatecomplete({ commit }, data) {
      let result = await updatecomplete(data);
      console.log(data);
      if (result.data.status == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('更新任务情况失败'));
      }
    },
    // 发布知识点
    async releaseK({ commit }, data) {
      let result = await releaseK(data);
      if (result.data.status == 200) {
        return 'ok';
      } else {
        return Promise.reject(new Error('发布知识点失败'));
      }
    },
    // 获取学习知识点掌握清空或需要掌握的知识点
    async getK({ commit }, params) {
      let result = await getK(params);
      if (result.data.status == 200) {
        commit('GETK', result.data.Scase);
        return 'ok';
      } else {
        return Promise.reject(new Error('error'));
      }
    },
  },
  mutations: {
    GETTASK(state, data) {
      state.taskdata = data;
    },
    GETCOMPLETE(state, data) {
      state.complete = data;
    },
    GETK(state, data) {
      let arr = data.split('|');
      state.knowledge = arr;
    },
  },
  state: {
    taskdata: {},
    complete: [],
    knowledge: [],
  },
  getters: {
    alltask(state) {
      return state.taskdata.alltask || [];
    },
  },
};
