const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  
  try {
    const decoded = jwt.verify(token, '2Ea3QFBbKh9QLoBXpmbMOd3lvJaw9O9zxZOoFLi2iZY=');
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Not authorized' });
  }
};

module.exports = { authenticate };
