import { NextResponse } from 'next/server';
import { fetchAllProperties } from '@/lib/backend';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const properties = await fetchAllProperties();
    
    const topPremiumProps = [...properties]
      .sort((a: any, b: any) => {
        const priceA = parseFloat(String(a.price || a.rent || 0).replace(/,/g, ''));
        const priceB = parseFloat(String(b.price || b.rent || 0).replace(/,/g, ''));
        return priceB - priceA;
      })
      .slice(0, 5)
      .map(p => ({ title: p.title, price: p.price, type: p.type }));

    return NextResponse.json({
      ts: url.searchParams.get('ts'),
      count: properties.length,
      topPremiumProps
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
