import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import {env} from './config/environment'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import productRouter from './routes/product'
import cartRouter from './routes/cart'
import orderRouter from './routes/order'
import stripeRouter from './routes/stripe'


const app = express()

mongoose.connect(env.MONGODB_URI)
   .then(console.log('connect db success'))
   .catch((e) => console.log(e))

app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/products', productRouter)
app.use('carts', cartRouter)
app.use('/orders', orderRouter)
app.use('/stripe',stripeRouter)


app.listen(env.APP_PORT, ()=> {
   console.log('Server is running')
})