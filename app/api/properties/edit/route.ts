import { NextResponse } from 'next/server';
import { updatePropertyInDb } from '@/lib/backend';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, type, updates } = body;

    if (!id || !type || !updates) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const updatedRecord = await updatePropertyInDb(id, type, updates);

    if (updatedRecord) {
      return NextResponse.json({ success: true, record: updatedRecord });
    } else {
      return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('Failed to update property API:', error.message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
