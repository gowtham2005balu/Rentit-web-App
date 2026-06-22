export interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  deposit?: number;
  bhk: number;
  baths: number;
  sqft: number;
  furnishing: string;
  availability: string;
  imageUrl: string;
  isPromoted?: boolean;
  agentName?: string;
  isNewProject?: boolean;
}

export const properties: Property[] = [
  {
    id: 'p1',
    title: 'Luxury 3BHK Premium Apartment',
    location: 'Adyar, Chennai',
    price: 45000,
    deposit: 150000,
    bhk: 3,
    baths: 3,
    sqft: 1800,
    furnishing: 'Fully Furnished',
    availability: 'Ready to move',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    isPromoted: true,
    agentName: 'Elite Realtors'
  },
  {
    id: 'p2',
    title: 'Modern 2BHK Apartment',
    location: 'Velachery, Chennai',
    price: 28000,
    deposit: 100000,
    bhk: 2,
    baths: 2,
    sqft: 1200,
    furnishing: 'Semi Furnished',
    availability: 'From Next Month',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    isPromoted: true,
    agentName: 'City Homes'
  },
  {
    id: 'p3',
    title: 'Spacious 4BHK Villa',
    location: 'ECR, Chennai',
    price: 85000,
    deposit: 300000,
    bhk: 4,
    baths: 4,
    sqft: 3200,
    furnishing: 'Fully Furnished',
    availability: 'Ready to move',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    isPromoted: true,
    agentName: 'Premium Estates'
  },
  {
    id: 'p4',
    title: 'Cozy 1BHK Studio',
    location: 'OMR, Chennai',
    price: 15000,
    deposit: 50000,
    bhk: 1,
    baths: 1,
    sqft: 600,
    furnishing: 'Unfurnished',
    availability: 'Immediate',
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800',
    agentName: 'Owner'
  }
];

export const newProjects = [
  {
    id: 'np1',
    title: 'Prestige Bella Vista',
    location: 'Porur, Chennai',
    priceRange: '₹45 L - ₹1.2 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600',
    status: 'Under Construction'
  },
  {
    id: 'np2',
    title: 'Brigade Xanadu',
    location: 'Mogappair, Chennai',
    priceRange: '₹60 L - ₹1.5 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    status: 'Ready to move'
  },
  {
    id: 'np3',
    title: 'Godrej Azure',
    location: 'Padur, Chennai',
    priceRange: '₹35 L - ₹80 L',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600',
    status: 'New Launch'
  },
  {
    id: 'np4',
    title: 'TVS Emerald Peninsula',
    location: 'Manapakkam, Chennai',
    priceRange: '₹75 L - ₹2.1 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    status: 'Under Construction'
  },
  {
    id: 'np5',
    title: 'Appaswamy Trellis',
    location: 'Vadapalani, Chennai',
    priceRange: '₹1.1 Cr - ₹3.5 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    status: 'Ready to move'
  },
  {
    id: 'np6',
    title: 'Casagrand FirstCity',
    location: 'Sholinganallur, Chennai',
    priceRange: '₹55 L - ₹1.8 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=600',
    status: 'New Launch'
  },
  {
    id: 'np7',
    title: 'Puravankara Somerset',
    location: 'Guindy, Chennai',
    priceRange: '₹95 L - ₹2.8 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=601',
    status: 'Under Construction'
  },
  {
    id: 'np8',
    title: 'Olympia Opaline',
    location: 'Navalur, Chennai',
    priceRange: '₹48 L - ₹1.1 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=601',
    status: 'Ready to move'
  },
  {
    id: 'np9',
    title: 'Akshaya Today',
    location: 'Kelambakkam, Chennai',
    priceRange: '₹38 L - ₹90 L',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=601',
    status: 'Ready to move'
  },
  {
    id: 'np10',
    title: 'Radiance Icon',
    location: 'Koyambedu, Chennai',
    priceRange: '₹85 L - ₹2.4 Cr',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=601',
    status: 'New Launch'
  }
];

export const filterOptions = {
  locations: ['Adyar', 'Velachery', 'ECR', 'OMR', 'Porur', 'Mogappair'],
  propertyTypes: ['Apartment', 'Villa', 'Independent House', 'Builder Floor'],
  bhk: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'],
  furnishing: ['Fully Furnished', 'Semi Furnished', 'Unfurnished']
};

export const ownerListedProperties = [
  {
    id: 'ol1',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    isNew: true,
    timeAgo: '3h ago',
    photoCount: 9,
    subtitle: 'MALE FLATMATE • 1 BHK',
    title: 'Cozy 1BHK Near IT Corridor',
    location: 'Sholinganallur, Chennai',
    sqft: '650 sq.ft',
    tenantPref: 'Working Pro',
    amenities: ['WiFi', 'Bath Attached', 'Parking'],
    price: '₹11,000'
  },
  {
    id: 'ol2',
    imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=600',
    timeAgo: '5h ago',
    matchScore: '88%',
    subtitle: 'FEMALE FLATMATE • 2 BHK',
    title: 'Furnished Room — Anna Nagar',
    location: 'Anna Nagar, Chennai',
    sqft: '480 sq.ft',
    tenantPref: 'Students OK',
    amenities: ['AC', 'WiFi', 'Meals nearby'],
    price: '₹8,500'
  },
  {
    id: 'ol3',
    imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=600',
    timeAgo: '3d ago',
    subtitle: 'STUDIO • ADYAR',
    title: 'Studio Near College — Adyar',
    location: 'Adyar, Chennai',
    sqft: '320 sq.ft',
    tenantPref: 'Student Preferred',
    amenities: ['WiFi', 'Power Backup'],
    price: '₹6,500'
  },
  {
    id: 'ol4',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    timeAgo: '5h ago',
    matchScore: '95%',
    photoCount: 14,
    subtitle: 'WORKING PRO • 2 BHK',
    title: 'Premium 2BHK — Fully Furnished',
    location: 'Velachery, Chennai',
    sqft: '1,200 sq.ft',
    tenantPref: 'Working only',
    amenities: ['Gym', 'WiFi', 'Parking', 'AC'],
    price: '₹14,000'
  }
];

