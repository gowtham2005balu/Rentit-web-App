import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const payload = {
      propertyCategory: 'Residential',
      city: 'Test City',
      locality: 'Test Locality',
      fullAddress: '123 Test St',
      apartmentType: 'Apartment',
      bhkType: '2 BHK',
      floorNumber: '2',
      totalFloors: '5',
      builtUpArea: '1000',
      propertyAge: '1-5 Years',
      monthlyRent: '20000',
      securityDeposit: '100000',
      propertyDescription: 'Test Description',
      title: 'Test Title'
    };

    const res = await fetch('http://localhost:3000/api/properties/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const result = await res.json();
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
