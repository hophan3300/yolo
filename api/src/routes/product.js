import express from "express"

import { verifyTokenAndAdmin} from "./verifyToken"

import Product from '../models/productModel'

const router = express.Router()

// CREATE PRODUCT
router.post('/', verifyTokenAndAdmin, async (req, res) => {
   const newProduct = new Product(req.body)
   try {
      const product = await newProduct.save()
      res.status(200).json(product)
   } catch (error) {
      res.status(500).json(error)
   }
})

// UPDATE PRODUCT
router.put('/:id', verifyTokenAndAdmin, async (req, res) => {
  try {
   const updateProduct = await Product.findByIdAndUpdate(req.params.id,{
      $set: req.body
   },{new: true})
   res.status(200).json(updateProduct)
  } catch (error) {
     res.status(500).json(error)
  }
})

// DELETE PRODUCT
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      await Product.findByIdAndDelete(req.params.id)
      res.status(200).json('deleted product')
   } catch (error) {
      res.status(500).json(error)
   }
})

// GET 1 PRODUCT
router.get('/find/:id', async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      res.status(200).json(product)
   } catch (error) {
      res.status(500).json(error)
   }
})

//GET ALL PRODUCT 
router.get('/', async (req, res) => {
   const qNew = req.query.new
   const qCategory = req.query.category
   let products
   try {
      if(qNew){
         products = await Product.find().sort({createdAt: -1})
      }else if (qCategory){
         products = await Product.find({
            categorySlug : {$in: [qCategory]}
         })
      }else{
         products = await Product.find()
      }
      res.status(200).json(products)
   } catch (error) {
      res.status(500).json(error)
   }
})


export default router