export const metroListedProperties = [
  {
    id: 'm1',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=600',
    metroDistance: 'METRO 0.3KM',
    timeAgo: '19h ago',
    subtitle: 'MALE FLATMATE • 2 BHK',
    title: 'Coy 1BHK Near IT Corridor',
    location: 'Sholinganallur, Chennai',
    amenities: ['AC', 'WiFi', 'Parking'],
    price: '₹9,000'
  },
  {
    id: 'm2',
    imageUrl: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600',
    timeAgo: '20h ago',
    subtitle: 'FEMALE FLATMATE • 2 BHK',
    title: 'Furnished Room — Anna Nagar',
    location: 'Anna Nagar, Chennai',
    amenities: ['AC', 'WiFi', 'Meals nearby'],
    price: '₹13,000'
  },
  {
    id: 'm3',
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    metroDistance: 'METRO 0.5KM',
    timeAgo: '22h ago',
    subtitle: 'COUPLE FRIENDLY • 1 BHK',
    title: 'Modern Apartment — Velachery',
    location: 'Velachery, Chennai',
    amenities: ['AC', 'Gym', 'Parking'],
    price: '₹15,000'
  },
  {
    id: 'm4',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600',
    timeAgo: '1d ago',
    subtitle: 'STUDENTS OK • 3 BHK',
    title: 'Spacious Flat Near Metro',
    location: 'Guindy, Chennai',
    amenities: ['WiFi', 'Washing Machine'],
    price: '₹18,500'
  },
  {
    id: 'm5',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    metroDistance: 'METRO 0.1KM',
    timeAgo: '1d ago',
    subtitle: 'FAMILY PREFERRED • 2 BHK',
    title: 'Luxury Condos — Alandur',
    location: 'Alandur, Chennai',
    amenities: ['Power Backup', 'Security'],
    price: '₹22,000'
  },
  {
    id: 'm6',
    imageUrl: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=600',
    timeAgo: '2d ago',
    subtitle: 'WORKING PROS • 1 RK',
    title: 'Cozy Studio — T Nagar',
    location: 'T Nagar, Chennai',
    amenities: ['AC', 'Furnished'],
    price: '₹11,500'
  },
  {
    id: 'm7',
    imageUrl: 'https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&q=80&w=600',
    metroDistance: 'METRO 0.8KM',
    timeAgo: '2d ago',
    subtitle: 'BACHELORS • 2 BHK',
    title: 'Semi-furnished near Station',
    location: 'Saidapet, Chennai',
    amenities: ['Balcony', 'Parking'],
    price: '₹14,000'
  },
  {
    id: 'm8',
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    timeAgo: '3d ago',
    subtitle: 'ANYONE • 1 BHK',
    title: 'Affordable Flat — Nanganallur',
    location: 'Nanganallur, Chennai',
    amenities: ['Water 24/7', 'WiFi'],
    price: '₹8,500'
  },
  {
    id: 'm9',
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=600',
    metroDistance: 'METRO 0.2KM',
    timeAgo: '4d ago',
    subtitle: 'COUPLES • 3 BHK',
    title: 'Premium Apartment',
    location: 'Mount Road, Chennai',
    amenities: ['AC', 'Pool', 'Gym'],
    price: '₹35,000'
  },
  {
    id: 'm10',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=600',
    timeAgo: '5d ago',
    subtitle: 'STUDIO • 1 RK',
    title: 'Compact Room — Egmore',
    location: 'Egmore, Chennai',
    amenities: ['Furnished', 'AC'],
    price: '₹12,000'
  }
];

export const trendingLocalities = [
  { id: 't1', name: 'Anna Nagar', avgPrice: 'Avg ₹16,500/mo', imageUrl: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&q=80&w=300' },
  { id: 't2', name: 'OMR', avgPrice: 'Avg ₹12,000/mo', imageUrl: 'https://images.squarespace-cdn.com/content/v1/56c13cc00442627a08632989/7a292458-5b2d-4928-a70c-8280118d7741/ChennaiAerial.jpg' },
  { id: 't3', name: 'Velachery', avgPrice: 'Avg ₹9,800/mo', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaxmYGHgcq3dA6Gzw29EKcnZVDUip3ajbROA&s' },
  { id: 't4', name: 'ECR', avgPrice: 'Avg ₹11,000/mo', imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=300' },
  { id: 't5', name: 'Porur', avgPrice: 'Avg ₹9,500/mo', imageUrl: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?auto=format&fit=crop&q=80&w=300' }
];
