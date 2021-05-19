const http = require('http')
const express = require('express')

const cors = require('./config/cors')
const websocket = require('./config/websocket')
const routes = require('./routes')

const PORT = process.env.PORT || 3333

const app = express()
const server = http.createServer(app)

websocket(server)
app.use(cors)
app.use(express.json())
app.use(routes)

server.listen(PORT, () => console.log('Server listening on port ' + PORT))
