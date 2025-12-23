import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { User } from '@/app/lib/models';
import { verifyToken } from '@/app/lib/auth';

// GET: Get current user
export async function GET(request) {
  try {
    await dbConnect();
    
    const token = request.cookies.get('admin_token')?.value || 
                  request.headers.get('authorization')?.split(' ')[1];
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token provided' },
        { status: 401 }
      );
    }

    const decoded = verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user' },
      { status: 500 }
    );
  }
}