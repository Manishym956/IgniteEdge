import express from 'express';
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail, getUserSettings, updateUserSettings, changePassword, getTeamRoles, addTeamRole, removeTeamRole } from '../controllers/authController.js';
import userAuth from '../middleware/userAuth.js';
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/logout', logout);
authRouter.post('/send-verify-otp', sendVerifyOtp);
authRouter.post('/verify-account', verifyEmail);
authRouter.post('/is-auth', userAuth, isAuthenticated);
authRouter.post('/send-reset-otp', sendResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.post('/change-password', userAuth, changePassword);

authRouter.get('/settings', userAuth, getUserSettings);
authRouter.post('/settings', userAuth, updateUserSettings);

authRouter.get('/team-roles', userAuth, getTeamRoles);
authRouter.post('/add-team-role', userAuth, addTeamRole);
authRouter.delete('/team-role/:roleId', userAuth, removeTeamRole);

export default authRouter;