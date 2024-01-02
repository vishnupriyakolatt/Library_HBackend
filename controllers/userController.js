const User = require('../models/user/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userRegister = async (req, res, next) => {
  try {
    const isExisting = await User.findOne({ email: req.body.email });
    if (isExisting) {
return res.status(404).json({msg:"Already registered using this email address"})
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...others } = newUser._doc;
    res.status(201).json({ user: others });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//Login user
const userLogin = async (req, res) => {
  console.log(req.body);

  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
     return res.status(404).json({msg:"Invalid credentials"});
    }
    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparePassword) {
      return res.status(404).json({msg:"Invalid credentials"});
    }
    const { password, ...others } = user._doc;
    others.role='USER'
    const token = jwt.sign(others, process.env.SECRET, { expiresIn: '5h' });
    return res.status(200).json({ name: others.userName, token, role: 'USER' });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const verifyTokenController = (req, res) => {
  return res
    .status(200)
    .json({ name: req.user.userName, token: req.token, role: req.user.role });
};

module.exports = {
  userRegister,
  userLogin,
  verifyTokenController,
};
