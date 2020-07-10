const express = require('express')
const index = require('./routes/index')
const users = require('./routes/users')
const http = require('http')
const websocket = require('ws')
// var mongo = require('mongodb')
const app = express()
const port = process.env.PORT || 3000


app.use(express.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.type('application/json')
    next();
});
// index

app.get('/', index)

// lista de usuários

app.get('/users/', users.listausuarios)

// usuário específico

app.get('/users/:id', users.usuario)

//deleta o banco
app.get('/users/delete', users.erase)

// registro de usuário

app.post('/users/register', users.registro)

//login de usuários

app.post('/users/login', users.login)

// post atualiza informações de usuário

app.post('/users/:id', users.atualiza)

//WebSocket chat

// para iniciar com nome 
//{'name':'Wesley','data':'meu amigo'}


const server = http.createServer(app);
const wss = new websocket.Server({ server });

var conn = []

//broadcast messages
wss.on('connection', (ws) => {
    ws.send("Conectado", ws);
    conn.push(ws)
    ws.on('message',(message) =>{
        message = JSON.parse(message)
        conn.forEach((cone) => {
            cone.send(JSON.stringify(message))
        });
        console.log(message['name']," mandou '"+message['data']+"'")
        
    })
})

server.listen(port, () => {console.log(`Server Socket on port ${server.address().port} :)`);});