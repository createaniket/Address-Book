const express = require('express')
require('./DB/mongoose')
const app = express()
const Urouter = require('./Routers/userrouter')
const User = require('./Models/usermodel')
require('dotenv').config()
const port = process.env.PORT
const Crouter = require('./Routers/Contactrouter')
app.use(express.json())
app.use(Crouter)


app.use(Urouter)
const contact = require('./Models/Contacts')
app.listen(port, ()=> {
    console.log('port has been up at' + port)
})