import React, { useEffect, useRef } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import {
  useNavigate,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import Login from 'views/Login'
import Home from 'views/Home'
import Test from 'views/Test'
import 'styles/App.css'

const { Header, Content } = Layout

const App: React.FC = () => {
  const navigate = useNavigate() //用于路由跳转

  let { pathname } = useLocation() //获取当前路由

  const userInfo: any = useRef('')
  userInfo.current = localStorage.getItem('userInfo') //获取用户信息
  if (userInfo.current) {
    //如果有信息则转成对象
    userInfo.current = JSON.parse(userInfo.current)
  }

  useEffect(() => {
    userInfo.current = localStorage.getItem('userInfo')
    userInfo.current = JSON.parse(userInfo.current)
  }, [pathname]) //监听登陆和退出登录 修改用户信息

  const items1: MenuProps['items'] = [
    //菜单栏信息
    { key: '/Home', label: '主页' },

    { key: '/Test', label: '测试' },
    {
      key: '/Login',
      label: `${
        userInfo.current
          ? '欢迎你!' + userInfo.current.userName + ' 点击退出'
          : '登陆'
      }`,
    },
  ]

  const click = (e: any) => {
    //菜单栏点击事件
    if (userInfo.current && e.key === '/Login') {
      localStorage.removeItem('userInfo')
    }
    navigate(e.key, { replace: true })
  }

  return (
    <Layout className="home">
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[pathname === '/' ? '/Home' : pathname]}
          selectedKeys={[pathname]}
          items={items1}
          onClick={click}
        />
      </Header>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 200,
          }}>
          <Routes>
            <Route path="/" element={<Navigate to={'/Home'} />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Test" element={<Test />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
