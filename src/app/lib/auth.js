import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production';
const JWT_EXPIRES_IN = '2h';

// Hash password
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

// Compare password
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Generate JWT token
export const generateToken = (userId, username, role) => {
  return jwt.sign(
    { userId, username, role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Middleware to verify token
export const verifyTokenMiddleware = (handler) => {
  return async (req, context) => {
    try {
      const token = req.headers.get('authorization')?.split(' ')[1];
      
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'No token provided' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      const decoded = verifyToken(token);
      
      if (!decoded) {
        return new Response(
          JSON.stringify({ error: 'Invalid token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }

      // Add user info to request
      req.user = decoded;
      
      return handler(req, context);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return new Response(
        JSON.stringify({ error: 'Authentication failed' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  };
};