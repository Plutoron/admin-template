import React, { useState, useEffect, useCallback } from 'react'

import { Button, Input, Modal } from 'antd'

const { TextArea } = Input

const mock = '上海成事林业规划设计有限公司于2002年07月05日成立，公司经营范围包括：林业调查和规划、设计、监理和咨询，造林绿化，技术服务等上海成事林业规划设计有限公司于2002年07月05日成立，公司经营范围包括：林业调查和规划、设计、监理和咨询，造林绿化，技术服务等上海成事林业规划设计有限公司于2002年07月05日成立，公司经营范围包括：林业调查和规划、设计、监理和咨询，造林绿化，技术服务等上海成事林业规划设计有限公司于2002年07月05日成立，公司经营范围包括：林业调查和规划、设计、监理和咨询，造林绿化，技术服务等上海成事林业规划设计有限公司于2002年07月05日成立，公司经营范围包括：林业调查和规划、设计、监理和咨询，造林绿化，技术服务等'
  
function Intro() {
  const [intro, setIntro] = useState('')

  const update = useCallback(() => {
    Modal.confirm({
      title: '您确定要更新公司简介吗',
      onOk() {
        console.log(intro)
      }
    })
  }, [intro])

  useEffect(() => {
    setIntro(mock)
  }, [])

  return (
    <>
      <div>
        <div>公司简介</div>
        <div>
          <TextArea 
            style={{ width: 650, display: 'block'}} 
            value={intro} 
            rows={10}
            onChange={e => setIntro(e.target.value)} 
          />
          <Button className="mt8" onClick={update}>提交</Button>
        </div>
      </div>
    </>
  )
}

export default Intro