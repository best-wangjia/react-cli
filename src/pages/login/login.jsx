import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button } from 'antd-mobile'
import './login.scss'

 const Login = () => {

  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log(values)
    navigate('/')
  }  

  return (
    <div className="login__page">
      <div className="login__header">
        <h1>体检报告</h1>
      </div>
      <div className="login__box">
        <Form
          name='form'
          onFinish={onFinish}
          footer={
            <Button block type='submit' color='primary' size='large'>提交</Button>
          }
          >
          <Form.Item name='name' label='手机号' rules={[{ required: true }]}>
            <Input placeholder='请输入您的手机号' />
          </Form.Item>
          <Form.Item name='address' label='身份证后六位' rules={[{ required: true }]}>
            <Input placeholder='请输入您的身份证后六位' />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
