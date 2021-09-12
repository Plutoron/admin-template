import React, { useEffect, useCallback } from 'react'
import { Button, Drawer, Form, Input, Upload, Select, message, Modal } from 'antd' 
import { UploadOutlined } from '@ant-design/icons'
import { SolutionTypes } from '@src/enums'
import { post } from '@util/http'
import { generateUploadFilelist } from '@util/util'

const { useForm } = Form
const { Option } = Select

interface Props {
  visible: boolean,
  loading: boolean,
  id?: number,
  title?: string,
  type?: string,
  img?: string,
  onClose: () => void,
  onSubmitted: () => void,
}

const _Drawer: React.FC<Props> = ({ visible, onClose, loading, onSubmitted, title, id, type, img }) => {
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
        type,
        img: generateUploadFilelist(img)
      })
    }
  }, [visible, title])

  const _onSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log(values)

        const { img } = values

        if (!img || !img[0] || img[0].status !== 'done') {
          message.error('请检查图片')
          return
        }

        Modal.confirm({
          title: `您确定要${id ? '更新' : '添加'}吗`,
          onOk() {
            return new Promise((resolve, reject) => {
              post(
                id ? `solution/${id}` : 'solution', {
                ...values,
                img: img[0].response.data,
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
        title="添加荣誉"
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
            <Button loading={loading} onClick={_onSubmit} type="primary">
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
            name="img"
            label="图片"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" action="/server/upload" accept="image/*" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  )
}

export default _Drawer