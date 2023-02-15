import React, { useEffect, useState } from 'react'
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
import 'styles/Home.css'

const { Header, Content } = Layout

const items1: MenuProps['items'] = [
  { key: '/Home', label: '主页' },
  { key: '/Login', label: '登陆' },
  { key: '/Test', label: '测试' },
]

const App: React.FC = () => {
  const navigate = useNavigate()
  let { pathname } = useLocation()
  const [path, setPath] = useState(pathname)
  useEffect(() => {
    if (pathname == '/') {
      setPath('/Home')
    } else {
      setPath(pathname)
    }
  }, [pathname])

  const click = (e: any) => {
    navigate(e.key, { replace: true })
  }
  return (
    <Layout className="home">
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[path]}
          selectedKeys={[path]}
          items={items1}
          onClick={click}
        />
      </Header>
      <Layout>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
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
