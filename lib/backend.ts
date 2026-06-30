// Centralized backend API config — points to the Render-hosted NestJS backend
// This replaces direct Neon DB (pool) queries throughout the app

import pool from './db';
import { unstable_cache } from 'next/cache';

export const BACKEND_URL = 'https://rentit-18-05.onrender.com';

/**
 * Fetch from the backend API with a timeout.
 * Returns parsed JSON on success, or null on failure.
 */
export async function fetchBackend(endpoint: string, options?: {
  method?: string;
  body?: any;
  timeoutMs?: number;
}) {
  const { method = 'GET', body, timeoutMs = 12000 } = options || {};

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    const fetchOptions: RequestInit = {
      method,
      cache: 'no-store' as RequestCache,
      signal: controller.signal,
      headers: { 'Content-Type': 'application/json' },
    };
    if (body && method !== 'GET') {
      fetchOptions.body = JSON.stringify(body);
    }

    const res = await fetch(`${BACKEND_URL}${endpoint}`, fetchOptions);
    clearTimeout(timeout);

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.warn(`[fetchBackend] ${endpoint} failed:`, (error as Error).message);
    return null;
  }
}

/**
 * Run a DB query with a timeout. Returns null on any failure.
 */
async function safeQuery(sql: string, params?: any[], timeoutMs = 15000): Promise<any[] | null> {
  try {
    const result = await Promise.race([
      pool.query(sql, params),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Query timeout')), timeoutMs))
    ]) as any;
    return result.rows || [];
  } catch (e) {
    console.warn('[safeQuery] failed:', (e as Error).message);
    return null;
  }
}

