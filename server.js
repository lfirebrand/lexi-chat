const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')
const app = express()

// init chatkit
const chatkit = new Chatkit.default({
    instanceLocator: 'v1:us1:4b9e2a65-cee7-400a-86df-f8d0c4aa019b',
    key: '95f6fd7c-5257-4dc6-a9f4-aa7a295053bd:HvuA3NelTIaIQkcAdej/ir2kw5FffA464X+4qCIMPYU=',
})
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

// create users
app.post('/users', (req, res) => {
    const {
        username
    } = req.body
    console.log(username);
    chatkit
        .createUser({
            id: username,
            name: username
        })
        .then(() => res.sendStatus(201))
        .catch(error => {
            if (error.error_type === 'services/chatkit/user_already_exists') {
                res.sendStatus(200)
            } else {
                res.status(error.status).json(error)
            }
        })
})
const PORT = 3001
app.listen(PORT, err => {
    if (err) {
        console.error(err)
    } else {
        console.log(`Running on port ${PORT}`)
    }
})