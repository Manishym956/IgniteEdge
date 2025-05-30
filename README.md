# IgniteEdge  
A full-stack web application for project management and business analytics.  
Project is deployed in this link: [IgniteEdge](https://igniteedge.netlify.app/)
## Overview  
IgniteEdge is a comprehensive business management platform that combines project management capabilities with advanced analytics and financial tracking features.  

## Tech Stack  

### Frontend  
- React + Vite  
- CSS for styling  

#### Libraries:  
- `react-router-dom` (navigation)  
- `axios` (API calls)  
- `react-modal`  
- `react-beautiful-dnd`  
- `lucide-react` (icons)  

### Backend  
- Node.js  
- Express.js  
- MongoDB with Mongoose  

#### Key Dependencies:  
- `bcrypt` / `bcryptjs` (authentication)  
- `jsonwebtoken` (JWT)  
- `nodemailer` (email functionality)  
- `cors`  
- `dotenv`  

## Key Features  

### User Authentication  
- Email verification system  
- OTP-based verification  
- Welcome email functionality  

### Project Management  
- Project creation and management  
- Team member invitation system  
- Custom project status management  
- Email notifications for project invites  

### Dashboard Features  
- Revenue tracking  
- Profit/Loss analysis  
- Expense monitoring  
- Department performance metrics  
- Project time allocation  
- KPI trends  
- Geographical distribution analysis  
- Reminder system  

### Employee Management  
- Employee listing  
- PDF export functionality  
- Employee data management  

### Analytics & Reporting  
- Custom dashboards  
- Financial KPIs  
- Data export capabilities  

## Project Structure  

### Getting Started  
#### Install dependencies:  
```sh
cd IgniteEdge
cd IgniteEdge
npm install
npm run dev

In another terminal:
cd IgniteEdge
cd server
npm install
npm run server
