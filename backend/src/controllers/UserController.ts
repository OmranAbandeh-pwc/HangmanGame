import express, { Request, Response } from "express"
import jwt from "jsonwebtoken"
import User from "../models/UserModel"


// Login API Controller
export const loginController = async (req:Request, res:Response) => {
    const { email, password } = req.body

    const checkUser = await User.findOne({ email:email })

    if(checkUser){
        if(checkUser.password === password){
            jwt.sign({userid:checkUser._id}, "secret", (err: any, token: any) => {
                res.json({
                    token,
                    msg:'success'
                })
            })
        } else {
            res.status(400).json({msg: "wrong-password"})
        }
    } else {
        res.status(404).json({ msg : " user-not-found"})
    }
}


// Signup API Controller
export const signupControler = async (req:Request, res:Response) => {
    const { name, email, password, conf_password } = req.body;

    const checkEmail = await User.findOne({ email: email})

    if(checkEmail){
        res.status(400).json({ msg: "email-exist" })
    } else {
        if(password.length < 4 || conf_password.length < 4){
            res.status(400).json({ msg: "shortPassword" })
        }
        else if(password !== conf_password){
            res.status(400).json({ msg : "notMatched"})
        } else {
            const createNewEmail = await User.create({ name:name, email:email, password:password })
            res.status(200).json({createNewEmail:createNewEmail, msg: "success"})
        }
    }
}