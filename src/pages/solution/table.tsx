import React, { useMemo } from 'react'
import { Table } from 'antd' 

export interface solutionInterface {
  id: number,
  type: string,
  title: string,
  img: string
}

export interface _TableInterface {
  loading: boolean,
  data: [solutionInterface?],
  triggerEdit: ({}: solutionInterface) => any
  triggerDelete: ({}: { id: number, title: string }) => any
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
        const { title, type, id, img } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ title, type, id, img })}>编辑</a>
          <a onClick={() => triggerDelete({ title, id })}>删除</a>
        </>
      }
    }]
  }, [])

  return (
    <Table
      rowKey="title"
      loading={loading}
      columns={columns} 
      dataSource={data} 
    />
  )
}


export default _Table