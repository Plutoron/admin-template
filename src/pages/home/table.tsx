import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Table } from 'antd' 

export interface Interface {
  id: number,
  img: string
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
      title: '链接',
      dataIndex: 'img',
      render: (text, record, index) => {
        return <a href={text} target="_blank"><img src={text} height="50" /></a>
      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        const { id, img } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ id, img })}>编辑</a>
          <a onClick={() => triggerDelete({ id })}>删除</a>
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