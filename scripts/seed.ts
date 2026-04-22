/**
 * Seed dev data into the database.
 * Usage:  bun tsx scripts/seed.ts
 *    or:  bun run db:seed
 */
import { db } from "@/lib/db";
import {
    addresses,
    products,
    slots,
    users,
    vendors,
} from "@/lib/db/schema";
import "dotenv/config";

const VENDORS = [
  {
    handle: "meeras-kitchen",
    name: "Meera's Kitchen",
    bio: "Authentic South Indian breakfasts cooked daily by Meera in Bengaluru.",
    cuisines: ["South Indian", "Breakfast"],
    isVeg: true,
    city: "Bengaluru",
    pincode: "560001",
    avatarUrl:
      "https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1200&q=80",
    products: [
      {
        handle: "masala-dosa",
        title: "Masala Dosa (2 pcs)",
        description: "Crispy ghee dosa with potato masala, sambar & chutney.",
        priceInPaise: 14900,
        availableIn: ["breakfast"] as const,
        images: ["https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=800&q=80"],
        portionLabel: "Serves 1",
        tags: ["popular", "breakfast"],
      },
      {
        handle: "idli-sambar",
        title: "Idli Sambar (4 pcs)",
        description: "Soft steamed idlis with hot sambar and coconut chutney.",
        priceInPaise: 11900,
        availableIn: ["breakfast"] as const,
        images: ["https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&q=80"],
        portionLabel: "Serves 1",
        tags: ["healthy", "veg"],
      },
      {
        handle: "filter-coffee",
        title: "Filter Coffee",
        description: "Strong south indian filter coffee in tumbler-dabarah style.",
        priceInPaise: 5900,
        availableIn: ["breakfast", "snacks"] as const,
        images: ["https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80"],
        portionLabel: "200ml",
        tags: ["beverage"],
      },
    ],
  },
  {
    handle: "anitas-tiffin",
    name: "Anita's Tiffin Service",
    bio: "Wholesome Maharashtrian thalis, made with love.",
    cuisines: ["Maharashtrian", "Thali"],
    isVeg: true,
    city: "Pune",
    pincode: "411001",
    avatarUrl:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=1200&q=80",
    products: [
      {
        handle: "veg-thali",
        title: "Maharashtrian Veg Thali",
        description: "Bhaji, dal, rice, 4 chapatis, salad, sweet & papad.",
        priceInPaise: 22900,
        availableIn: ["lunch", "dinner"] as const,
        images: ["https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80"],
        portionLabel: "Full meal",
        tags: ["thali", "wholesome"],
      },
      {
        handle: "puran-poli",
        title: "Puran Poli (2 pcs)",
        description: "Sweet stuffed flatbread with jaggery & lentils.",
        priceInPaise: 16900,
        availableIn: ["lunch"] as const,
        images: ["https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80"],
        portionLabel: "Serves 1",
        tags: ["festive"],
      },
    ],
  },
  {
    handle: "priyas-bengali-rasoi",
    name: "Priya's Bengali Rasoi",
    bio: "Authentic Bengali curries — from a Kolkata grandmother's recipes.",
    cuisines: ["Bengali", "Seafood"],
    isVeg: false,
    city: "Kolkata",
    pincode: "700001",
    avatarUrl:
      "https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?w=400&q=80",
    coverUrl:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=1200&q=80",
    products: [
      {
        handle: "macher-jhol",
        title: "Macher Jhol with Rice",
        description: "Light Bengali fish curry served with steamed rice.",
        priceInPaise: 26900,
        availableIn: ["lunch", "dinner"] as const,
        images: ["https://images.unsplash.com/photo-1626777553635-77b9c8b96b85?w=800&q=80"],
        portionLabel: "Serves 1",
        tags: ["non-veg", "fish"],
      },
      {
        handle: "kosha-mangsho",
        title: "Kosha Mangsho",
        description: "Slow-cooked spicy Bengali mutton curry. Sunday special.",
        priceInPaise: 32900,
        availableIn: ["lunch"] as const,
        images: ["https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=80"],
        portionLabel: "Serves 1",
        tags: ["non-veg", "mutton", "spicy"],
      },
    ],
  },
];

const SLOT_TIMES: Record<
  "breakfast" | "lunch" | "snacks" | "dinner",
  { start: string; end: string; cutoffMinutes: number }
