import React from 'react'
import { Reguser } from 'interface/User'

import { Button, Form, Input, message } from 'antd'
import { useNavigate } from 'react-router-dom'

interface IUserInfo {
  id: number
  username: string
  password: string
}

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const Login: React.FC = () => {
  // const [messageApi, contextHolder] = message.useMessage()
  const navigate = useNavigate()
  const onFinish = async (userData: any) => {
    // messageApi.info('Hello, Ant Design!')

    const { data } = await Reguser(userData.username)
    data.forEach((element: IUserInfo) => {
      if (
        element.username === userData.username &&
        element.password === userData.password
      ) {
        message.info('登陆成功!')
        navigate('/Home', { replace: true })
      }
    })
    console.log(data)
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
        label="Username"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
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
