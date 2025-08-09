import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'

import { socketInitialize } from './src/Sockets/index.js'
//routes
import user from './src/Routes/user.js'
import challenge from './src/Routes/challenge.js'


const app = express()
app.use(cors())
app.use(express.json())
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
})

socketInitialize(io)


app.use('/api/user', user)
app.use('/api/challenge', challenge)

app.get('/', (req, res) => {
    res.send('The server is live')
})

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})