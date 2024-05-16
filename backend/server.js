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


const userRoutes = require('./Routes/usersRoute')
const passwordResetRoutes = require('./Routes/passwordResetRoute')
const contactSubmit = require('./Routes/contactRoute')
const loginRoute = require('./Routes/loginRoute')
const incomeRoute = require('./Routes/Dashboard/incomeRoute')
const housingRoute = require('./Routes/Dashboard/housingRoute')
const taxRoute = require('./Routes/Dashboard/taxRoute')
const medicalRoute = require('./Routes/Dashboard/medicalRoute')
const personalRoute = require('./Routes/Dashboard/personalRoute')
const othersRoute = require('./Routes/Dashboard/othersRoute')
const clothingRoute = require('./Routes/Dashboard/clothingRoute')
const foodRoute = require('./Routes/Dashboard/foodRoute')
const savingRoute = require('./Routes/Dashboard/savingRoute')
const totalRoute = require('./Routes/Dashboard/totalRoute')
const exportRoute = require('./Routes/Dashboard/exportRoute')

// Use Routes
app.use('/users', userRoutes);
app.use('/login', loginRoute);
app.use('/forgot', passwordResetRoutes);
app.use('/contact', contactSubmit);
app.use('/api/income', incomeRoute);
app.use('/api/housing', housingRoute);
app.use('/api/tax',  taxRoute);
app.use('/api/medical', medicalRoute);
app.use('/api/personal', personalRoute);
app.use('/api/others', othersRoute);
app.use('/api/clothing', clothingRoute);
app.use('/api/food', foodRoute);
app.use('/api/saving', savingRoute);
app.use('/api/total', totalRoute);
app.use('/api/export', exportRoute);
    
// get backend-part
app.get('/', (req, res) => {
    res.send('Welcome to Smart Money Website.');
})

app.listen(PORT, () => {
    console.log(`Server started on ${new Date().toLocaleString()} at http://localhost:${PORT}`);
})