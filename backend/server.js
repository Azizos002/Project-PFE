const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = 5000;

const DataBase = process.env.DATABASE_URI;
const userRoutes = require('./Routes/usersRoute');
const  authRoutes = require('./Routes/authRoute');


app.use(express.json());
app.use(cors());

//connection to MongoDB
mongoose.connect(DataBase)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('Error Connecting to MongoDB ', err);
    });

// Use Routes 
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.listen(PORT, () => {
    console.log('Server Started on ', PORT)
})