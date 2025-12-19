import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Contact } from '@/app/lib/models';

// GET: Fetch contact data
export async function GET() {
  try {
    await dbConnect();
    
    let contact = await Contact.findOne();
    
    if (!contact) {
      const defaultContact = {
        title: 'Get In Touch',
        description: "Let's work together! I'm always open to discussing new opportunities and creative projects.",
        contactMethods: [
          { title: 'Email', value: 'naimislam9868@gmail.com', icon: 'FaEnvelope', link: 'mailto:naimislam9868@gmail.com' },
          { title: 'Phone', value: '+8801521-529868', icon: 'FaPhone', link: 'tel:+8801521529868' },
          { title: 'LinkedIn', value: 'in/yourprofile', icon: 'FaLinkedin', link: 'https://linkedin.com' }
        ],
        formEnabled: true,
        emailService: {
          serviceId: 'service_exxu8un',
          templateId: 'template_kwkeo1c',
          publicKey: 'vR1VFMtGTt3fsxQ9f'
        },
        enabled: true
      };
      
      contact = await Contact.create(defaultContact);
    }
    
    return NextResponse.json(contact);
  } catch (error) {
    console.error('Error fetching contact:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contact data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update contact data
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    const contact = await Contact.findOneAndUpdate(
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
      message: 'Contact section updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return NextResponse.json(
      { error: 'Failed to update contact data', details: error.message },
      { status: 500 }
    );
  }
}