import React, { useEffect, useCallback, useState } from 'react'
import { Modal, message, PageHeader } from 'antd'
import { useParams, useHistory } from 'react-router'
import { get, post } from '@util/http'

import RichTextEditor from '@components/richtext-editor'

const NewsDetail = () => {
  const { id } = useParams()
  const history = useHistory()
  const [ title, setTitle ] = useState('')
  const [ subtitle, setSubtitle ] = useState('')
  const [ html, setHtml ] = useState('')

  const getData = async () => {
    try {
      const res = await get(`news/${id}`)
      console.log(res)
      setTitle(res.title)
      setSubtitle(res.subtitle)
      setHtml(res.html)
    } catch (e) {

    }
  }

  const submit = useCallback((html) => {
    Modal.confirm({
      title: '您确定要更新新闻内容吗',
      onOk() {
        return new Promise((resolve, reject) => {
          post(`news/${id}`, {
            html
          }).then(res => {
            message.success('提交成功')
            resolve(res)
          }).catch(e => {
            message.error(e)
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
      <PageHeader
        onBack={() => { history.replace('/news') }}
        title={title}
        subTitle={subtitle}
      />
      <RichTextEditor defaultText={html} onSubmit={submit} />
    </>
  )
}

export default NewsDetail