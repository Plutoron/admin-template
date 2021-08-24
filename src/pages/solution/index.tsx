import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Button, Modal, Tabs } from 'antd'
import Drawer from './drawer'
import Table from './table'

import { SolutionInterface } from './table'
import { SolutionTypes } from '@src/enums'

const { TabPane } = Tabs

function Solution() {
  const [activeKey, setActiveKey] = useState('build');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<({ title: string, type: string, id: undefined | number})>({ title: '', type: '', id: undefined });
  const [buildData, setBuildData] = useState<[SolutionInterface?]>([]);
  const [manageData, setMangeData] = useState<[SolutionInterface?]>([]);
  const [protectData, setProtectData] = useState<[SolutionInterface?]>([]);

  const showAdd = useCallback(() => {
    setCurrent({ title: '', type: '', id: undefined })
    setVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setCurrent({ title: '', type: '', id: undefined })
    setVisible(false)
  }, [])

  const onSubmit = () => {
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setVisible(false)
    }, 3000)
  }

  const triggerEdit = useCallback(({title, type, id}): void => {
    setCurrent({ title, type, id })
    setVisible(true)
  }, [])

  const triggerDelete = useCallback(({title, type, id}): void => {
    Modal.confirm({
      title: `您确定要删除${title}吗`,
      onOk() {

      }
    })
  }, [])

  const getData = (type) => {
    
  }

  useEffect(() => {
    // setData([{ title: 'aaaa', type: '', id: 11, url: 'xxxx' }])
  }, [])
   
  return (
    <>
      <div className="">
        <Button onClick={showAdd}>添加业务成果</Button>

        <Divider />

        <Tabs activeKey={activeKey} onChange={activeKey => setActiveKey(activeKey)} >
          <TabPane tab="建筑类" key={SolutionTypes['建筑类']}>
            <Table 
              data={buildData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
          <TabPane tab="资源管理类" key={SolutionTypes['资源管理类']}>
            <Table 
              data={manageData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
          <TabPane tab="资源保护类" key={SolutionTypes['资源保护类']}>
            <Table 
              data={protectData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
        </Tabs>

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

export default Solution