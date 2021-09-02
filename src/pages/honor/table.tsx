import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Table } from 'antd' 

export interface HonorInterface {
  id: number,
  title: string,
  img: string
}

export interface _TableInterface {
  loading?: boolean,
  data: [HonorInterface?],
  triggerEdit: ({}: HonorInterface) => any
  triggerDelete: ({}: { title: string, id: number }) => any
}

const _Table: React.FC<_TableInterface> = ({ loading, data, triggerEdit, triggerDelete }) => {
  const columns = useMemo(() => {
    return [{
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '链接',
      dataIndex: 'img',
      render: (text, record, index) => {
        return <a href={text} target="_blank"><img src={text} height="50" /></a>
      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        const { title, id, img } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ title, id, img })}>编辑</a>
          <a onClick={() => triggerDelete({ title, id })}>删除</a>
        </>
      }
    }]
  }, [])

  return (
    <Table
      loading={loading}
      rowKey="title"
      columns={columns} 
      dataSource={data} 
    />
  )
}


export default _Table