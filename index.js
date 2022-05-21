
const express = require('express')
const path = require('path')
const videos = require('./videos')

const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`escuchando en: ${PORT}`)
})

app.use('/api', videos)
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('*', (req, res) => {
  res.status(404).send('<h1> 404 not found</h1>')
})