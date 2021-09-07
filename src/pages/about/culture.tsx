import React, { useEffect, useCallback, useState } from 'react'
import { Modal, message } from 'antd'
import { get, post } from '@util/http'

import RichTextEditor from '@components/richtext-editor'

const Hire = () => {
  const [ html, setHtml ] = useState('')

  const getData = async () => {
    try {
      const res = await get('culture')
      console.log(res)
      setHtml(res.html)
    } catch (e) {

    }
  }

  const submit = useCallback((html) => {
    Modal.confirm({
      title: '您确定要更新企业文化吗',
      onOk() {
        return new Promise((resolve, reject) => {
          post('culture', {
            html
          }).then(res => {
            message.success('提交成功')
            resolve(res)
          }).catch(e => {
            reject()
          })
        })          
      }
    })
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <RichTextEditor defaultText={html} onSubmit={submit} />
    </>
  )
}

export default Hire