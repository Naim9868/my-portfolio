import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio-admin');
    
    const hero = await db.collection('hero').findOne({});
    return NextResponse.json(hero || {});
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('portfolio-admin');
    const data = await request.json();
    
    const result = await db.collection('hero').updateOne(
      {},
      { $set: { ...data, updatedAt: new Date() } },
      { upsert: true }
    );
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}