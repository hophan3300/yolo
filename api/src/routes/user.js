import express from "express"
import CryptoJS from 'crypto-js'

import {verifyTokenAndAuthozrization, verifyTokenAndAdmin} from "./verifyToken"
import {env} from '../config/environment'
import User from "../models/userModel"

const router = express.Router()

//GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   const query = req.query.new                   
   try {
      const users = query ? await User.find().sort({_id: -1}).limit(3): await User.find()
      res.status(200).json(users)   // neu co /?new=true thi tra ve 3 user moi nhat, 
                                    // neu k co ham sort({_id:-1}) tra ve 3 user dau tien
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET 1 USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      const user = await User.findById(req.params.id)
      const {password, ...other} = user._doc
      res.status(200).json(other)
   } catch (error) {
      res.status(500).json(error)
   }
})

//UPDATE
router.put('/:id', verifyTokenAndAuthozrization, async (req, res) => {
   if(req.body.password){
      req.body.password = CryptoJS.AES.encrypt(req.body.password, env.PASS_SECRET).toString()
   }
   try{
      const updatedUser = await User.findByIdAndUpdate(req.params.id,{
         $set: req.body
      },{new:true})
      res.status(200).json(updatedUser)
   }catch (error){
      res.status(500).json(error)
   }
})

//DELETE
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json('deleted user')
   } catch (error) {
      res.status(500).json(error)
   }
})


//GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
   const date = new Date()
   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
   try {
      const data = await User.aggregate([
         { $match: {createdAt: { $gte : lastYear }}},
         {
            $project: {
               month: { $month: "$createdAt"}
            }
         },
         {
            $group: {
               _id: "$month",
               total: {$sum: 1}
            }
         }
      ])
      res.status(200).json(data)
   } catch (error) {
      res.status(500).json(error)
   }
})

export default router