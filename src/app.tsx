import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import Layout from './layout/layout'
import routes from '@src/routes'

const renderRouter = (data) => {
  const renderItem = ({ path, Node }) => {
    return (<Route path={path} key={path} exact>
        { <Node /> }
      </Route>)
  }

  return data.map(({ path, component: Node, redirect, routes }) => {
    if (redirect) {
      return <Redirect key={path} to={path} />
    }
    
    if (routes) {
      return [
        renderItem({ path, Node }),
        ...renderRouter(routes)
      ]
    }

    return (
      renderItem({ path, Node })
    )
  })
}

const Routers = () => {
  return (
    <>
      <Switch>
        {
          renderRouter(routes)
        }
      </Switch>
    </>
  )
}

export default function App() {
  return (
    <Router>
      <Layout>
        <Routers />
      </Layout>
    </Router>
  )
}
