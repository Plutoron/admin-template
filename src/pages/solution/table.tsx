import React, { useMemo, useState, useEffect, useCallback } from 'react'

import { Table } from 'antd' 

export interface SolutionInterface {
  id: number,
  type: string,
  title: string,
  url: string
}

export interface _TableInterface {
  data: [SolutionInterface?],
  triggerEdit: ({ title, type, id }: { title: string, type: string, id: number }) => any
  triggerDelete: ({ title, type, id }: { title: string, type: string, id: number }) => any
}

const _Table: React.FC<_TableInterface> = ({ data, triggerEdit, triggerDelete }) => {
  const columns = useMemo(() => {
    return [{
      title: '标题',
      dataIndex: 'title',
    }, {
      title: '链接',
      dataIndex: 'url',
      render: (text, record, index) => {
        return <img src={text} width="100" />
      }
    }, {
      title: '操作',
      render: (text, record, index) => {
        const { title, type, id } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ title, type, id })}>编辑</a>
          <a onClick={() => triggerDelete({ title, type, id })}>删除</a>
        </>
      }
    }]
  }, [])

  return (
    <Table
      rowKey="title"
      columns={columns} 
      dataSource={data} 
    />
  )
}


export default _Table