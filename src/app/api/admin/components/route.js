import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Footer, Hero, About, Projects, Contact } from '@/app/lib/models';

// GET: Fetch all components data at once
export async function GET() {
  try {
    await dbConnect();
    
    const [footer, hero, about, projects, contact] = await Promise.all([
      Footer.findOne() || Footer.create({}),
      Hero.findOne() || Hero.create({}),
      About.findOne() || About.create({}),
      Projects.findOne() || Projects.create({}),
      Contact.findOne() || Contact.create({})
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        footer,
        hero,
        about,
        projects,
        contact
      }
    });
  } catch (error) {
    console.error('Error fetching all components:', error);
    return NextResponse.json(
      { error: 'Failed to fetch components data', details: error.message },
      { status: 500 }
    );
  }
}