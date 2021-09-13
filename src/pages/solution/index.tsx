import React, { useState, useEffect, useCallback } from 'react'
import { Divider, Button, Modal, Tabs, message } from 'antd'
import { get, _delete } from '@util/http'
import { SolutionTypes } from '@src/enums'

import { solutionInterface } from './table'
import Drawer from './drawer'
import Table from './table'

const { TabPane } = Tabs

function Solution() {
  const [activeKey, setActiveKey] = useState('build');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState<solutionInterface>({} as solutionInterface);
  const [buildData, setBuildData] = useState<[solutionInterface?]>([]);
  const [manageData, setMangeData] = useState<[solutionInterface?]>([]);
  const [protectData, setProtectData] = useState<[solutionInterface?]>([]);

  const showAdd = useCallback(() => {
    setCurrent({} as solutionInterface)
    setVisible(true)
  }, [])

  const hideDrawer = useCallback(() => {
    setCurrent({} as solutionInterface)
    setVisible(false)
  }, [])

  const triggerEdit = useCallback(({title, type, id, img}): void => {
    setCurrent({ title, type, id, img })
    setVisible(true)
  }, [])

  const triggerDelete = useCallback(({title, id}): void => {
    Modal.confirm({
      title: `您确定要删除${title}吗`,
      onOk() {
        Modal.confirm({
          title: `您确定要删除${title}吗`,
          onOk() {
            return new Promise((resolve, reject) => {
              _delete(`solution/${id}`).then(res => {
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
      }
    })
  }, [])

  const getData = useCallback(async () => {
    setLoading(true)
    try {
      const res = await get(`solution/${activeKey}`)
      console.log(res)

      switch (activeKey) {
        case 'build':
          setBuildData(res)
          break;

        case 'manage':
          setMangeData(res)
          break;
    
        case 'protect':
          setProtectData(res)
          break;

        default:
          break;
      }
      setLoading(false)
    } catch (e) {
      message.error(e)
      setLoading(false)
    }
  }, [activeKey])

  useEffect(() => {
    getData()
  }, [activeKey])
   
  return (
    <>
      <div className="">
        <Button onClick={showAdd}>添加业务成果</Button>

        <Divider />

        <Tabs activeKey={activeKey} onChange={activeKey => setActiveKey(activeKey)} >
          <TabPane tab="建筑类" key={SolutionTypes['建筑类']}>
            <Table 
              loading={loading}
              data={buildData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
          <TabPane tab="资源管理类" key={SolutionTypes['资源管理类']}>
            <Table 
              loading={loading}
              data={manageData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
          <TabPane tab="资源保护类" key={SolutionTypes['资源保护类']}>
            <Table 
              loading={loading}
              data={protectData}   
              triggerEdit={triggerEdit}     
              triggerDelete={triggerDelete}     
            />
          </TabPane>
        </Tabs>

        <Drawer 
          visible={visible}
          loading={loading}
          id={current.id}
          title={current.title}
          type={current.type || activeKey}
          img={current.img}
          onClose={hideDrawer}
          onSubmitted={getData}
        />
      </div>
    </>
  )
}

export default Solution