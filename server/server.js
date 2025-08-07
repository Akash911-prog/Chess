import express from 'express'
import cors from 'cors'
import user from './src/Routes/user.js'


const app = express()
app.use(cors())
app.use(express.json())


app.use('/api/users', user)

app.get('/', (req, res) => {
    res.send('The server is live')
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})