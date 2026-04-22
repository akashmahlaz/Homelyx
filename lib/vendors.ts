export type Vendor = {
  slug: string;
  name: string;
  specialty: string;
  location: string;
  city: string;
  emoji: string;
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
    emoji: "🍽️",
    rating: "4.9",
    orders: "200+",
    tag: "Top Rated",
    tagColor: "bg-amber-100 text-amber-700",
    headline: "Authentic South Indian breakfasts, made fresh every morning",
    story:
      "Meera has been cooking traditional South Indian food for 22 years. What started as feeding her family of six turned into a full-time passion when her neighbours started placing daily orders. She wakes up at 4 AM every morning to grind fresh idli batter, steam hot vadas, and pack piping-hot sambar into dabbas before the sun comes up. Every dish carries the warmth of a home kitchen — no shortcuts, no preservatives, just love.",
    since: "2021",
    items: ["Idli & Sambar", "Masala Dosa", "Rava Upma", "Pongal", "Vada"],
    slots: ["Morning"],
    badges: ["🌿 No preservatives", "🕐 Same-day prep", "🏠 Home kitchen"],
    searchCollection: "tiffins",
  },
  {
    slug: "the-bake-shack",
    name: "The Bake Shack",
    specialty: "Artisan Breads & Cakes",
    location: "Bandra, Mumbai",
    city: "Mumbai",
    emoji: "🥐",
    rating: "4.8",
    orders: "150+",
    tag: "Trending",
    tagColor: "bg-orange-100 text-orange-700",
    headline: "Slow-fermented sourdoughs and celebration cakes from a home oven",
    story:
      "Pooja left her corporate job in 2020 to pursue what she calls 'the most honest craft' — baking. Trained at a patisserie school in Pune, she now runs The Bake Shack from her apartment kitchen in Bandra. Her sourdough starter, named 'Bruno', is three years old. Every loaf is cold-fermented for 24 hours and baked in a cast-iron pot. She takes custom cake orders two weeks in advance and never compromises on real butter, fresh eggs, and unbleached flour.",
    since: "2020",
    items: [
      "Country Sourdough",
      "Croissant Basket",
      "Banana Walnut Bread",
      "Celebration Cakes",
      "Baguettes",
    ],
    slots: ["Morning", "Afternoon"],
    badges: ["🧈 Real butter", "🥚 Farm eggs", "⏰ 24h ferment"],
    searchCollection: "baked-goods",
  },
  {
    slug: "priyas-pickles",
    name: "Priya's Pickles",
    specialty: "Homemade Preserves",
    location: "T. Nagar, Chennai",
    city: "Chennai",
    emoji: "🫙",
    rating: "5.0",
    orders: "100+",
    tag: "Fan Favourite",
    tagColor: "bg-green-100 text-green-700",
    headline: "Traditional Tamil pickle recipes passed down three generations",
    story:
      "Priya learned to make pickles from her grandmother, who would spend entire summers pickling raw mangoes, gooseberries, and dried chilies. Armed with a spiral notebook full of handwritten recipes and a fierce commitment to using no artificial preservatives, Priya ships her jars across India. Each batch is sun-dried for 2–3 days before mixing and sealed in airtight glass jars. Her mango thokku regularly sells out within hours of being listed.",
    since: "2022",
    items: [
      "Mango Thokku",
      "Gooseberry Pickle",
      "Green Chilli Pickle",
      "Lemon Pickle",
      "Garlic Pickle",
    ],
    slots: ["Afternoon", "Evening"],
    badges: ["☀️ Sun-dried", "🚫 No preservatives", "🫙 Glass jars"],
    searchCollection: "pickles",
  },
  {
    slug: "rajma-house",
    name: "Rajma House",
    specialty: "North Indian Curries",
    location: "Lajpat Nagar, Delhi",
    city: "Delhi",
    emoji: "🍛",
    rating: "4.7",
    orders: "180+",
    tag: "New Arrival",
    tagColor: "bg-sky-100 text-sky-700",
    headline: "Comforting North Indian curries that taste like Dilli ki maa ka khana",
    story:
      "Sunita Devi has been cooking Punjabi food for 30 years, but only started selling it in 2023. Her rajma-chawal became the stuff of legend in her apartment complex — neighbours would knock with steel tiffins, hoping for leftovers. Today she runs Rajma House with her daughter Neha, who handles the orders while Sunita manages the cooking. The rajma soaks overnight and simmers for four hours in a pressure cooker on a wood-charcoal stove for that unmistakeable smoky depth.",
    since: "2023",
    items: [
      "Rajma Chawal",
      "Dal Makhani",
      "Chole",
      "Paneer Butter Masala",
      "Aloo Paratha",
    ],
    slots: ["Afternoon", "Evening", "Night"],
    badges: ["🔥 Slow cooked", "🌾 Whole spices", "🏠 Home kitchen"],
    searchCollection: "curries",
  },
];

export function getVendorBySlug(slug: string): Vendor | undefined {
  return VENDORS.find((v) => v.slug === slug);
}
