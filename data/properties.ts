
import { Property } from '../types';

// Puttur Center approx: 12.7685, 75.2023

export const properties: Property[] = [
  {
    id: "1",
    title: "Balnad Heritage Co-Living",
    location: "Balnad",
    category: "Villa",
    allowedGuest: "Any",
    price: "₹8,500",
    priceValue: 8500,
    rating: 4.8,
    mainImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1598228723793-52759bba239c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A peaceful heritage home converted into a co-living space for remote workers and postgraduate students. Surrounded by plantations, it offers a quiet environment for deep work and study. \n\nFeatures shared common areas and high-speed internet, fostering a small community of like-minded professionals.",
    amenities: ["High-Speed Wi-Fi", "Home Cooked Meals", "Quiet Study Zones", "Parking", "Power Backup", "Housekeeping"],
    specs: { guests: 8, bedrooms: 4, bathrooms: 3, size: "3,200 sq ft" },
    coordinates: { lat: 12.7750, lng: 75.2150 }
  },
  {
    id: "2",
    title: "The Darbar Executive Suites",
    location: "Darbar",
    category: "Apartment",
    allowedGuest: "Any",
    price: "₹12,000",
    priceValue: 12000,
    rating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Located in the bustling heart of Darbar, these serviced apartments are perfect for corporate employees. Quick access to Puttur's bus stand and major banks. \n\nEnjoy hassle-free living with cleaning services and modern furnishings included.",
    amenities: ["AC Rooms", "Fiber Internet", "Work Desk", "Room Service", "Laundry", "Elevator"],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, size: "650 sq ft" },
    coordinates: { lat: 12.7690, lng: 75.2030 }
  },
  {
    id: "3",
    title: "Nehrunagar Student Haven",
    location: "Nehrunagar",
    category: "PG",
    allowedGuest: "Male",
    price: "₹4,500",
    priceValue: 4500,
    rating: 4.2,
    mainImage: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Situated in the educational hub of Nehrunagar, this PG is walking distance from St. Philomena College and other institutions. \n\nDesigned specifically for students, offering a disciplined yet comfortable environment with healthy food options.",
    amenities: ["Study Desk", "Wi-Fi", "Washing Machine", "Mess Facility", "CCTV Security", "24/7 Water"],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, size: "400 sq ft" },
    coordinates: { lat: 12.7620, lng: 75.2100 }
  },
  {
    id: "4",
    title: "Kemminje Group Villa",
    location: "Kemminje",
    category: "Villa",
    allowedGuest: "Family",
    price: "₹18,000",
    priceValue: 18000,
    rating: 4.9,
    mainImage: "https://images.unsplash.com/photo-1600596542815-e495e913193d?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A spacious villa suitable for a group of colleagues or a family relocating to Puttur. \n\nFeatures large shared spaces, a kitchen for self-cooking, and a garden. Located in a safe residential neighborhood.",
    amenities: ["Private Garden", "Full Kitchen", "Parking (4 cars)", "Inverter Backup", "Pet Friendly"],
    specs: { guests: 10, bedrooms: 5, bathrooms: 5, size: "4,500 sq ft" },
    coordinates: { lat: 12.7550, lng: 75.2200 }
  },
  {
    id: "5",
    title: "Kabaka Transit PG",
    location: "Kabaka",
    category: "PG",
    allowedGuest: "Any",
    price: "₹3,500",
    priceValue: 3500,
    rating: 4.3,
    mainImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Strategically located near the railway station. Ideal for daily commuters or employees working in the industrial area. \n\nBudget-friendly accommodation with clean basic amenities and transport connectivity.",
    amenities: ["Near Railway Station", "Filtered Water", "Single Beds", "Bike Parking", "Budget Friendly"],
    specs: { guests: 3, bedrooms: 1, bathrooms: 1, size: "550 sq ft" },
    coordinates: { lat: 12.7800, lng: 75.1950 }
  },
  {
    id: "6",
    title: "Bolwar Heights Flat",
    location: "Bolwar",
    category: "Apartment",
    allowedGuest: "Family",
    price: "₹10,500",
    priceValue: 10500,
    rating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1502005229766-939760a58531?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A modern 2BHK flat in Bolwar. Ideal for small families or two professionals sharing. \n\nClose to supermarkets and gyms. The building has security and dedicated parking.",
    amenities: ["Modular Kitchen", "Washing Machine", "Power Backup", "Gym Access", "Covered Parking"],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, size: "1,100 sq ft" },
    coordinates: { lat: 12.7580, lng: 75.2050 }
  },
  {
    id: "7",
    title: "Bannur Orchard Cottage",
    location: "Bannur",
    category: "Cottage",
    allowedGuest: "Any",
    price: "₹7,500",
    priceValue: 7500,
    rating: 4.7,
    mainImage: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1461988320302-91badd636367?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A quiet cottage for those who prefer nature over city noise. Great for writers or students preparing for exams. \n\nAffordable rent with basic amenities. Own vehicle recommended.",
    amenities: ["Fruit Orchard", "Silence", "Water Heater", "Nature Trails", "Yoga Space"],
    specs: { guests: 4, bedrooms: 2, bathrooms: 2, size: "1,400 sq ft" },
    coordinates: { lat: 12.7600, lng: 75.1800 }
  },
  {
    id: "8",
    title: "Main Road Women's Hostel",
    location: "Main Road",
    category: "Hostel",
    allowedGuest: "Female",
    price: "₹5,000",
    priceValue: 5000,
    rating: 4.4,
    mainImage: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A secure women's hostel right on Main Road. Very close to colleges and bus stops. \n\nFeatures 24/7 security guard, CCTV, and hygienic mess food included in rent.",
    amenities: ["24/7 Security", "Mess Included", "Warden", "Study Hall", "Hot Water"],
    specs: { guests: 2, bedrooms: 1, bathrooms: 1, size: "500 sq ft" },
    coordinates: { lat: 12.7710, lng: 75.2040 }
  },
  {
    id: "9",
    title: "Padnoor Shared House",
    location: "Padnoor",
    category: "Cottage",
    allowedGuest: "Any",
    price: "₹6,000",
    priceValue: 6000,
    rating: 4.9,
    mainImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Affordable shared accommodation in Padnoor. \n\nGreat for students looking for a low-cost option with plenty of open space. Peaceful environment.",
    amenities: ["Field View", "Shared Kitchen", "Bicycle Parking", "Local Cuisine", "Open Deck"],
    specs: { guests: 6, bedrooms: 3, bathrooms: 3, size: "2,200 sq ft" },
    coordinates: { lat: 12.7480, lng: 75.1980 }
  },
  {
    id: "10",
    title: "Mundoor Studio",
    location: "Mundoor",
    category: "Apartment",
    allowedGuest: "Any",
    price: "₹6,500",
    priceValue: 6500,
    rating: 4.6,
    mainImage: "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1472224371017-08207f84aaae?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1505577058444-a3dab90d87b7?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1518732656745-d41c44e5627d?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Compact studio apartment in Mundoor. \n\nIdeal for a single professional. Comes with a small kitchenette and attached bath. Private and secure.",
    amenities: ["Kitchenette", "Private Terrace", "Work Chair", "Pet Friendly", "Water Heater"],
    specs: { guests: 1, bedrooms: 1, bathrooms: 1, size: "400 sq ft" },
    coordinates: { lat: 12.7850, lng: 75.2250 }
  },
  {
    id: "11",
    title: "Aryapu Men's PG",
    location: "Aryapu",
    category: "PG",
    allowedGuest: "Male",
    price: "₹4,000",
    priceValue: 4000,
    rating: 4.8,
    mainImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Premium men's PG in Aryapu with gym and recreation room. \n\nAttracts young professionals and students. Clean rooms with daily housekeeping.",
    amenities: ["Gym", "Recreation Room", "High Speed Wifi", "Washing Machine", "Biometric Entry"],
    specs: { guests: 6, bedrooms: 3, bathrooms: 4, size: "3,500 sq ft" },
    coordinates: { lat: 12.7650, lng: 75.2300 }
  },
  {
    id: "12",
    title: "Chikkamudnoor Family Home",
    location: "Chikkamudnoor",
    category: "Villa",
    allowedGuest: "Family",
    price: "₹9,000",
    priceValue: 9000,
    rating: 4.5,
    mainImage: "https://images.unsplash.com/photo-1598928636135-d146006ff4be?auto=format&fit=crop&q=80&w=800",
    galleryImages: [
      "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An independent house in Chikkamudnoor available for rent. \n\nQuiet neighborhood, perfect for a family. Close to schools and local market.",
    amenities: ["Car Parking", "Garden", "Semi-Furnished", "24/7 Water", "Family Friendly"],
    specs: { guests: 5, bedrooms: 2, bathrooms: 2, size: "1,200 sq ft" },
    coordinates: { lat: 12.7720, lng: 75.1850 }
  }
];
