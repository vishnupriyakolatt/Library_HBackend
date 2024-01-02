const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  console.log(req.body);
  const token =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
      ? req.headers.authorization.split(' ')[1]
      : null;

  if (!token) {
    return res.status(403).json({ msg: 'Not authorized. No token' });
  }

  jwt.verify(token, process.env.SECRET, (err, data) => {
    if (err) {
      return res.status(403).json({ msg: 'Wrong or expired token' });
    } else {
      req.user = data;
      next();
    }
  });
};

module.exports = verifyToken;


