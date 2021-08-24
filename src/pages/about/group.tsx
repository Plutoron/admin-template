import React, { useState, useEffect, useCallback } from 'react'

import { Button, Input, Modal, Upload } from 'antd'

import { UploadOutlined } from '@ant-design/icons'

const mock = 'url'
  
function Group() {
  const [url, setUrl] = useState('')

  const update = useCallback(() => {
    Modal.confirm({
      title: '您确定要更新组织架构图吗',
      onOk() {
        console.log(url)
      }
    })
  }, [url])

  useEffect(() => {
    setUrl(mock)
  }, [])

  return (
    <>
      <div>
        <div>组织结构图片</div>
        <img src={url} alt="" />
        <div className="FBH">
          <Upload style={{ width: 300 }} name="logo" action="/upload.do" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>点击上传</Button>
          </Upload>
          <Button className="ml8" onClick={update}>提交</Button>
        </div>
      </div>
    </>
  )
}

export default Group