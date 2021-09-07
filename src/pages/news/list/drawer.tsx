import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Button, Drawer, Form, Input, Upload, message, Modal, DatePicker } from 'antd' 
import { UploadOutlined } from '@ant-design/icons'
import moment from 'moment';
import { post } from '@util/http'  
import { generateUploadFilelist } from '@util/util'  

const { useForm } = Form

interface Props {
  visible: boolean,
  id?: number,
  title?: string,
  subtitle?: string,
  time?: number,
  poster?: string,
  onClose: () => void,
  onSubmitted: () => void,
}

const _Drawer: React.FC<Props> = ({ visible, onClose, onSubmitted, id, title, subtitle, time, poster }) => {
  const [form] = useForm()

  const normFile = useCallback((e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, [])

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    } else {
      form.setFieldsValue({
        title,
        subtitle,
        time: moment(time),
        poster: generateUploadFilelist(poster)
      })
    }
  }, [visible, title])

  const _onSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log(values)

        const { poster, time } = values

        if (!poster || !poster[0] || poster[0].status !== 'done') {
          message.error('请检查图片')
          return
        }

        Modal.confirm({
          title: `您确定要${id ? '更新' : '添加'}吗`,
          onOk() {
            return new Promise((resolve, reject) => {
              post(
                id ? `news/${id}` : 'news', {
                ...values,
                time: time.format('YYYY-MM-DD'),
                poster: poster[0].response.data,
              }).then(res => {
                message.success('提交成功')
                onSubmitted()
                onClose()
                resolve(res)
              }).catch(e => {
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
        title={`${id ? '更新' : '添加'}新闻`}
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
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder=""
            />
          </Form.Item>

          <Form.Item
            name="subtitle"
            label="二级标题"
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input
              style={{ width: '100%' }}
              placeholder=""
            />
          </Form.Item>

          <Form.Item 
            name="time" 
            label="时间" 
            rules={[{ type: 'object' as const, required: true, message: '请选择时间' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="poster"
            label="图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" action="/api/upload" accept="image/*" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default _Drawer