import { NextResponse } from 'next/server';
import { fetchAllProperties } from '@/lib/backend';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchAllProperties();
    if (data.length > 0) {
      return NextResponse.json(data);
    }
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 });
  } catch (error: any) {
    console.warn('Failed to proxy to backend:', error.message);
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 });
  }
}