> = {
  breakfast: { start: "07:30", end: "09:30", cutoffMinutes: 60 * 12 },
  lunch: { start: "12:30", end: "14:00", cutoffMinutes: 60 * 3 },
  snacks: { start: "16:30", end: "18:00", cutoffMinutes: 60 * 2 },
  dinner: { start: "19:30", end: "21:30", cutoffMinutes: 60 * 3 },
};

async function seed() {
  console.log("→ Seeding users...");
  const [meera] = await db
    .insert(users)
    .values({ phone: "+919000000001", name: "Meera S", role: "vendor", isPhoneVerified: true })
    .onConflictDoNothing({ target: users.phone })
    .returning();
  const [anita] = await db
    .insert(users)
    .values({ phone: "+919000000002", name: "Anita P", role: "vendor", isPhoneVerified: true })
    .onConflictDoNothing({ target: users.phone })
    .returning();
  const [priya] = await db
    .insert(users)
    .values({ phone: "+919000000003", name: "Priya G", role: "vendor", isPhoneVerified: true })
    .onConflictDoNothing({ target: users.phone })
    .returning();
  const [customer] = await db
    .insert(users)
    .values({ phone: "+919999988888", name: "Test Customer", role: "customer", isPhoneVerified: true })
    .onConflictDoNothing({ target: users.phone })
    .returning();
  const [admin] = await db
    .insert(users)
    .values({ phone: "+919999900000", name: "Admin", role: "admin", isPhoneVerified: true })
    .onConflictDoNothing({ target: users.phone })
    .returning();

  const vendorOwners = [meera, anita, priya];
  if (vendorOwners.some((u) => !u)) {
    console.log("  (some users already existed; rerun on a fresh DB for full seed)");
    return;
  }
  if (customer) {
    await db
      .insert(addresses)
      .values({
        userId: customer.id,
        kind: "home",
        line1: "42 MG Road, 3rd Floor",
        city: "Bengaluru",
        state: "Karnataka",
        pincode: "560001",
        isDefault: true,
      })
      .onConflictDoNothing();
  }
  console.log("  ✓ admin id:", admin?.id);

  console.log("→ Seeding vendors + products + slots...");
  for (let i = 0; i < VENDORS.length; i++) {
    const v = VENDORS[i]!;
    const owner = vendorOwners[i]!;
    const [vendor] = await db
      .insert(vendors)
      .values({
        ownerId: owner.id,
        handle: v.handle,
        name: v.name,
        bio: v.bio,
        cuisines: v.cuisines,
        isVeg: v.isVeg,
        city: v.city,
        pincode: v.pincode,
        avatarUrl: v.avatarUrl,
        coverUrl: v.coverUrl,
        status: "approved",
        rating: "4.80",
        ratingCount: 25 + i * 7,
      })
      .onConflictDoNothing({ target: vendors.handle })
      .returning();
    if (!vendor) {
      console.log(`  - ${v.handle} already exists; skipping`);
      continue;
    }

    for (const p of v.products) {
      await db
        .insert(products)
        .values({
          vendorId: vendor.id,
          handle: p.handle,
          title: p.title,
          description: p.description,
          priceInPaise: p.priceInPaise,
          images: p.images,
          isVeg: v.isVeg,
          spiceLevel: 1,
          portionLabel: p.portionLabel,
          tags: p.tags,
          availableIn: [...p.availableIn],
          status: "active",
        })
        .onConflictDoNothing();
    }

    // 7 days of slots, all 4 kinds
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    for (let d = 0; d < 7; d++) {
      const day = new Date(today.getTime() + d * 86400_000).toISOString().slice(0, 10);
      for (const kind of ["breakfast", "lunch", "snacks", "dinner"] as const) {
        const cfg = SLOT_TIMES[kind];
        const startAt = new Date(`${day}T${cfg.start}:00.000Z`);
        await db
          .insert(slots)
          .values({
            vendorId: vendor.id,
            date: day,
            kind,
            startTime: cfg.start,
            endTime: cfg.end,
            cutoffAt: new Date(startAt.getTime() - cfg.cutoffMinutes * 60_000),
            capacity: 20,
            booked: 0,
            isOpen: true,
          })
          .onConflictDoNothing();
      }
    }
    console.log(`  ✓ ${vendor.handle}`);
  }

  console.log("✅ Seed complete");
}

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
