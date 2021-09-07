import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { Table } from 'antd' 
import moment from 'moment';
import { Link } from 'react-router-dom';

export interface NewsInterface {
  id: number,
  title: string,
  subtitle: string,
  time: number,
  poster: string
}

export interface _TableInterface {
  loading?: boolean,
  data: [NewsInterface?],
  triggerEdit: ({}: NewsInterface) => any
  triggerDelete: ({}: { title: string, id: number }) => any
}

const _Table: React.FC<_TableInterface> = ({ loading, data, triggerEdit, triggerDelete }) => {
  const columns = useMemo(() => {
    return [{
      title: '标题',
      dataIndex: 'title',
      render: (text, record) => {
        return <Link to={`/news/${record.id}`}>{text}</Link>
      }
    }, {
      title: '二级标题',
      dataIndex: 'subtitle',
    }, {
      title: '封面',
      dataIndex: 'poster',
      render: (text, record, index) => {
        return <a href={text} target="_blank"><img src={text} height="50" /></a>
      }
    },{
      title: '时间',
      dataIndex: 'time',
      render: text => moment(text).format('YYYY-MM-DD')
    }, {
      title: '操作',
      render: (text, record, index) => {
        const { title, id, subtitle, time,  poster } = record
        return <>
          <a className="mr8" onClick={() => triggerEdit({ id, title, subtitle, time, poster })}>编辑</a>
          <a onClick={() => triggerDelete({ title, id })}>删除</a>
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