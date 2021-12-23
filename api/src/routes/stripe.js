import express from "express";

const stripe = require('stripe')(process.env.STRIPE_KEY)

const router = express.Router()

router.post('/', (req,res) => {
   stripe.charges.create({
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'usd'
   },(stripeError, stripeRes) => {
      if(stripeError){
         res.status(500).json(stripeError)
      }else{
         res.status(200).json(stripeRes)
      }
   })
})



export default router