const express = require('express');
const { AdminRegister,userview, AdminLogin } = require('../controllers/adminController');
const verifyToken = require('../middleware/verifyToken');
const adminRoutes = express.Router();

adminRoutes.post('/register', AdminRegister);
adminRoutes.post('/login', AdminLogin);
adminRoutes.get('/userview', verifyToken,userview);
module.exports = adminRoutes;





 