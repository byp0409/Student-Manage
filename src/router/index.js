import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
// 鉴权，阻止用户非法跳转
import { identity } from '@/util';
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
    // 解析token要放在里面，因为没有token时解析失败报错,中断路由跳转
    let power = identity(token);
    // 登录后禁止到登录页面
    if (to.path === '/login') {
      // console.log(to.path, from.path);
      next(from.path);
    } else {
      if (to.path == '/home/homepage' || to.path == '/home/myInfo') {
        next();
      } else {
        if (power == 1 && to.meta.power == 1) {
          next();
        } else {
          next(from.path);
        }
      }
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
