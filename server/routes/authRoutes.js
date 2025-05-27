import express from 'express';
import { isAuthenticated, login,logout,register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail, getUserSettings, updateUserSettings } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
const authRouter=express.Router();
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/logout',logout);
authRouter.post('/send-verify-otp',sendVerifyOtp);
authRouter.post('/verify-account',verifyEmail)
authRouter.post('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);

authRouter.get('/settings', userAuth, getUserSettings);
authRouter.post('/settings', userAuth, updateUserSettings);

export default authRouter;