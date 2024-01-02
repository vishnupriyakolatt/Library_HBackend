const express=require('express')
const {userRegister,userLogin}=require('../controllers/userController')
const userRoutes=express.Router()


userRoutes.post('/register',userRegister)
userRoutes.post('/login',userLogin)
userRoutes.post('/login',userLogin)

module.exports =  userRoutes;