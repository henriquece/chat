const path = require('path')
const express = require('express')

const server = express()

server.use(express.static(path.join(__dirname, 'dist')))

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

server.listen(3000)