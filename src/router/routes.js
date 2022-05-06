export default [
  // 重定向
  {
    path: '*',
    redirect: '/home/homepage',
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
        meta: { power: 1 },
      },
      {
        // 注册学生
        name: 'register',
        path: 'register',
        component: () => import('@/views/Home/RightContent/Register/Register'),
        meta: { power: 1 },
      },
      {
        // 个人中心
        name: 'myInfo',
        path: 'myInfo',
        component: () => import('@/views/Home/RightContent/MyInfo/MyInfo'),
      },
      {
        // 雷达图
        name: 'radarmap',
        path: 'radarmap',
        component: () => import('@/views/Home/RightContent/StudentInfo/RadarMap/RadarMap'),
        meta: { power: 1 },
      },
    ],
  },
];
