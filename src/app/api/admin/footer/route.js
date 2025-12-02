import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio-admin');
    
    const footer = await db.collection('footer').findOne({});
    return NextResponse.json(footer || {});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio-admin');
    const data = await request.json();
    
    const result = await db.collection('footer').updateOne(
      {},
      { $set: { ...data, updatedAt: new Date() } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}