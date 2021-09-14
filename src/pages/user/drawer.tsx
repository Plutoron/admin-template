import React, { useEffect } from 'react'
import { Button, Drawer, Form, message, Modal, Input } from 'antd' 
import { post } from '@util/http'

const { useForm } = Form

interface Props {
  visible: boolean,
  id?: number,
  username?: string,
  password?: string,
  onClose: () => void,
  onSubmitted: () => void,
}

const _Drawer: React.FC<Props> = ({ visible, onClose, onSubmitted, id, username, password }) => {
  const [form] = useForm()

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    } else {
      form.setFieldsValue({
        username,
        password
      })
    }
  }, [visible])

  const _onSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log(values)

        Modal.confirm({
          title: `您确定要${id ? '更新' : '添加'}吗`,
          onOk() {
            return new Promise((resolve, reject) => {
              post(
                id ? `user/${id}` : 'user', {
                ...values,
              }).then(res => {
                message.success('提交成功')
                onSubmitted()
                onClose()
                resolve(res)
              }).catch(e => {
                message.error(e)
                reject()
              })
            })          
          }
        })
      })
    .catch(errorInfo => {})
  }

  return (
    <>
      <Drawer
        title={`${id ? '更新' : '添加'}用户`}
        placement="right"
        width={640}
        closable={false}
        onClose={onClose}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button onClick={_onSubmit} type="primary">
              提交
            </Button>
          </div>
        }
        forceRender
      >
        <Form    
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }} 
          hideRequiredMark
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder=""
              maxLength={20}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input.Password
              style={{ width: '100%' }}
              placeholder=""
              maxLength={20}
            />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default _Drawer