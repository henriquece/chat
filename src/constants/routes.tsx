import React from 'react'
import routesPath from './routesPath'
import Home from '../pages/home/home'
import Signup from '../pages/signup/signup'
import Chat from '../pages/chat/chat'

const routes = {
  home: {
    name: 'home',
    url: routesPath.home,
    exact: true,
    page: <Home />,
  },
  signup: {
    name: 'signup',
    url: routesPath.signup,
    exact: true,
    page: <Signup />,
  },
  chat: {
    name: 'chat',
    url: routesPath.chat,
    exact: true,
    page: <Chat />,
  },
  error: {
    name: 'error',
    url: routesPath.error,
    page: <div>Error</div>,
  },
}

export default routes
