const express = require('express')
const bcrypt = require('bcrypt')
const Auth = require('../Auth/Auth')
const Urouter = new express.Router()
const User = require('../Models/usermodel')
// Routes for Creating an User
Urouter.post('/user', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(req.body)
    }catch(e){
        res.status(400).send(e)
    }
})
//route for User Login
Urouter.post('/user/login',  async (req, res) => {
 try {
        const user = await User.findByCredetentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }catch(e){
        res.status(400).send(e)
    }
})
//Route for reading User details
Urouter.get('/user/me',Auth, async (req, res) => {
    res.send(req.user)
})
//routes for User Logout
Urouter.post('/user/logout',Auth, async (req, res) =>{
    try {
        req.user.tokens = []
         await req.user.save()
        res.send('Logout  succesfully')
    }catch (e){
        res.status(500).send(e)
    }
 })
module.exports = Urouter