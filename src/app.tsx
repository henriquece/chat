import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from './constants/routes'
import isMobile from './utils/device'
import PageContext from './contexts/pageContext'

const App = () => (
  <PageContext.Provider value={{ isMobile: isMobile() }}>
    <Switch>
      {Object.keys(routes).map((route) => {
        const { name, url, exact = false, page } = routes[route]

        return (
          <Route key={name} path={url} exact={exact}>
            {page}
          </Route>
        )
      })}
    </Switch>
  </PageContext.Provider>
)

export default App
