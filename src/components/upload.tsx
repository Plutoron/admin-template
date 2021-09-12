import React, { useCallback } from 'react'
import { Button, Upload } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

export interface uploadInterface {
  onChange: (arg0: string) => void
}

const _Upload: React.FC<uploadInterface> = ({ onChange }) => {
  const handleUpload = useCallback((e) => {
    console.log('handleUpload', e)

    const { file } = e
    const { status, response } = file

    if (status === 'done') {
      onChange(response.data)
    }
  }, [])

  return (
    <>
      <Upload 
        style={{ width: 300 }} 
        name="file" 
        action="/server/upload"
        accept="image/*"
        listType="picture" 
        maxCount={1}
        onChange={handleUpload}
      >
        <Button icon={<UploadOutlined />}>点击上传图片</Button>
      </Upload>
    </>
  )
}

export default _Upload