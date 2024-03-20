const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const UserModel = require('./models/User');
require('dotenv').config();

const app = express();
const PORT = 5000;

const DataBase = process.env.DATABASE_URI;
//connection to MongoDB
mongoose.connect(DataBase)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('Error Connecting to MongoDB ', err);
    });

app.use(express.json());
app.use(cors());

const userRoutes = require('./Routes/usersRoute');
const authRoutes = require('./Routes/authRoute');
const passwordResetRoutes = require('./Routes/passwordResetRoute');
const contactSubmit = require('./Routes/contactRoute');

// Use Routes 
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/forgot', passwordResetRoutes);
app.use('/contact', contactSubmit);

app.listen(PORT, () => {
    console.log(`Server started on ${new Date().toLocaleString()} at http://localhost:${PORT}`);
})