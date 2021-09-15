import React, { useState, useCallback, useEffect } from 'react'
import { useHistory } from 'react-router'

import { clearAllCookie } from '@util/util'
import { get } from '@util/http'

const Userinfo: React.FC = () => {
  const history = useHistory()
  const [ name, setName ] = useState('')

  const logout = () => {
    clearAllCookie()
    window.user = null
    history.replace('/login')
  }

  const getData = useCallback(async () => {
    try {
      const res = await get('user/info')
      console.log(res)
      setName(res.username)
      window.user = res
    } catch (e) {
      console.log(e)
    }
  }, [])

  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <span>{ name }</span>
      <a className="ml8" onClick={logout}>退出登录</a>
    </>
  )
}

export default Userinfo