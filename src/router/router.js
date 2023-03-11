import React, { lazy } from 'react'

const Home = lazy(() => import('pages/home/home'))
const Login = lazy(() => import('pages/login/login'))
const Overview = lazy(() => import('pages/overview/overview'))
const Detail = lazy(() => import('pages/detail/detail'))
const NotFound = lazy(() => import('pages/not_found/not_found'))

const elements = [
  { path: '/', name: '我的体检报告', element: <Home /> },
  { path: '/login', name: '登录', element: <Login /> },
  {
    path: '/overview',
    name: '报告详情',
    element: <Overview />,
    // children: [
    //   { path: '/overview/detail/:item', name: '报告详情', element: <Detail /> },
    // ]
  },
  { path: '/overview/detail/:item', name: '报告详情', element: <Detail /> },
  { path: '*', name: '404', element: <NotFound /> }
]

export default elements
