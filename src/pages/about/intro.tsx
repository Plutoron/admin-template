import React, { useState, useEffect, useCallback } from 'react'
import { Button, Input, Modal, message } from 'antd'
import { post } from '@util/http'

const { TextArea } = Input

export interface introInterface {
  intro: string
}

const Intro: React.FC<introInterface> = ({ intro }) => {
  const [_intro, setIntro] = useState('')

  const update = useCallback(() => {
    Modal.confirm({
      title: '您确定要更新公司简介吗',
      onOk() {
        return new Promise((resolve, reject) => {
          post('company/detail', {
            intro: _intro
          }).then(res => {
            message.success('提交成功')
            resolve(res)
          }).catch(e => {
            reject()
          })
        })         
      }
    })
  }, [_intro])

  useEffect(() => {
    setIntro(intro)
  }, [intro])

  return (
    <>
      <div>
        <div className="mb8">公司简介</div>
        <div>
          <TextArea 
            style={{ width: 650, display: 'block'}} 
            value={_intro} 
            rows={10}
            onChange={e => setIntro(e.target.value)} 
          />
          <Button type="primary" className="mt8" onClick={update}>提交</Button>
        </div>
      </div>
    </>
  )
}

export default Intro