const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lib', 'backend.ts');
let content = fs.readFileSync(filePath, 'utf8');

const newFunc = `export async function updatePropertyInDb(id: string, type: string, updates: any) {
  try {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) throw new Error("Invalid property ID");

    // Standardize mapping to the specific table columns
    const title = updates.title || updates.propertyName || updates.apartmentName || updates.pgName || 'Property';
    const locality = updates.locality || updates.location || updates.city || 'Unknown';
    const price = (function() {
      const val = updates.price || updates.rent || updates.expectedRent || updates.monthlyRent;
      if (!val) return 0;
      const parsed = parseFloat(String(val).replace(/,/g, '').replace(/[^0-9.]/g, ''));
      return isNaN(parsed) ? 0 : parsed;
    })();
    const images = updates.images; // Full array from the frontend

    let query = '';
    let params: any[] = [];

    if (images && Array.isArray(images)) {
      query = \`UPDATE "Property" SET "propertyName" = $1, locality = $2, rent = $3, images = $4 WHERE id = $5 RETURNING *\`;
      params = [title, locality, price, JSON.stringify(images), numericId];
    } else {
      query = \`UPDATE "Property" SET "propertyName" = $1, locality = $2, rent = $3 WHERE id = $4 RETURNING *\`;
      params = [title, locality, price, numericId];
    }

    // fallback to handle other legacy tables just in case they exist
    if (type === 'Residential') {
      try { await safeQuery(\`UPDATE "Apartment" SET "expectedRent" = $1 WHERE id = $2\`, [price, numericId]); } catch(e){}
    } else if (type === 'Commercial') {
      try { await safeQuery(\`UPDATE "Commercial" SET "expectedRent" = $1 WHERE id = $2\`, [price, numericId]); } catch(e){}
    } else if (type === 'Flatmate') {
      try { await safeQuery(\`UPDATE "Flatmate" SET "expectedRent" = $1 WHERE id = $2\`, [price, numericId]); } catch(e){}
    }

    const result = await safeQuery(query, params);
    return result && result.length > 0 ? result[0] : null;

  } catch (error) {
    console.error(\`[updatePropertyInDb] DB failed:\`, (error as Error).message);
    return null;
  }
}
`;

const startIndex = content.indexOf('export async function updatePropertyInDb');
if (startIndex !== -1) {
  content = content.substring(0, startIndex) + newFunc;
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully patched backend.ts");
} else {
  console.log("Could not find updatePropertyInDb");
}
