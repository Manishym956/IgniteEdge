import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';



export const register=async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        return res.json({success:false,message:'Missing Details'})
    }
    try{
        const existingUser=await userModel.findOne({email})
        if(existingUser){
            return res.json({success:false,message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        // Generate OTP
        const otp=String(Math.floor(100000+Math.random()*900000));
        const otpExpireAt=Date.now()+5*60*1000; // 5 minutes
        const user=new userModel({
            name,
            email,
            password:hashedPassword,
            isAccountVerified:false,
            verifyOtp:otp,
            verifyOtpExpireAt:otpExpireAt
        })
        await user.save();
        // Send OTP email
        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Verify your account',
            text: `Hello ${name},\n\nYour OTP for account verification is ${otp}. It is valid for 5 minutes only.\n\nBest regards,\nThe IgniteEdge Team`,
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"User registered. OTP sent to email.",user:{_id:user._id,name:user.name,email:user.email}})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export const login=async(req,res)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return res.json({success:false,message:'Email and password both arerequired'})
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.json({success:false,message:"Invalid Credentials"});
        }
        const token =jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});
        res.cookie('token',token, {httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'strict',maxAge:7*24*60*60*1000});
        return res.json({success:true,message:"Login successful",user:{name:user.name,email:user.email}})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}
export  const logout=async(req,res)=>{
    try{
        res.clearCookie('token', {httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:process.env.NODE_ENV==='production'?'none':'strict'});
        return res.json({success:true,message:"Logout successful"})
    }catch(error){
        res.json({success:false,message:error.message})
    }
}

export const sendVerifyOtp=async(req,res)=>{
    try{
        const {userId}=req.body;
        const user=await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({success:false,message:"Account already verified"});
        }
        
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.verifyOtp=otp;
        user.verifyOtpExpireAt=Date.now()+5*60*1000; // 5 minutes
        await user.save();
        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Verify your account',
            text:`Your OTP for account verification is ${otp}. It is valid for 5 minutes only.`
        }
        await transporter.sendMail(mailOptions);
        res.json({success:true,message:"OTP sent successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
} 

export const verifyEmail=async(req,res)=>{
    const {userId,otp}=req.body;
    if(!userId||!otp){
        return res.json({success:false,message:"Missing details"})
    }
    try{
        const user=await userModel.findById(userId);
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        if(user.verifyOtp===''|| user.verifyOtp!==otp){
            return res.json({success:false,message:"Invalid OTP"});
        }
        if(user.verifyOtpExpireAt<Date.now()){
            return res.json({success:false,message:"OTP expired"});
        }
        user.isAccountVerified=true;
        user.verifyOtp='';
        user.verifyOtpExpireAt=0;
        await user.save();
        // Send welcome email after verification
        const mailOptions={
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Welcome to IgniteEdge',
            text: `Hello ${user.name},\n\nThank you for verifying your email and registering with IgniteEdge! We are excited to have you on board.\n\nBest regards,\nThe IgniteEdge Team`,
        }
        await transporter.sendMail(mailOptions);
        return res.json({success:true,message:"Account verified successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
export const isAuthenticated=async(req,res)=>{
    try{
        return res.json({success:true});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const sendResetOtp=async(req,res)=>{
    const {email}=req.body;
    if(!email){
        return res.json({success:false,message:"Email is required"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        const otp=String(Math.floor(100000+Math.random()*900000));
        user.resetOtp=otp;
        user.resetOtpExpireAt=Date.now()+5*60*1000; // 5 minutes
        await user.save();
        const mailOptions={
            from:process.env.SENDER_EMAIL,
            to:user.email,
            subject:'Reset your password',
            text:`Your OTP for password reset is ${otp}. It is valid for 5 minutes only.`
        }
        await transporter.sendMail(mailOptions);
        res.json({success:true,message:"OTP sent successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
//reset password
export const resetPassword=async(req,res)=>{
    const {email,otp,newPassword}=req.body;
    if(!email||!otp||!newPassword){
        return res.json({success:false,message:"Email, OTP and password are required"});
    }
    try{
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User not found"});
        }
        if(user.resetOtp===''|| user.resetOtp!==otp){
            return res.json({success:false,message:"Invalid OTP"});   
        }
        if(user.resetOtpExpireAt<Date.now()){
            return res.json({success:false,message:"OTP expired"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;
        await user.save();
        return res.json({success:true,message:"Password reset successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}