export const fetchAllProperties = unstable_cache(async () => {
  const getFirstImage = (images: any): string | null => {
    if (!images) return null;
    if (Array.isArray(images)) return images[0] || null;
    if (typeof images === 'string') {
      try {
        if (images.startsWith('{') && images.endsWith('}')) {
          const content = images.slice(1, -1);
          if (!content) return null;
          return content.split(',')[0].replace(/^"|"$/g, '').trim();
        }
        const parsed = JSON.parse(images);
        if (Array.isArray(parsed)) return parsed[0] || null;
      } catch {
        if (images.startsWith('http')) return images;
      }
    }
    return null;
  };
  try {
    // Run queries sequentially to prevent connection pool exhaustion and timeouts
    const aptRows = await safeQuery('SELECT id, city, locality, street, "buildingType" as "apartmentType", "bhkType", "expectedRent" as price, images, "createdAt" as created_at FROM "Apartment" ORDER BY "createdAt" DESC LIMIT 20');
    const comRows = await safeQuery('SELECT id, city, locality, street, "propertyType", "buildingType", "expectedRent" as price, images, "createdAt" as created_at FROM "Commercial" ORDER BY "createdAt" DESC LIMIT 20');
    const flatRows = await safeQuery('SELECT id, city, locality, street, "apartmentType", "apartmentName", "bhkType", "roomType", "expectedRent" as price, images, "createdAt" as created_at FROM "Flatmate" ORDER BY "createdAt" DESC LIMIT 20');
    const pgRows = await safeQuery('SELECT id, city, locality, street, "propertyName", "propertyType", "roomType", rent as price, images, "createdAt" as created_at FROM "Property" ORDER BY "createdAt" DESC LIMIT 20');
    const oldRows = await safeQuery('SELECT * FROM properties ORDER BY created_at DESC LIMIT 20');

    let all: any[] = [];

    // Other tables likely don't exist in the new schema, but keep for safety
    if (aptRows) {
      all.push(...aptRows.map((r: any) => {
        const { images, ...rest } = r;
        return {
          ...rest, id: r.id, _id: r.id, _key: `apt-${r.id}`,
          title: `${r.bhkType || ''} ${r.apartmentType || 'Apartment'}`,
          location: `${r.locality || ''}, ${r.city || ''}`,
          price: r.price, type: 'Residential', propertyType: 'Residential',
          image_url: getFirstImage(images)
        };
      }));
    }
    if (comRows) {
      all.push(...comRows.map((r: any) => {
        const { images, ...rest } = r;
        return {
          ...rest, id: r.id, _id: r.id, _key: `com-${r.id}`,
          title: `${r.buildingType || r.propertyType || 'Commercial Space'}`,
          location: `${r.locality || ''}, ${r.city || ''}`,
          price: r.price, type: 'Commercial', propertyType: 'Commercial',
          image_url: getFirstImage(images)
        };
      }));
    }
    if (flatRows) {
      all.push(...flatRows.map((r: any) => {
        const { images, ...rest } = r;
        return {
          ...rest, id: r.id, _id: r.id, _key: `flat-${r.id}`,
          title: `${r.roomType || r.bhkType || ''} in ${r.apartmentName || 'Apartment'}`,
          location: `${r.locality || ''}, ${r.city || ''}`,
          price: r.price, type: 'Flatmate', propertyType: 'Flatmate',
          image_url: getFirstImage(images)
        };
      }));
    }
    if (pgRows) {
      all.push(...pgRows.map((r: any) => {
        const { images, ...rest } = r;
        return {
          ...rest,
          id: r.id,
          _id: r.id,
          _key: `prop-${r.id}`,
          title: `${r.propertyName || r.propertyType || 'Property'}`,
          location: `${r.locality || ''}, ${r.city || ''}`,
          price: r.price,
          type: r.propertyType || 'PG / Hostel',
          propertyType: r.propertyType || 'PG',
          image_url: getFirstImage(images)
        };
      }));
    }
    if (oldRows) {
      all.push(...oldRows.map((r: any) => {
        const { images, details, ...rest } = r;
        return {
          ...rest,
          id: r.id,
          _id: r.id,
          _key: `old-${r.id}`,
          title: r.title,
          location: r.location_address || r.city,
          price: r.price || r.rent,
          type: r.type,
          propertyType: r.type,
          image_url: r.image_url || getFirstImage(images) || (details?.images && details.images[0]) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'
        };
      }));
    }


    all.sort((a, b) => {
      const dateA = new Date(a.created_at || 0).getTime();
      const dateB = new Date(b.created_at || 0).getTime();
      return dateB - dateA;
    });

    // Deduplicate based on title and location to prevent double entries 
    // from overlapping legacy tables
    const seen = new Set();
    const deduplicated = all.filter(item => {
      const key = `${item.title}-${item.location}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    // Ensure it's fully serializable for unstable_cache to avoid silent failures
    return JSON.parse(JSON.stringify(deduplicated));
  } catch (error) {
    console.warn(`[fetchAllProperties] DB failed:`, (error as Error).message);
    return [];
  }
}, ['all-properties-v2'], { revalidate: 600, tags: ['properties'] });

/**
 * Fetch a single property by ID — searches all 4 tables.
 */
export const fetchPropertyById = unstable_cache(async (id: string) => {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) return null;

    // Run sequentially to prevent connection pool exhaustion
    const apt = await safeQuery('SELECT * FROM "Apartment" WHERE id = $1', [numericId]);
    const com = await safeQuery('SELECT * FROM "Commercial" WHERE id = $1', [numericId]);
    const flat = await safeQuery('SELECT * FROM "Flatmate" WHERE id = $1', [numericId]);
    const pg = await safeQuery('SELECT * FROM "Property" WHERE id = $1', [numericId]);
    const old = await safeQuery('SELECT * FROM properties WHERE id = $1', [numericId]);

    if (apt && apt[0]) return JSON.parse(JSON.stringify({ ...apt[0], id: apt[0].id, _id: apt[0].id, type: 'Residential', propertyType: 'Residential' }));
    if (com && com[0]) return JSON.parse(JSON.stringify({ ...com[0], id: com[0].id, _id: com[0].id, type: 'Commercial', propertyType: 'Commercial' }));
    if (flat && flat[0]) return JSON.parse(JSON.stringify({ ...flat[0], id: flat[0].id, _id: flat[0].id, type: 'Flatmate', propertyType: 'Flatmate' }));
    if (pg && pg[0]) return JSON.parse(JSON.stringify({ ...pg[0], id: pg[0].id, _id: pg[0].id, type: 'PG / Hostel', propertyType: 'PG' }));
    if (old && old[0]) return JSON.parse(JSON.stringify({ ...old[0], id: old[0].id, _id: old[0].id }));

    return null;
  } catch (error) {
    console.warn(`[fetchPropertyById] DB failed:`, (error as Error).message);
    return null;
  }
}, ['property-by-id-v2'], { revalidate: 600, tags: ['properties'] });

/**
 * Update a single property by ID. Only updates the new Property table.
 */
export async function updatePropertyInDb(id: string, type: string, updates: any) {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new Error("Invalid property ID");

    // Standardize title and location mapping to the specific table columns
    const title = updates.title || updates.propertyName || updates.apartmentName || updates.pgName || 'Property';
    const locality = updates.locality || updates.location || updates.city || 'Unknown';
    const price = (function () {
      const val = updates.price || updates.rent || updates.expectedRent || updates.monthlyRent;
      if (!val) return 0;
      const parsed = parseFloat(String(val).replace(/,/g, '').replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    })();
    const images = updates.images;

    let query = '';
    let params: any[] = [];

    if (images && Array.isArray(images)) {
      query = `UPDATE "Property" SET "propertyName" = $1, locality = $2, rent = $3, images = $4 WHERE id = $5 RETURNING *`;
      // Pass the array directly, pg handles it
      params = [title, locality, price, images, numericId];
    } else {
      query = `UPDATE "Property" SET "propertyName" = $1, locality = $2, rent = $3 WHERE id = $4 RETURNING *`;
      params = [title, locality, price, numericId];
    }

    const result = await safeQuery(query, params);
    
    // Fallback: Just in case the row doesn't exist in Property but exists in legacy tables
    if (!result || result.length === 0) {
      if (type === 'Residential') {
        try { await safeQuery(`UPDATE "Apartment" SET "expectedRent" = $1 WHERE id = $2`, [price, numericId]); } catch(e){}
      } else if (type === 'Commercial') {
        try { await safeQuery(`UPDATE "Commercial" SET "expectedRent" = $1 WHERE id = $2`, [price, numericId]); } catch(e){}
      } else if (type === 'Flatmate') {
        try { await safeQuery(`UPDATE "Flatmate" SET "expectedRent" = $1 WHERE id = $2`, [price, numericId]); } catch(e){}
      }
      return { id: numericId, type, title, locality, price, images };
    }

    return result[0];

  } catch (error) {
    console.error(`[updatePropertyInDb] DB failed:`, (error as Error).message);
    return null;
  }
}
