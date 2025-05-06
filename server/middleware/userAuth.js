import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();
const userAuth=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.status(401).json({success:false,message:'Unauthorized'});
    }
    try{
        const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode.id){
            req.body.userId=tokenDecode.id;
        }else{
            return res.json({success:false,message:'Unauthorized'});
        }
        next();
    }catch(error){
        return res.status(401).json({success:false,message:'Unauthorized'});
    }
}
export default userAuth;