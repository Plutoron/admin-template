import React from 'react'
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom"

import Layout from './layout/layout'
import routes from '@src/routes'

const Routers = () => {
  return (
    <>
      <Switch>
        {
          routes.map(({ path, component: Node, redirect }) => {
            if (redirect) {
              return <Redirect key={path} to={path} />
            }
            return (
              <Route path={path} key={path}>
                { <Node /> }
              </Route>
            )
          })
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
