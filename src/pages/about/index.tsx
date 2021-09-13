import React, { useState, useEffect } from 'react'
import { Divider, Tabs } from 'antd'
import { get } from '@util/http'

import Info from './info'
import Intro from './intro'
import Group from './group'
import Culture from './culture'

const { TabPane } = Tabs

export interface aboutInterface {
  name: string,
  logo: string,
  phone: string, 
  fax: string, 
  mail: string,
  qrcode: string,
  address: string, 
  fillinfo: string,
  intro?: string,
  orgImg?: string
}

function About() {
  const [ about, setAbout ] = useState<aboutInterface>({} as aboutInterface)

  const getData = async () => {
    try {
      const res = await get('company/detail')
      console.log(res)
      setAbout(res)
    } catch (e) {

    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Tabs defaultActiveKey="basic">
        <TabPane tab="基本配置" key='basic' forceRender>
          <Info {...about} />
          <Divider />
          <Intro intro={about.intro} />
          <Divider />
          <Group orgImg={about.orgImg} />
        </TabPane>

        <TabPane tab="企业文化" key='cultrue' forceRender>
          <Culture />
        </TabPane>
      </Tabs>
    </>
  )
}

export default About