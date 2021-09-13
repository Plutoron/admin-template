import React, { useState, useEffect, useCallback } from 'react'
import { Button, Modal, message } from 'antd'
import { post } from '@util/http'
import Upload from '@components/upload'

export interface groupInterface {
  orgImg: string
}

const Group: React.FC<groupInterface> = ({ orgImg }) => {
  const [url, setUrl] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const update = useCallback(() => {
    if (!newUrl) {
      message.error('请先上传')
      return
    }

    Modal.confirm({
      title: '您确定要更新组织架构图吗',
      onOk() {
        return new Promise((resolve, reject) => {
          post('company/detail', {
            orgImg: newUrl
          }).then(res => {
            message.success('提交成功')
            setUrl(res.orgImg)
            resolve(res)
          }).catch(e => {
            message.error(e)
            reject()
          })
        })          
      }
    })
  }, [newUrl])

  const handleUpload = useCallback((_newUrl) => {
    setNewUrl(_newUrl)
  }, [])

  useEffect(() => {
    setUrl(orgImg)
  }, [orgImg])

  return (
    <>
      <div>
        <div className="mb8">组织结构图片</div>
        <div className="FBH">
          <img width="400" className="mr8" src={url} alt="" />

          <div className="FBH FB1">
            <Upload 
              onChange={handleUpload}
            />
            <Button type="primary" className="ml8" onClick={update}>提交</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Group