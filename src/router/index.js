import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  // linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return { y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('stx_TOKEN');
  if (token) {
    // 登录后禁止到登录页面
    if (to.path === '/login') {
      next(from.path);
    } else {
      next();
    }
  } else {
    // 没有token跳转到login
    if (to.path === '/login') {
      next();
    } else {
      next('/login');
    }
  }
});
export default router;
