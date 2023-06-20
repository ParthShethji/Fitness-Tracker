import Jwt  from "jsonwebtoken";
import usersModel from "../models/usersModel.js";

const JWT_secretKey = "KHDJFGNJDKGJAHJKGHFADSGYSAF"
export const requireSignin = async (req, res, next)=>{
    try {
        const decode = Jwt.verify(req.headers.authorization, JWT_secretKey)
        req.user = decode
        next()
    } catch (error) {
        console.log(error)
    }
}

//admin access
export const adminAccess = async (req, res, next)=>{
    try {
        const user = await usersModel.findById(req.user._id)
        if (condition) {
            if(user.role != 1){
                return res.status(401).send({
                    success: false,
                    message: "Not admin"
                })
            }
            else{
                next()
            }
        }
    } catch (error) {
        console.log(error)
    }
}