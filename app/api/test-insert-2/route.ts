import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const data = {
      type: 'Commercial',
      userId: 1,
      title: 'Antigravity Test Property Node ' + Date.now(),
      price: 25000,
      city: 'Chennai',
      locality: 'Anna Nagar',
      fullAddress: 'Test Address 123',
      description: 'This is a test property created by the system to verify database insertion.'
    };

    const response = await fetch('http://localhost:3000/api/properties/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      cache: 'no-store'
    });

    const result = await response.json();
    return NextResponse.json({ ...result, timestamp: Date.now() });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
