import React from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router';
import { Layout, Menu, ConfigProvider } from 'antd';
import routes from '@src/routes'
import './layout.css'

import zhCN from 'antd/lib/locale/zh_CN';

const { Header, Sider } = Layout;

const LayoutWrap = ({ children }) => {
  const { pathname } = useLocation()

  return (
    <>
      <Layout className="custom-layout">
        <Header className="header FBH FBJB">
          <div className="logo">后台管理</div>
          <div className="username">Admin</div>
        </Header>

        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              selectedKeys={[pathname]}
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                routes.map(({ path, title, redirect, hide }) => {
                  if (redirect || hide) return
                  return (<Menu.Item key={path}>
                    <Link to={path}>
                      { title }
                    </Link>
                  </Menu.Item>)
                })
              }
            </Menu>
          </Sider>

          <Layout style={{ margin: '16px', padding: '16px', background: '#fff', overflowY: 'auto' }}>
            <ConfigProvider locale={zhCN}>
              { children }
            </ConfigProvider>
          </Layout>
        </Layout>        
      </Layout>
    </>
  )
}

export default LayoutWrap
