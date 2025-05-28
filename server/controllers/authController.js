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
        const hashedPassword=await bcrypt.hash(newPassword,10);
        user.password=hashedPassword;
        user.resetOtp='';
        user.resetOtpExpireAt=0;
        await user.save();
        return res.json({success:true,message:"Password reset successfully"});
    }catch(error){
        res.json({success:false,message:error.message});
    }
}

export const getUserSettings = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('settings name email');
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.json({ success: true, settings: user.settings, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserSettings = async (req, res) => {
    try {
        const { settings, name, email } = req.body;
        const user = await userModel.findById(req.user.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        if (settings) user.settings = { ...user.settings, ...settings };
        if (name) user.name = name;
        if (email) user.email = email;
        await user.save();
        res.json({ success: true, settings: user.settings, name: user.name, email: user.email });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    // Get user from database
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password in database
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('Password change error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Team Roles Management
export const getTeamRoles = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    
    // Get all users with their roles
    const teamRoles = await userModel.find(
      { role: { $exists: true } },
      { email: 1, role: 1, _id: 1 }
    );
    
    res.json({ success: true, roles: teamRoles });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addTeamRole = async (req, res) => {
  try {
    const { email, designation } = req.body;
    
    // Validate role designation
    const validRoles = ['teamLead', 'projectManager', 'hr'];
    if (!validRoles.includes(designation)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid role designation' 
      });
    }

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Update user's role
    user.role = designation;
    await user.save();

    res.json({ success: true, message: 'Role updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeTeamRole = async (req, res) => {
  try {
    const { roleId } = req.params;
    
    const user = await userModel.findById(roleId);
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Remove role
    user.role = undefined;
    await user.save();

    // Send email notification
    try {
      await sendMail({
        to: user.email,
        subject: 'Your Role Has Been Removed',
        text: 'Your role has been removed from the system.',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">Role Removal Notification</h2>
            <p>Hello,</p>
            <p>Your role has been removed from the system.</p>
            <p>If you believe this is an error, please contact your administrator.</p>
            <p>Best regards,<br>The IgniteEdge Team</p>
          </div>
        `
      });
    } catch (mailErr) {
      console.error('Failed to send role removal email:', mailErr);
    }

    res.json({ success: true, message: 'Role removed successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
