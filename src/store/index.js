import Vue from 'vue';
import Vuex from 'vuex';
import login from './modules/login';
import info from './modules/info';
import home from './modules/home';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    info,
    home,
  },
});
