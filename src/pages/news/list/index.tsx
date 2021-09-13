import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Button, Modal, message } from 'antd'
import { get, _delete } from '@util/http'
 
import Drawer from './drawer'
import Table from './table'
import { NewsInterface } from './table'

function News() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<NewsInterface>({} as NewsInterface);
  const [data, setData] = useState<[NewsInterface?]>([]);

  const showAdd = useCallback(() => {
    setCurrent({} as NewsInterface)
    setVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setCurrent({} as NewsInterface)
    setVisible(false)
  }, [])

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await get('news')
      console.log(res)
      setData(res)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
      message.error(e)
    }
  }, [])

  const triggerEdit = useCallback(({title, id, subtitle, time, poster}): void => {
    setCurrent({ title, id, subtitle, time, poster })
    setVisible(true)
  }, [])

  const triggerDelete = useCallback(({title, id}): void => {
    Modal.confirm({
      title: `您确定要删除${title}吗`,
      onOk() {
        return new Promise((resolve, reject) => {
          _delete(`news/${id}`).then(res => {
            message.success('删除成功')
            getData()
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
      <div className="">
        <Button onClick={showAdd}>添加新闻</Button>

        <Divider />

        <Table 
          loading={loading}
          data={data}   
          triggerEdit={triggerEdit}     
          triggerDelete={triggerDelete}     
        />

        <Drawer 
          visible={visible}
          id={current.id}
          title={current.title}
          subtitle={current.subtitle}
          time={current.time}
          poster={current.poster}
          onClose={hideDrawer}
          onSubmitted={getData}
        />
      </div>
    </>
  )
}

export default News