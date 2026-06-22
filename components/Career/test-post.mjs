import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  try {
    const commercialPayload = {
      type: 'Commercial',
      propertyCategory: 'Commercial',
      listingPurpose: 'For Rent',
      contactName: 'Rajesh Kumar',
      city: 'Chennai',
      locality: 'Adyar',
      fullAddress: 'Test Commercial Address',
      landmark: 'Near Metro',
      propertyType: 'Office Space',
      buildingType: 'Abas enclave',
      propertyAge: '5-10 Years',
      floorNumber: '8',
      totalFloors: '15',
      builtUpArea: '1581',
      rent: '40000',
      deposit: '120000',
      maintenanceAmount: '4000',
      maintenanceType: 'Extra',
      rentNegotiable: false,
      depositNegotiable: false,
      description: 'Test Description',
      photos: []
    };

    const res = await fetch('http://localhost:3000/api/properties/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commercialPayload)
    });
    
    console.log("Status:", res.status);
    console.log(await res.json());
  } catch(e) {
    console.error(e);
  }
}
main();
