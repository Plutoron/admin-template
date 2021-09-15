import React, { useState, useCallback } from 'react'
import Upload from '@components/upload'

const Tool: React.FC = () => {
  const [newUrl, setNewUrl] = useState('')

  const handleUpload = useCallback((_newUrl) => {
    setNewUrl(_newUrl)
  }, [])

  return (
    <>
      <div>
        <div className="mb8">上传图片获取图片链接 用在 富文本编辑器</div>
        <div className="">
          <div style={{ width: 250 }}>
            <Upload 
              onChange={handleUpload}
            />
          </div>

          <div>图片地址： { newUrl }</div>
        </div>
      </div>
    </>
  )
}

export default Tool