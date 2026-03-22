export type Product = {
  id: string;
  artisanId: string;
  name: string;
  category: string;
  image: string;
  story: string;
  culturalSignificance: string;
  price: number;
  inStock: boolean;
  featured: boolean;
  craftingTime: string;
  dimensions: string;
  materials: string[];
};

export type Artisan = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  bio: string;
  specialty: string;
  rating: number;
  totalSales: number;
  verified: boolean;
};

export type Order = {
  id: string;
  customer: string;
  productName: string;
  amount: number;
  status: "pending" | "shipped" | "delivered";
  date: string;
};

export const artisans: Artisan[] = [
  {
    id: "a1",
    name: "Uwase Marie",
    location: "Kigali, Rwanda",
    avatar: "https://images.unsplash.com/photo-1594745561149-2211ca8c5d98?w=500&auto=format&fit=crop",
    bio: "I weave traditional baskets inspired by stories passed down through generations in my family.",
    specialty: "Baskets",
    rating: 4.9,
    totalSales: 742,
    verified: true,
  },
  {
    id: "a2",
    name: "Mutesi Grace",
    location: "Huye, Rwanda",
    avatar: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?w=500&auto=format&fit=crop",
    bio: "I shape pottery inspired by Imigongo motifs and the vessels used in traditional Rwandan homes.",
    specialty: "Pottery",
    rating: 4.8,
    totalSales: 598,
    verified: true,
  },
  {
    id: "a3",
    name: "Nkunda Jean",
    location: "Musanze, Rwanda",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop",
    bio: "I carve wildlife and heritage symbols from local wood, honoring Rwanda's landscapes and traditions.",
    specialty: "Wood Carving",
    rating: 4.7,
    totalSales: 481,
    verified: true,
  },
  {
    id: "a4",
    name: "Mukamana Alice",
    location: "Rubavu, Rwanda",
    avatar: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&auto=format&fit=crop",
    bio: "My textile pieces reinterpret the geometry of Imigongo and the colors of Lake Kivu sunsets.",
    specialty: "Textiles",
    rating: 4.8,
    totalSales: 436,
    verified: true,
  },
  {
    id: "a5",
    name: "Habimana Patrick",
    location: "Kigali, Rwanda",
    avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=500&auto=format&fit=crop",
    bio: "I craft jewelry inspired by Umushanana elegance and Intore dance symbolism.",
    specialty: "Jewelry",
    rating: 4.8,
    totalSales: 512,
    verified: true,
  },
  {
    id: "a6",
    name: "Nyiransabimana Sophie",
    location: "Ruhengeri, Rwanda",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop",
    bio: "I weave traditional blankets and market baskets using techniques taught by my grandmother.",
    specialty: "Weaving",
    rating: 4.9,
    totalSales: 689,
    verified: true,
  },
];

