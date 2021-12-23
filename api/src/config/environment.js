require('dotenv').config()

export const env = {
   MONGODB_URI: process.env.MONGODB_URI,
   APP_HOST: process.env.APP_HOST,
   APP_PORT: process.env.APP_PORT,
   PASS_SECRET: process.env.PASS_SECRET,
   JWT_SECRET: process.env.JWT_SECRET,
   STRIPE_KEY: process.env.STRIPE_KEY,
  
}