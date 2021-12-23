import express from "express"

import { verifyToken, verifyTokenAndAuthozrization, verifyTokenAndAdmin} from "./verifyToken"
import Cart from '../models/cartModel'

const router = express.Router()

// CREATE CART
router.post('/', verifyToken, async (req, res) => {
   const newCart = await new Cart(req.body)
   try {
      const cart = await newCart.save()
      res.status(200).json(cart)
   } catch (error) {
      res.status(500).json(error)
   }
} )

// UPDATE CART
router.put('/:id', verifyTokenAndAuthozrization, async (req, res) => {
   try {
      const cart = await Cart.findByIdAndUpdate(req.params.id,{
         $set: req.body
      }, {new: true})
      res.status(200).json(cart)
   } catch (error) {
      res.status(500).json(error)
   }
})

// DELETE CART
router.delete('/:id', verifyTokenAndAuthozrization, async (req,res) => {
   try {
      await Cart.findByIdAndDelete(req.params.id)
      res.status(200).json('deleted cart')
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET USER CART
router.get('/find/:userId', verifyTokenAndAuthozrization, async (req,res) => {
   try {
      const cart = await Cart.findOne({userId: req.params.userId})
      res.status(200).json(cart)
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET ALL CART
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   try {
      const carts = await Cart.find()
      res.status(200).json(carts)
   } catch (error) {
      res.status(500).json(error)
   }
})

export default router