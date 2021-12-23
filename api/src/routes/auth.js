import express from "express"
import CryptoJS from "crypto-js"
import jwt from 'jsonwebtoken'

import User from '../models/userModel'
import { env } from "../config/environment"

const router = express.Router()

// register
router.post('/register', async (req, res) => {
   const newUser = new User({
      username: req.body.username,
      password: CryptoJS.AES.encrypt(req.body.password,env.PASS_SECRET).toString(),
      email: req.body.email,
   })

   try {
      const saveUser = await newUser.save()        // ham save() dc goi se cap nhat truong updatedAt
      res.status(201).json(saveUser)      
   } catch (error) {
      res.status(500).json(error)
   }
})

// login
router.post('/login', async (req, res) => {
   try {
      const user = await User.findOne({username: req.body.username})
      if(user){
         const hashedPassword = CryptoJS.AES.decrypt(user.password, env.PASS_SECRET)
         const originPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
         if( originPassword === req.body.password){
            const accessToken = jwt.sign(
               {
                  id: user._id,
                  isAdmin: user.isAdmin
               }, 
               env.JWT_SECRET,
               {expiresIn: "3d"}
            )

            const {password, ...others} = user._doc
            res.status(200).json({...others, accessToken})
         }else{
            res.status(401).json('wrong password')
         }
      }else{
         res.status(401).json('wrong username')
      }      
   } catch (error) {
      res.status(500).json(error)
   }
})

export default router