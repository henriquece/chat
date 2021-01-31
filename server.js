const path = require('path')
const fs = require('fs')
const express = require('express')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { ServerStyleSheet } = require('styled-components')

const { default: HomePage } = require('./src/pages/home/home')

const server = express()

server.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

server.get('/', (req, res) => {
  const sheet = new ServerStyleSheet()

  let homeHTML = ''

  try {
    const html = ReactDOMServer.renderToString(
      sheet.collectStyles(React.createElement(HomePage, {}, null))
    )

    const styleTags = sheet.getStyleTags()

    const indexHTML = fs.readFileSync(
      path.resolve(__dirname, './dist/index.html'),
      {
        encoding: 'utf8',
      }
    )

    homeHTML = indexHTML
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
      .replace('</head>', `${styleTags}</head>`)
  } catch (error) {
    console.error(error)
  } finally {
    sheet.seal()
  }

  res.status(200).send(homeHTML)
})

server.listen(process.env.PORT || 8080, '0.0.0.0', () => {
  console.log('Running')
})
