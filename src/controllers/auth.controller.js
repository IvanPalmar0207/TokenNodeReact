//User Model
import user from "../models/user.model.js";
//Json Web Token
import { createAccesToken } from "../libs/jwt.js";
//Hash
import bcryptjs from "bcryptjs"
//JWT
import jwt from 'jsonwebtoken'
//Secret Key
import TOKEN_SECRET from "../config.js";

export const register = async (req, res) => {
    const {username, email, password} = req.body;    
    
    try{

        const userFound = await user.findOne({
            where :{
                email : email}
            })

        if(userFound) return res.status(400).json(['The email already exist'])        
        
        //hash password with 10 character        
        const hashPassword = await bcryptjs.hash(password, 8)

        const newUser =  new user({
                username,
                email,
                password : hashPassword
            }
        )

        const saveUser = await newUser.save()
        
        const token = await createAccesToken({id : saveUser.id})

        res.cookie('token', token)

        res.json({
            id : saveUser.id,
            username : saveUser.username,
            email : saveUser.email
        });
        
    }catch(err){
        res.status(500).json({message: err.message})
    }    
}

export const login = async (req, res) => {

    const {email, password} = req.body;    
    
    try{
        
        const userFound = await user.findOne(
            {
                where : {
                    email
                },
            }
        )            

        if(!userFound) return res.status(404).json('User not found')
                
        //Compare passwords
        const isMatched = await bcryptjs.compare(password, userFound.password)

        if(!isMatched) return res.status(400).json('Password mismatch')        
            
        const token = await createAccesToken({id : userFound.id})

        res.cookie('token', token)

        res.json({
            id : userFound.id,
            username : userFound.username,
            email : userFound.email
        });
        
    }catch(err){
        res.status(500).json({message: err.message})
    }  
}

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires : new Date(0)
    })
    res.sendStatus(200)
}

export const profile = async (req, res) => {
    
    const userFound = await user.findByPk(req.user.id)

    if(!userFound) return res.status(404).json({message : 'User not found'})
    
    return res.json({        
        id : userFound.id,
        username : userFound.username,
        email : userFound.email        
    })    
}

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message : 'Token Not Found'})

    jwt.verify(token, TOKEN_SECRET, async (err, User) => {
        if(err) return res.status(401).json({message : 'Token Not Found'})
            
        const userFound = await user.findByPk(User.id)

        if(!userFound) return res.status(401).json({message : 'Unauthorized'})

        return res.json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email
        })

    })
}