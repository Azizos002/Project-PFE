const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
const DataBase = process.env.DATABASE_URI;
//connection to MongoDB
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

const jwtMiddleware = require('./middleware/auth'); // Import JWT middleware

app.use('/protectedRoute', jwtMiddleware); // Protect the route


const userRoutes = require('./Routes/usersRoute');
const usersFamRoutes = require('./Routes/usersFamRoute');
const passwordResetRoutes = require('./Routes/passwordResetRoute');
const contactSubmit = require('./Routes/contactRoute');
const loginRoute = require('./Routes/loginRoute'); // Import login controller


// Use Routes 
app.use('/users', userRoutes);
app.use('/userfam', usersFamRoutes);
app.use('/forgot', passwordResetRoutes);
app.use('/contact', contactSubmit);
app.use('/login', loginRoute);
    
// get backend-part
app.get('/', (req, res) => {
    res.send('Welcome to Smart Money Website.');
})

app.listen(PORT, () => {
    console.log(`Server started on ${new Date().toLocaleString()} at http://localhost:${PORT}`);
})