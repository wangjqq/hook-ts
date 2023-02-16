import React from 'react'
import { Login1 } from 'interface/User'

import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IUserInfo {
  id: number
  username: string
  password: string
}

const Login: React.FC = () => {
  const navigate = useNavigate()
  const onFinish = async (userData: any) => {
    const { data } = await Login1(userData.userName)
    data.forEach((element: IUserInfo) => {
      if (
        element.username === userData.userName &&
        element.password === userData.passWord
      ) {
        message.info('登陆成功!')
        delete userData.passWord
        // console.log(userData)
        localStorage.setItem('userInfo', JSON.stringify(userData))
        navigate('/Home', { replace: true })
      }
    })
    if (data.length === 0) {
      message.info('请核对账号密码!')
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">
      <Form.Item
        label="用户名"
        name="userName"
        rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="passWord"
        rules={[{ required: true, message: '请输入密码!' }]}>
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          登陆
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login
