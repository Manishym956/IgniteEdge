import express from 'express';
import cookieparser from 'cookie-parser';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import employeeRouter from './routes/employeeRoutes.js';
import financeRoutes from './routes/finance.routes.js';
import profitLossRoutes from './routes/profitLossRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import automationRoutes from './routes/automationRoutes.js';
import expenseRoutes from './routes/expenseRoutes.js';
import departmentPerformanceRoutes from './routes/departmentPerformanceRoutes.js';
import projectTimeAllocationRoutes from './routes/projectTimeAllocationRoutes.js';
import kpiTrendRoutes from './routes/kpiTrendRoutes.js';
import geoDistributionRoutes from './routes/geoDistributionRoutes.js';
import reminderRoutes from './routes/reminderRoutes.js';
const app = express();
const port = process.env.PORT || 1600;
connectDB();



app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://ignite-edge.vercel.app', 'http://localhost:5173']  // Add your Vercel URL here
    : 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieparser());

//endpoints-ym
app.get('/', (req,res)=>res.send('API is running'));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/employees', employeeRouter);
app.use('/api/finance', financeRoutes);
app.use('/api/profitloss', profitLossRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/automations', automationRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/department-performance', departmentPerformanceRoutes);
app.use('/api/project-time-allocation', projectTimeAllocationRoutes);
app.use('/api/kpi-trends', kpiTrendRoutes);
app.use('/api/geo-distribution', geoDistributionRoutes);
app.use('/api/reminders', reminderRoutes);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "Server is running" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});