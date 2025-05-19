import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id }; 
      next();
    } else {
      return res.status(401).json({ success: false, message: 'Unauthorized: Invalid token' });
    }
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized: Token verification failed' });
  }
};

export default userAuth;