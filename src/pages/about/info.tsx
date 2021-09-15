import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, Modal, Form, message } from 'antd'
import { post } from '@util/http'
import { generateUploadFilelist } from '@util/util'
import UploadFormItem from '@components/upload-form-item'

import { aboutInterface } from './index'

const { useForm } = Form

const Info: React.FC<aboutInterface> = ({
  name,
  phone,
  fax,
  mail,
  address,
  logo,
  qrcode,
  fillinfo
}) => {
  const [info, setInfo] = useState<aboutInterface>({} as aboutInterface)

  const [form] = useForm()

  const update = useCallback(() => {
    form.validateFields()
      .then(values => {
        console.log(values)

        const { logo, qrcode } = values

        if (!logo || !logo[0] || logo[0].status !== 'done') {
          message.error('请检查logo数据')
          return
        }
    
        if (!qrcode || !qrcode[0] || qrcode[0].status !== 'done') {
          message.error('请检查二维码数据')
          return
        }

        Modal.confirm({
          title: '您确定要更新公司信息吗',
          onOk() {
            return new Promise((resolve, reject) => {
              post('company/detail', {
                ...values,
                logo: logo[0].response.data,
                qrcode: qrcode[0].response.data,
              }).then(res => {
                message.success('提交成功')
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
  }, [info])

  const normFile = useCallback((e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, [])

  useEffect(() => {
    setInfo({
      name,
      phone,
      fax,
      mail,
      address,
      logo,
      qrcode,
      fillinfo
    })

    form.setFieldsValue({
      name,
      phone,
      fax,
      mail,
      address,
      logo: generateUploadFilelist(logo),
      qrcode: generateUploadFilelist(qrcode),
      fillinfo
    })
  }, [  
    name,
    phone,
    fax,
    mail,
    address,
    logo,
    qrcode
  ])

  return (
    <>
      <div>
        <div className="mb8">公司信息</div>
        <div>
          <Form    
            form={form}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 8 }} 
            labelAlign="left"
            hideRequiredMark
            colon={false}
          >
            <Form.Item
              name="name"
              label="公司名称"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="电话"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              name="fax"
              label="传真"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              name="mail"
              label="邮箱"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              name="address"
              label="地址"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <UploadFormItem label="logo" name="logo" />

            <UploadFormItem label="公众号二维码" name="qrcode" />

            <Form.Item
              name="fillinfo"
              label="备案信息"
              rules={[{ required: true, message: '请输入' }]}
            >
              <Input
                style={{ width: '100%' }}
                placeholder=""
              />
            </Form.Item>

            <Form.Item
              label=" "
            >
              <Button type="primary" className="mt8" onClick={update}>提交</Button>   
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  )
}

export default Info