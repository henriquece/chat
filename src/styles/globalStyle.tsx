import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  html, #root { 
    height: 100%;
  }
  
  body {
    height: 100%;
    margin: 0;
    font-family: 'Lato', sans-serif;
  }

  input, button {
    font-family: 'Lato', sans-serif;
  }
`

export default GlobalStyle
