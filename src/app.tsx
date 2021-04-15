import React, { Suspense, lazy } from 'react'
import { Switch, Route } from 'react-router-dom'
import isMobile from './utils/device'
import PageContext from './contexts/pageContext'
import routesPath from './constants/routesPath'
import Home from './pages/home'
import Signup from './pages/signup'
import Loading from './pages/loading'

const Chat = lazy(() => import('./pages/chat'))

const App = () => (
  <PageContext.Provider value={{ isMobile: isMobile() }}>
    <Switch>
      <Suspense fallback={<Loading />}>
        <Route path={routesPath.home} exact component={Home} />
        <Route path={routesPath.signup} exact component={Signup} />
        <Route path={routesPath.chat} exact component={Chat} />
      </Suspense>
    </Switch>
  </PageContext.Provider>
)

export default App
