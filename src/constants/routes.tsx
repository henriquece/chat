import React from 'react'

const routes = {
  home: {
    url: '/',
    exact: true,
    page: <div>Home</div>,
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
