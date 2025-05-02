require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

server.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