export const products: Product[] = [
  {
    id: "1",
    artisanId: "a1",
    name: "Agaseke Peace Basket - Traditional",
    category: "baskets",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1000&auto=format&fit=crop",
    story: "This Agaseke basket represents peace and unity in Rwandan culture. Traditionally given as wedding gifts, these baskets symbolize hope for a harmonious marriage.",
    culturalSignificance: "The Agaseke has long been a symbol of peace and hospitality in Rwanda.",
    price: 45,
    inStock: true,
    featured: true,
    craftingTime: "4-6 days",
    dimensions: "28cm x 28cm",
    materials: ["Sisal", "Natural dyes"],
  },
  {
    id: "2",
    artisanId: "a1",
    name: "Agaseke Peace Basket - Vibrant Colors",
    category: "baskets",
    image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=1000&auto=format&fit=crop",
    story: "A modern interpretation of the traditional Agaseke, featuring contemporary colors while preserving the sacred spiral pattern.",
    culturalSignificance: "Colors represent different aspects of Rwandan life, from hills to sunshine.",
    price: 52,
    inStock: true,
    featured: true,
    craftingTime: "4-6 days",
    dimensions: "30cm x 30cm",
    materials: ["Sisal", "Cotton thread", "Natural dyes"],
  },
  {
    id: "3",
    artisanId: "a2",
    name: "Imigongo Pattern Ceramic Bowl",
    category: "pottery",
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f5f8?w=1000&auto=format&fit=crop",
    story: "Inspired by ancient Imigongo art, this ceramic bowl features geometric patterns that have adorned Rwandan homes for centuries.",
    culturalSignificance: "Imigongo motifs are treasured as a unique artistic tradition in Rwanda.",
    price: 38,
    inStock: true,
    featured: false,
    craftingTime: "5-8 days",
    dimensions: "22cm diameter",
    materials: ["Clay", "Mineral pigments"],
  },
  {
    id: "4",
    artisanId: "a2",
    name: "Ikibindi Spirit Vessel",
    category: "pottery",
    image: "https://images.unsplash.com/photo-1578500351865-6c3700e42a5d?w=1000&auto=format&fit=crop",
    story: "Inspired by traditional Rwandan beer pots, this vessel is reimagined as a decorative piece that symbolizes unity in community gatherings.",
    culturalSignificance: "Traditional vessels were central to ceremonies and communal celebrations.",
    price: 65,
    inStock: true,
    featured: true,
    craftingTime: "6-9 days",
    dimensions: "26cm x 16cm",
    materials: ["Terracotta clay", "Natural slip"],
  },
  {
    id: "5",
    artisanId: "a3",
    name: "Mountain Gorilla Wood Sculpture",
    category: "woodwork",
    image: "https://images.unsplash.com/photo-1616627561950-9f746e330187?w=1000&auto=format&fit=crop",
    story: "Carved from a single piece of Umuvumu wood, this sculpture honors Rwanda's mountain gorillas and conservation heritage.",
    culturalSignificance: "Pays tribute to wildlife stewardship in Rwanda.",
    price: 85,
    inStock: true,
    featured: true,
    craftingTime: "8-12 days",
    dimensions: "34cm x 20cm",
    materials: ["Umuvumu wood", "Natural wax"],
  },
  {
    id: "6",
    artisanId: "a3",
    name: "Inzovu (Elephant) Walking Stick",
    category: "woodwork",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1000&auto=format&fit=crop",
    story: "A walking stick featuring an intricately carved elephant head, symbolizing wisdom and strength.",
    culturalSignificance: "Inspired by heirloom sticks passed down through families.",
    price: 72,
    inStock: true,
    featured: false,
    craftingTime: "7-10 days",
    dimensions: "95cm length",
    materials: ["Hardwood", "Hand-burnished oil"],
  },
  {
    id: "7",
    artisanId: "a4",
    name: "Imigongo Wall Hanging - Sunset",
    category: "textiles",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&auto=format&fit=crop",
    story: "Textile artwork recreating Imigongo geometry in sunset hues inspired by evenings over Lake Kivu.",
    culturalSignificance: "Blends traditional visual language with modern decor.",
    price: 95,
    inStock: true,
    featured: true,
    craftingTime: "6-8 days",
    dimensions: "70cm x 50cm",
    materials: ["Cotton", "Dyed thread"],
  },
  {
    id: "8",
    artisanId: "a4",
    name: "Kitenge Cushion Cover Set",
    category: "textiles",
    image: "https://images.unsplash.com/photo-1616627453761-6f20f8fda3ad?w=1000&auto=format&fit=crop",
    story: "A set of Kitenge cushion covers with patterns representing rainfall, crops, and celebration dances.",
    culturalSignificance: "Kitenge patterns carry symbolic meaning across East Africa.",
    price: 42,
    inStock: true,
    featured: false,
    craftingTime: "3-5 days",
    dimensions: "45cm x 45cm each",
    materials: ["Kitenge cotton"],
  },
  {
    id: "9",
    artisanId: "a5",
    name: "Umushanana Inspired Necklace",
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=1000&auto=format&fit=crop",
    story: "Beadwork necklace inspired by the elegant drape of the traditional Umushanana dress.",
    culturalSignificance: "Celebrates ceremonial elegance in Rwandan culture.",
    price: 55,
    inStock: true,
    featured: true,
    craftingTime: "2-4 days",
    dimensions: "Adjustable 42-52cm",
    materials: ["Glass beads", "Brass clasp"],
  },
  {
    id: "10",
    artisanId: "a5",
    name: "Intore Warrior Bracelet",
    category: "jewelry",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=1000&auto=format&fit=crop",
    story: "A bold bracelet echoing geometric motifs of Intore warrior dance regalia and ceremonial shields.",
    culturalSignificance: "Inspired by the rhythm and strength of Intore traditions.",
    price: 35,
    inStock: true,
    featured: false,
    craftingTime: "2-3 days",
    dimensions: "18-22cm adjustable",
    materials: ["Woven cord", "Beads", "Metal accents"],
  },
  {
    id: "11",
    artisanId: "a6",
    name: "Inkanda Traditional Blanket",
    category: "textiles",
    image: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1000&auto=format&fit=crop",
    story: "A woven blanket with traditional stripe patterns inspired by Lake Kivu blues and volcanic earth tones.",
    culturalSignificance: "Honors weaving traditions that have warmed Rwandan families for generations.",
    price: 78,
    inStock: true,
    featured: true,
    craftingTime: "7-10 days",
    dimensions: "180cm x 120cm",
    materials: ["Cotton", "Wool blend"],
  },
  {
    id: "12",
    artisanId: "a6",
    name: "Iseke Market Basket",
    category: "baskets",
    image: "https://images.unsplash.com/photo-1613323593608-abc90fec84ff?w=1000&auto=format&fit=crop",
    story: "A practical market basket inspired by the ones Rwandan women have carried gracefully for centuries.",
    culturalSignificance: "Represents everyday resilience and family tradition.",
    price: 28,
    inStock: true,
    featured: false,
    craftingTime: "3-4 days",
    dimensions: "35cm x 30cm",
    materials: ["Sisal", "Palm fiber"],
  },
];

export const orders: Order[] = [
  { id: "o1", customer: "Liam Carter", productName: "Agaseke Peace Basket - Traditional", amount: 45, status: "pending", date: "2026-03-15" },
  { id: "o2", customer: "Amelie Dubois", productName: "Umushanana Inspired Necklace", amount: 55, status: "shipped", date: "2026-03-13" },
  { id: "o3", customer: "Noah Patel", productName: "Mountain Gorilla Wood Sculpture", amount: 85, status: "delivered", date: "2026-03-10" },
];
