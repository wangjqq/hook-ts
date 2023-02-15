import React, { useState, useEffect } from 'react'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import {
  useNavigate,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom'

import Login from 'components/Login'
import Home from 'components/Home'
import Test from 'components/Test'
import 'styles/App.css'

const { Header, Content } = Layout

const App: React.FC = () => {
  const navigate = useNavigate() //用于路由跳转

  let { pathname } = useLocation() //获取当前路由

  let userinfo: any = localStorage.getItem('userInfo') //获取用户信息
  if (userinfo) {
    //如果有信息则转成对象
    userinfo = JSON.parse(userinfo)
  }
  useEffect(() => {
    userinfo = localStorage.getItem('userInfo')
    userinfo = JSON.parse(userinfo)
  }, [localStorage.getItem('userInfo')]) //监听登陆和退出登录 修改用户信息

  const items1: MenuProps['items'] = [
    //菜单栏信息
    { key: '/Home', label: '主页' },

    { key: '/Test', label: '测试' },
    {
      key: '/Login',
      label: `${
        userinfo ? '欢迎你!' + userinfo.userName + ' 点击退出' : '登陆'
      }`,
    },
  ]

  const click = (e: any) => {
    //菜单栏点击事件
    if (userinfo && e.key == '/Login') {
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
          defaultSelectedKeys={[pathname == '/' ? '/Home' : pathname]}
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
