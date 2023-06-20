import { compare, hashPasswod } from "../helper/authHelper.js";
import usersModel from "../models/usersModel.js";
import users from "../models/usersModel.js";
import JWT from "jsonwebtoken";

// Registration
export const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) {
            return res.send({ message: 'name is required' })
        }
        if (!email) {
            return res.send({ message: 'name is required' })
        }
        if (!password) {
            return res.send({ message: 'name is required' })
        }

        //  check for existing user
        const existinguser = await users.findOne({ email })
        if (existinguser) {
            return res.status(200).send({
                success: true,
                message: 'already registered please login'
            })
        }

        // register new user
        const hashedPassword = await hashPasswod(password)
        const user = await new usersModel({
            name,
            email,
            password: hashedPassword
        }).save()
        res.status(200).send({
            success: true,
            message: 'Registered successfully',
            user,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in registration ',
            error
        })
    }
}


// Login
const JWT_secretKey = "KHDJFGNJDKGJAHJKGHFADSGYSAF" //any random text
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validation
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                error: 'Invalid email or Password'
            })
        }
        // compare
        const user = await usersModel.findOne({ email })
        if (!user) {
            return res.status(400).send({
                success: false,
                error: 'User not registered'
            })
        }
        const match = await compare(password, user.password)
        if (!match) {
            res.status(200).send({
                success: false,
                message: 'Wrong Password'
            })
        }
        // token
        const token = await JWT.sign({_id: user.id}, JWT_secretKey, {
            expiresIn: "7d"
        })
        res.status(200).send({
            success: true, 
            message: "Login successfully",
            user:{
                name: user.name
            }, token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in Login ',
            error
        })
    }
}

// test
export const testController= async (req, res)=>{
    res.send("Protected Route")
}
