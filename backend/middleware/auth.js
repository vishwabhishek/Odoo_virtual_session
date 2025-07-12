import jwt from 'jsonwebtoken';

const auth =async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded =await jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default auth;

