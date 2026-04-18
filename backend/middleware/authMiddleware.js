import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/User.js'

const protect = asyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token=req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decode.id).select("~password");
            if(!req.user){
                res.status(401);
                throw new Error('User not Found');
            }
            next();
        }catch(error){
            console.error(error);
            res.status(401);
            throw new Error("Not authorised,token failed");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorised,no token");
    }
})

export {protect};