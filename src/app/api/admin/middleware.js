import { verifyToken } from '@/app/lib/auth';

export async function adminAuthMiddleware(req) {
  try {
    // Get token from cookie or header
    const token = req.cookies.get('admin_token')?.value || 
                  req.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return {
        authorized: false,
        error: 'No token provided'
      };
    }

    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return {
        authorized: false,
        error: 'Invalid token'
      };
    }

    // Check if user has admin role
    if (decoded.role !== 'admin' && decoded.role !== 'editor') {
      return {
        authorized: false,
        error: 'Insufficient permissions'
      };
    }

    return {
      authorized: true,
      user: decoded
    };
  } catch (error) {
    console.error('Auth middleware error:', error);
    return {
      authorized: false,
      error: 'Authentication failed'
    };
  }
}