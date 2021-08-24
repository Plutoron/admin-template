import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Button, Drawer, Form, Input, Upload, Select } from 'antd' 

import { UploadOutlined } from '@ant-design/icons'

import { SolutionTypes } from '@src/enums'

const { useForm } = Form
const { Option } = Select

interface Props {
  visible: boolean,
  loading: boolean,
  title: string,
  onClose: () => void,
  onSubmit: () => void,
}

const _Drawer: React.FC<Props> = ({ visible, onClose, loading, onSubmit, title }) => {
  const [form] = useForm()

  const _onClose = useCallback(() => {
    onClose()
  }, [])

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
        title
      })
    }
  }, [visible, title])

  return (
    <>
      <Drawer
        title="添加荣誉"
        placement="right"
        width={640}
        closable={false}
        onClose={_onClose}
        visible={visible}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={_onClose} style={{ marginRight: 8 }}>
              取消
            </Button>
            <Button loading={loading} onClick={onSubmit} type="primary">
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

          <Form.Item name="type" label="类型" rules={[{ required: true }]}>
            <Select>
              <Option value={SolutionTypes['建筑类']}>建筑类</Option>
              <Option value={SolutionTypes['资源管理类']}>资源管理类</Option>
              <Option value={SolutionTypes['资源保护类']}>资源保护类</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="url"
            label="图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default _Drawer