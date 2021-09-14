import React, { useState } from 'react'
import { Button, Form, Input, message } from 'antd' 
import { post } from '@util/http'  
import './index.css'
import { useHistory } from 'react-router'

const { useForm } = Form

const Login: React.FC = () => {
  const [ loading, setLoading ] = useState(false)
  const [form] = useForm()
  const history = useHistory()

  const login = () => {
    form.validateFields()
      .then(values => {
        console.log(values)
        setLoading(true)
        post('login', {
          ...values,
        }).then(res => {
          console.log(res)
          setLoading(false)
          if (res) {
            message.success("登录成功")
            history.push('/home')
          } else {
            message.error("账号或密码错误")
          }
        }).catch(e => {
          setLoading(false)
          message.error(e)
        })
      })
    .catch(errorInfo => {})
  }

  return (
    <div className="login">
      <Form    
        className="login-form"
        layout="vertical"
        form={form}
        hideRequiredMark
        colon={false}
      >
        <div className="FBH FBJC mb8" style={{ fontSize: 24, color: '#999' }}>
          后台管理
        </div>

        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input
            style={{ width: 250 }}
            placeholder="请输入用户名"
            maxLength={20}
            autocomplete="off"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            style={{ width: 250 }}
            placeholder="请输入密码"
            maxLength={20}
          />
        </Form.Item>


        <Form.Item
          noStyle
        >
          <Button  
            style={{ width: 250 }}
            onClick={login}
            type="primary"
            loading={loading}
          >
            登录
          </Button> 
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login