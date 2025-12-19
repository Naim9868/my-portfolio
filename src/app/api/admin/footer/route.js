import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Footer } from '@/app/lib/models';

// GET: Fetch footer data
export async function GET() {
  try {
    await dbConnect();
    
    let footer = await Footer.findOne();
    
    // If no footer exists, create default
    if (!footer) {
      const defaultFooter = {
        name: 'Md. Naimul Islam',
        tagline: 'Building amazing web experiences with React and modern technologies. Let\'s create something extraordinary together.',
        phone: '+8801521-529868',
        location: 'Dhaka, Bangladesh',
        email: 'naimislam9868@gmail.com',
        copyrightText: 'Designed & Build by N@im',
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/Naim9868', icon: 'FaGithub', color: '#333' },
          { platform: 'LinkedIn', url: 'https://linkedin.com/in/md-naimul-islam', icon: 'FaLinkedin', color: '#0077b5' },
          { platform: 'WhatsApp', url: 'https://wa.me/+8801521529868', icon: 'FaWhatsapp', color: '#25D366' },
          { platform: 'Facebook', url: 'https://facebook.com/naim-islam', icon: 'FaFacebook', color: '#4267B2' },
          { platform: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'FaTwitter', color: '#1DA1F2' }
        ],
        enabled: true,
        showPhone: true,
        showLocation: true,
        showEmail: true
      };
      
      footer = await Footer.create(defaultFooter);
    }
    
    return NextResponse.json(footer);
  } catch (error) {
    console.error('Error fetching footer:', error);
    return NextResponse.json(
      { error: 'Failed to fetch footer data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update footer data
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    const footer = await Footer.findOneAndUpdate(
      {},
      updateData,
      { 
        new: true,
        upsert: true,
        setDefaultsOnInsert: true 
      }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Footer updated successfully',
      data: footer
    });
  } catch (error) {
    console.error('Error updating footer:', error);
    return NextResponse.json(
      { error: 'Failed to update footer data', details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Partial update
export async function PUT(request) {
  try {
    await dbConnect();
    const updates = await request.json();
    
    const footer = await Footer.findOneAndUpdate(
      {},
      { 
        ...updates,
        updatedAt: new Date()
      },
      { 
        new: true,
        upsert: true 
      }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Footer partially updated',
      data: footer
    });
  } catch (error) {
    console.error('Error updating footer:', error);
    return NextResponse.json(
      { error: 'Failed to update footer', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete footer (not recommended, but available)
export async function DELETE() {
  try {
    await dbConnect();
    
    const result = await Footer.deleteOne({});
    
    return NextResponse.json({
      success: true,
      message: 'Footer deleted',
      data: result
    });
  } catch (error) {
    console.error('Error deleting footer:', error);
    return NextResponse.json(
      { error: 'Failed to delete footer', details: error.message },
      { status: 500 }
    );
  }
}