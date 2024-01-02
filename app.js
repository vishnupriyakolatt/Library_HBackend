const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/adminRoute.js');
const userRoutes = require('./routes/userRoute.js');
const bookRoute = require('./routes/bookRoute.js');
const dbconnect = require('./config/connection');
const verifyToken = require('./middleware/verifyToken.js');
const { verifyTokenController } = require('./controllers/userController.js');

const PORT = process.env.PORT;
dotenv.config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dbconnect.dbconnect();
app.use(cors());
app.use(morgan('dev'));

app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/book', bookRoute);
app.get('/api/verify/accessToken', verifyToken, verifyTokenController);

app.listen(PORT, () => {
  console.log(`server is running  on http://localhost:${PORT}`);
});
