import jwt from "jsonwebtoken"

import { Request, Response, NextFunction } from "express"




export const verifyToken = async (req:any, res:Response, next:NextFunction) => {
    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
  
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]  
        
        jwt.verify(bearerToken, "secret", (err:any, authData:any) => {
          if( err ) {
            res.sendStatus(403)
          } else {
            req.userid = authData.userid
          }
        })
        next()
      } else {
        res.sendStatus(403)
      }
}