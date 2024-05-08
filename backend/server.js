const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const DataBase = process.env.DATABASE_URI;

mongoose
        .connect(DataBase)
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('Error Connecting to MongoDB ', err);
    });

app.use(express.json());
app.use(cors());

const jwtMiddleware = require('./middleware/auth');

app.use('/protectedRoute', jwtMiddleware);


const userRoutes = require('./Routes/usersRoute');
const passwordResetRoutes = require('./Routes/passwordResetRoute');
const contactSubmit = require('./Routes/contactRoute');
const loginRoute = require('./Routes/loginRoute');
const incomeRoute = require('./Routes/incomeRoute')


// Use Routes 
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/forgot', passwordResetRoutes);
app.use('/contact', contactSubmit);
app.use('/api/income', incomeRoute);

    
// get backend-part
app.get('/', (req, res) => {
    res.send('Welcome to Smart Money Website.');
})

app.listen(PORT, () => {
    console.log(`Server started on ${new Date().toLocaleString()} at http://localhost:${PORT}`);
})