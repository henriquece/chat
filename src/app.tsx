import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './constants/routes'

const App = () => (
  <Switch>
    {Object.keys(routes).map((route) => {
      const { url, exact = false, page } = routes[route]

      return (
        <Route path={url} exact={exact}>
          {page}
        </Route>
      )
    })}
  </Switch>
)

export default App
