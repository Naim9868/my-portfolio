import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { User } from '@/app/lib/models';
import { hashPassword, generateToken } from '@/app/lib/auth';

// POST: Register first admin
export async function POST(request) {
  try {
    await dbConnect();
    const { username, password, email } = await request.json();

    // Validate input
    if (!username || !password || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Check if any user exists
    const existingUser = await User.findOne();
    if (existingUser) {
      return NextResponse.json(
        { error: 'Registration disabled' },
        { status: 403 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create admin user
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      role: 'admin',
      isActive: true
    });

    // Generate token
    const token = generateToken(user._id, user.username, user.role);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Admin registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });

    // Set token in HTTP-only cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 2 * 60 * 60,
      path: '/'
    });

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Registration failed', details: error.message },
      { status: 500 }
    );
  }
}