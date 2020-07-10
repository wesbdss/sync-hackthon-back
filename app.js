const express = require('express')
const index = require('./routes/index')
const users = require('./routes/users')
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


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))