import React, { useMemo } from 'react'
import { Table, Input } from 'antd' 

export interface Interface {
  id: number,
  username: string,
  password: string,
}

export interface _TableInterface {
  loading?: boolean,
  data: [Interface?],
  triggerEdit: ({}: Interface) => any
  triggerDelete: ({}: { title: string, id: number }) => any
}

const _Table: React.FC<_TableInterface> = ({ loading, data, triggerEdit, triggerDelete }) => {
  const columns = useMemo(() => {
    return [{
      title: 'id',
      dataIndex: 'id'
    }, {
      title: '用户名',
      dataIndex: 'username'
    }, {
      title: '密码',
      dataIndex: 'password',
      render: (text) => {
        return <Input.Password style={{maxWidth: '200px'}} value={text} />
      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        const { username, id, password } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ username, id, password })}>编辑</a>

          {
            window?.user?.id !== id && (
              <a onClick={() => triggerDelete({ username, id })}>删除</a>
            )
          }
        </>
      }
    }]
  }, [])

  return (
    <Table
      loading={loading}
      rowKey="id"
      columns={columns} 
      dataSource={data} 
    />
  )
}


export default _Table