import express from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
const app = express();
const port = process.env.PORT || 1600;
connectDB();

app.use(cors());

app.use(express.json());
app.use(cookieparser());
//endpoints-ym
app.get('/', (req,res)=>res.send('API is running'));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});