import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Button, Modal, message } from 'antd'
import { get, _delete } from '@util/http'
 
import Drawer from './drawer'
import Table from './table'
import { Interface } from './table'

function Home() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<Interface>({} as Interface);
  const [data, setData] = useState<[Interface?]>([]);

  const showAdd = useCallback(() => {
    setCurrent({} as Interface)
    setVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setCurrent({} as Interface)
    setVisible(false)
  }, [])

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await get('banner')
      console.log(res)
      setData(res)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      message.error(e)
    }
  }, [])

  const triggerEdit = useCallback(({id, img}): void => {
    setCurrent({ id, img })
    setVisible(true)
  }, [])

  const triggerDelete = useCallback(({id}): void => {
    Modal.confirm({
      title: `您确定要删除吗`,
      onOk() {
        return new Promise((resolve, reject) => {
          _delete(`banner/${id}`).then(res => {
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
        <Button onClick={showAdd}>添加Banner</Button>

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
          img={current.img}
          onClose={hideDrawer}
          onSubmitted={getData}
        />
      </div>
    </>
  )
}

export default Home