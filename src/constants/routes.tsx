import React from 'react'
import Home from '../pages/home/home'

const routes = {
  home: {
    url: '/',
    exact: true,
    page: <Home />,
  },
  chat: {
    url: '/chat',
    exact: true,
    page: <div>Chat</div>,
  },
  error: {
    url: '/',
    page: <div>Error</div>,
  },
}

export default routes
