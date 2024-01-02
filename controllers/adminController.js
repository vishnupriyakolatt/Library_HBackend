const Admin = require('../models/admin/AdminModel');
const user = require('../models/user/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTER ADMIN
const AdminRegister = async (req, res, next) => {
  console.log(req.body);
  try {
    const isExisting = await Admin.findOne({ email: req.body.email });
    if (isExisting) {
      return res.status(404).json({ msg: 'email already taken' });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newAdmin = await Admin.create({
      ...req.body,
      password: hashedPassword,
    });
    console.log(newAdmin);

    const { password, ...others } = newAdmin._doc;

    res.status(201).json({ admin: others });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//LOGIN ADMIN
const AdminLogin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(404).json({ msg: 'Invalid credentials' });
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!comparePassword) {
      return res.status(404).json({ msg: 'Invalid credentials' });
    }
    const { password, ...others } = admin._doc;
    others.role = 'ADMIN';
    const token = jwt.sign(others, process.env.SECRET, {
      expiresIn: '5h',
    });

    return res
      .status(200)
      .json({ name: others.userName, token, role: 'ADMIN' });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const userview = async (req, res) => {
  console.log('hi')
  if (req.user.role !== 'ADMIN') {
    return res.status(404).json({ msg: 'You dont have admin privilages' });
  }
  try {
    const userData = await user.find({});
    console.log(userData);
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json(error);
  }
};

module.exports = {
  AdminRegister,
  AdminLogin,
  userview,
};
