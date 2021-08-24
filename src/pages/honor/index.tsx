import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Button, Modal } from 'antd'
import Drawer from './drawer'
import Table from './table'

import { HonorInterface } from './table'

function Honor() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<({ title: string, id: undefined | number})>({ title: '', id: undefined });
  const [data, setData] = useState<[HonorInterface?]>([]);

  const showAdd = useCallback(() => {
    setCurrent({ title: '', id: undefined })
    setVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setCurrent({ title: '', id: undefined })
    setVisible(false)
  }, [])

  const onSubmit = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 3000)
  }

  const triggerEdit = useCallback(({title, id}): void => {
    setCurrent({ title, id })
    setVisible(true)
  }, [])

  const triggerDelete = useCallback(({title, id}): void => {
    Modal.confirm({
      title: `您确定要删除${title}吗`,
      onOk() {

      }
    })
  }, [])

  useEffect(() => {
    setData([{ title: 'aaaa', id: 11, url: 'xxxx' }])
  }, [])

  return (
    <>
      <div className="">
        <Button onClick={showAdd}>添加荣誉</Button>

        <Divider />

        <Table 
          data={data}   
          triggerEdit={triggerEdit}     
          triggerDelete={triggerDelete}     
        />

        <Drawer 
          visible={visible}
          loading={loading}
          title={current.title}
          onClose={hideDrawer}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}

export default Honor