import React, { useEffect } from 'react'
import { Button, Drawer, Form, message, Modal } from 'antd' 
import { post } from '@util/http'  
import { generateUploadFilelist } from '@util/util'  
import UploadFormItem from '@components/upload-form-item'

const { useForm } = Form

interface Props {
  visible: boolean,
  id?: number,
  img?: string,
  onClose: () => void,
  onSubmitted: () => void,
}

const _Drawer: React.FC<Props> = ({ visible, onClose, onSubmitted, id, img }) => {
  const [form] = useForm()

  useEffect(() => {
    if (!visible) {
      form.resetFields()
    } else {
      form.setFieldsValue({
        img: generateUploadFilelist(img)
      })
    }
  }, [visible])

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
                id ? `banner/${id}` : 'banner', {
                ...values,
                img: img[0].response.data,
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
        title={`${id ? '更新' : '添加'}banner`}
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
          <UploadFormItem name="img" />
        </Form>
      </Drawer>
    </>
  )
}

export default _Drawer