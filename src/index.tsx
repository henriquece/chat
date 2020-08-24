import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import GlobalStyle from './styles/globalStyle'
import App from './app'
import configureChatStore from './store/chatStore'

configureChatStore()

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <App />
  </BrowserRouter>,
  document.querySelector('#root')
)
