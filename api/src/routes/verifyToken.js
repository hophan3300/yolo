import jwt from 'jsonwebtoken'

import { env } from '../config/environment'

export const verifyToken = (req, res, next) => {
   const authHeader = req.headers.token 
   if(authHeader){
      jwt.verify(authHeader, env.JWT_SECRET, (err, user) => {
         if(err) res.status(403).json('token is not valid')
         req.user = user
         next()
      })
   }else{
      return res.status(401).json('not authenticated')
   }
}

export const verifyTokenAndAuthozrization = (req, res, next) => {
   verifyToken(req, res, () => {
      if(req.user.id === req.params.id || req.user.isAdmin){
         next()
      }else{
         res.status(403).json('you are not allowed to do that')
      }
   })
}

export const verifyTokenAndAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if(req.user.isAdmin){
         next()
      }else{
         res.status(403).json('you are not allowed to do that')
      }
   })
}
