// import Home from '@pages/home'
// import News from '@pages/news/list'
// import NewsDetail from '@pages/news/detail'
// import Honor from '@pages/honor'
// import Solution from '@pages/solution'
// import Hire from '@pages/hire'
// import About from '@pages/about'
// import User from '@pages/user'

import { lazy } from 'react'

const Home = lazy(() => import('@pages/home'))
const News = lazy(() => import('@pages/news/list'))
const NewsDetail = lazy(() => import('@pages/news/detail'))
const Honor = lazy(() => import('@pages/honor'))
const Solution = lazy(() => import('@pages/solution'))
const Hire = lazy(() => import('@pages/hire'))
const About = lazy(() => import('@pages/about'))
const User = lazy(() => import('@pages/user'))
const Login = lazy(() => import('@pages/login'))

const routers = [{
  path: '/home',
  title: '首页配置',
  component: Home
}, {
  path: '/news',
  title: '新闻配置',
  component: News,
  routes: [
    {
      path: '/news/:id',
      title: '新闻详情',
      component: NewsDetail
    }, 
  ]
}, {
  path: '/honor',
  title: '荣誉配置',
  component: Honor
}, {
  path: '/solution',
  title: '业务成果配置',
  component: Solution
}, {
  path: '/hire',
  title: '招贤纳士配置',
  component: Hire
}, {
  path: '/about',
  title: '关于我们配置',
  component: About
}, {
  path: '/user',
  title: '用户管理',
  component: User
}, {
  path: '/login',
  title: '登录',
  component: Login,
  hide: true
}, {
  redirect: true,
  path: '/home',
  component: Home
}]

export default routers