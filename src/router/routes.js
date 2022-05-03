export default [
  // 重定向
  {
    path: '*',
    redirect: '/login',
  },
  // 一级路由
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login/Login'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('@/views/Home/Home'),
    children: [
      {
        // 首页
        name: 'homePage',
        path: 'homePage',
        component: () => import('@/views/Home/RightContent/HomePage/HomePage'),
      },
      {
        // 学生信息页
        name: 'studentInfo',
        path: 'studentInfo',
        component: () => import('@/views/Home/RightContent/StudentInfo/StudentInfo'),
      },
      {
        // 注册学生
        name: 'register',
        path: 'register',
        component: () => import('@/views/Home/RightContent/Register/Register'),
      },
      {
        // 个人中心
        name: 'myInfo',
        path: 'myInfo',
        component: () => import('@/views/Home/RightContent/MyInfo/MyInfo'),
      },
    ],
  },
];
