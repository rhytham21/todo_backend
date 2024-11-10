const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRoutes');
const connectDB = require('./utils/database');

app.use(cors());

app.use(express.json());

connectDB();

const port = 4001;

app.use('/task', taskRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});