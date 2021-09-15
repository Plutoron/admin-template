import React, { useCallback } from 'react'
import { Button, Upload, Form } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export interface uploadInterface {
  name: string,
  label: string
}

const _Upload: React.FC<uploadInterface> = ({ label, name }) => {
  const normFile = useCallback((e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }, [])

  return (
    <>
      <Form.Item
        name={name}
        label={label || "图片"}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload name="file" action="/server/upload" accept="image/*" listType="picture" maxCount={1}>
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      </Form.Item>
    </>
  )
}

export default _Upload