import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引入第三方库
import '@/plugins/element-ui.js';
import * as API from '@/api';
Vue.config.productionTip = false;
import echarts from '@/plugins/echarts';
Vue.use(echarts);

// 测试接口
// import { login, reqAllUserInfo } from '@/api';
// console.log(login({ Sno: 'byp0409', password: '123456' }));
// console.log(reqAllUserInfo());

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$API = API;
    Vue.prototype.$bus = this;
  },
}).$mount('#app');
