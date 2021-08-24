import Home from '@pages/home'
import News from '@pages/news'
import Honor from '@pages/honor'
import Solution from '@pages/solution'
import Hire from '@pages/hire'
import About from '@pages/about'
import User from '@pages/user'

const routers = [{
  path: '/home',
  title: '首页配置',
  component: Home
}, {
  path: '/news',
  title: '新闻配置',
  component: News
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
  redirect: true,
  path: '/home',
  component: Home
}]

export default routers