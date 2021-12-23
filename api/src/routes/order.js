import express from "express"

import { verifyToken, verifyTokenAndAuthozrization, verifyTokenAndAdmin} from "./verifyToken"
import Order from '../models/orderModel'

const router = express.Router()

// CREATE ORDER
router.post('/', verifyToken, async (req, res) => {
   const newOrder = new Order(req.body)
   try {
      const order = await newOrder.save()
      res.status(200).json(order)
   } catch (error) {
      res.status(500).json(error)
   }
})

// UPDATE ORDER 
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      const order = await Order.findByIdAndUpdate(req.params.id,{
         $set: req.body
      }, {new: true})
      res.status(200).json(order)
   } catch (error) {
      res.status(500).json(error)
   }
})

//DELETE ORDER 
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      await Order.findByIdAndDelete(req.params.id)
      res.status(200).json('deleted order')
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET USER ORDER
router.get('/find/:userId', verifyTokenAndAdmin, async (req, res) => {
   try {
      const orders = await Order.find({userId: req.params.userId})
      res.status(200).json(orders)
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET ALL ORDER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const orders = await Order.find()
      res.status(200).json(orders)
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET MONTHLY INCOME
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
   const date = new Date()
   const prevMonth = new Date(date.setMonth(date.getMonth() -2))
   try {
      const data = await Order.aggregate([
         { $match: {createdAt: { $gte: prevMonth } } },
         {
            $project: {
               month: {$month: '$createdAt'},
               sales: '$amount'
            }
         },
         {
            $group: {
               _id: "$month",
               total: {$sum: "$sales"}
            }
         }
      ])
      res.status(200).json(data)
   } catch (error) {
      res.status(500).json(error)
   }
})


export default router