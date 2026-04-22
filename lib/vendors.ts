export type Vendor = {
  slug: string;
  name: string;
  specialty: string;
  location: string;
  city: string;
  image: string;
  avatar: string;
  rating: string;
  orders: string;
  tag: string;
  tagColor: string;
  headline: string;
  story: string;
  since: string;
  items: string[];
  slots: string[];
  badges: string[];
  searchCollection: string;
};

export const VENDORS: Vendor[] = [
  {
    slug: "meeras-kitchen",
    name: "Meera's Kitchen",
    specialty: "South Indian Tiffins",
    location: "Jayanagar, Bengaluru",
    city: "Bengaluru",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    rating: "4.9",
    orders: "200+",
    tag: "Top Rated",
    tagColor: "bg-amber-100 text-amber-700",
    headline:
      "Authentic South Indian breakfasts, made fresh every morning",
    story:
      "Meera has been cooking traditional South Indian food for 22 years. What started as feeding her family of six turned into a full-time passion when her neighbours started placing daily orders.",
    since: "2021",
    items: ["Idli & Sambar", "Masala Dosa", "Rava Upma", "Pongal", "Vada"],
    slots: ["Morning"],
    badges: ["No preservatives", "Same-day prep", "Home kitchen"],
    searchCollection: "tiffins",
  },
  {
    slug: "the-bake-shack",
    name: "The Bake Shack",
    specialty: "Artisan Breads & Cakes",
    location: "Bandra, Mumbai",
    city: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
    rating: "4.8",
    orders: "150+",
    tag: "Trending",
    tagColor: "bg-orange-100 text-orange-700",
    headline:
      "Slow-fermented sourdoughs and celebration cakes from a home oven",
    story:
      "Pooja left her corporate job in 2020 to pursue what she calls 'the most honest craft' — baking. Trained at a patisserie school in Pune, she now runs The Bake Shack from her apartment kitchen.",
    since: "2020",
    items: [
      "Country Sourdough",
      "Croissant Basket",
      "Banana Walnut Bread",
      "Celebration Cakes",
      "Baguettes",
    ],
    slots: ["Morning", "Afternoon"],
    badges: ["Real butter", "Farm eggs", "24h ferment"],
    searchCollection: "baked-goods",
  },
  {
    slug: "priyas-pickles",
    name: "Priya's Pickles",
    specialty: "Homemade Preserves",
    location: "T. Nagar, Chennai",
    city: "Chennai",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    rating: "5.0",
    orders: "100+",
    tag: "Fan Favourite",
    tagColor: "bg-emerald-100 text-emerald-700",
    headline:
      "Traditional Tamil pickle recipes passed down three generations",
    story:
      "Priya learned to make pickles from her grandmother. Each batch is sun-dried for 2–3 days before mixing and sealed in airtight glass jars. Her mango thokku regularly sells out within hours.",
    since: "2022",
    items: [
      "Mango Thokku",
      "Gooseberry Pickle",
      "Green Chilli Pickle",
      "Lemon Pickle",
      "Garlic Pickle",
    ],
    slots: ["Afternoon", "Evening"],
    badges: ["Sun-dried", "No preservatives", "Glass jars"],
    searchCollection: "pickles",
  },
  {
    slug: "rajma-house",
    name: "Rajma House",
    specialty: "North Indian Curries",
    location: "Lajpat Nagar, Delhi",
    city: "Delhi",
    image:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=800&q=80",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    rating: "4.7",
    orders: "180+",
    tag: "New Arrival",
    tagColor: "bg-sky-100 text-sky-700",
    headline:
      "Comforting North Indian curries that taste like Dilli ki maa ka khana",
    story:
      "Sunita Devi has been cooking Punjabi food for 30 years. The rajma soaks overnight and simmers for four hours for that unmistakeable smoky depth.",
    since: "2023",
    items: [
      "Rajma Chawal",
      "Dal Makhani",
      "Chole",
      "Paneer Butter Masala",
      "Aloo Paratha",
    ],
    slots: ["Afternoon", "Evening", "Night"],
    badges: ["Slow cooked", "Whole spices", "Home kitchen"],
    searchCollection: "curries",
  },
];

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}
