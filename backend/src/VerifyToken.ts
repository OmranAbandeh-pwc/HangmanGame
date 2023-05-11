import jwt from "jsonwebtoken"

import {  Response, NextFunction } from "express"

import RequestWithUserRole from "./types/index"


export const verifyToken = async (req:RequestWithUserRole, res:Response, next:NextFunction) => {
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
