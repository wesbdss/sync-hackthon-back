const ws = require('ws')

const conn = []

let wss

const websocket = server => {
  wss = new ws.Server({ server })

  wss.on('connection', (ws, lul) => {
    conn.push(ws)

    ws.on('message', message => {
      message = JSON.parse(message)

      conn.forEach(user => {
        user.send(JSON.stringify(message))
      })
    })
  })
}

module.exports = websocket
