import {
    boolean,
    date,
    index,
    integer,
    jsonb,
    numeric,
    pgEnum,
    pgTable,
    primaryKey,
    text,
    timestamp,
    uniqueIndex,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

/* ─────────────────  ENUMS  ───────────────── */

export const userRole = pgEnum("user_role", ["customer", "vendor", "admin"]);
export const vendorStatus = pgEnum("vendor_status", [
  "applied",
  "kyc_pending",
  "approved",
  "suspended",
  "rejected",
]);
export const productStatus = pgEnum("product_status", ["draft", "active", "paused", "archived"]);
export const slotKind = pgEnum("slot_kind", ["breakfast", "lunch", "snacks", "dinner"]);
export const orderStatus = pgEnum("order_status", [
  "pending_payment",
  "placed",
  "accepted",
  "preparing",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refunded",
]);
export const paymentStatus = pgEnum("payment_status", [
  "created",
  "authorized",
  "captured",
  "failed",
  "refunded",
]);
export const paymentMethod = pgEnum("payment_method", ["upi", "card", "netbanking", "wallet", "cod"]);
export const addressKind = pgEnum("address_kind", ["home", "work", "other"]);

/* ─────────────────  USERS  ───────────────── */

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    phone: varchar("phone", { length: 16 }).notNull(),
    name: varchar("name", { length: 120 }),
    email: varchar("email", { length: 200 }),
    role: userRole("role").notNull().default("customer"),
    avatarUrl: text("avatar_url"),
    isPhoneVerified: boolean("is_phone_verified").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("users_phone_uq").on(t.phone)],
);

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

/* ─────────────────  ADDRESSES  ───────────────── */

export const addresses = pgTable(
  "addresses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    kind: addressKind("kind").notNull().default("home"),
    line1: varchar("line1", { length: 200 }).notNull(),
    line2: varchar("line2", { length: 200 }),
    landmark: varchar("landmark", { length: 200 }),
    city: varchar("city", { length: 80 }).notNull(),
    state: varchar("state", { length: 80 }).notNull(),
    pincode: varchar("pincode", { length: 10 }).notNull(),
    lat: numeric("lat", { precision: 9, scale: 6 }),
    lng: numeric("lng", { precision: 9, scale: 6 }),
    isDefault: boolean("is_default").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("addresses_user_idx").on(t.userId)],
);

/* ─────────────────  VENDORS / KITCHENS  ───────────────── */

export const vendors = pgTable(
  "vendors",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    ownerId: uuid("owner_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    handle: varchar("handle", { length: 80 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    tagline: varchar("tagline", { length: 240 }),
    bio: text("bio"),
    avatarUrl: text("avatar_url"),
    coverUrl: text("cover_url"),
    cuisines: jsonb("cuisines").$type<string[]>().notNull().default([]),
    isVeg: boolean("is_veg").notNull().default(false),
    fssaiLicense: varchar("fssai_license", { length: 40 }),
    fssaiVerifiedAt: timestamp("fssai_verified_at", { withTimezone: true }),
    status: vendorStatus("status").notNull().default("applied"),
    city: varchar("city", { length: 80 }).notNull(),
    pincode: varchar("pincode", { length: 10 }).notNull(),
    lat: numeric("lat", { precision: 9, scale: 6 }),
    lng: numeric("lng", { precision: 9, scale: 6 }),
    serviceRadiusKm: integer("service_radius_km").notNull().default(5),
    rating: numeric("rating", { precision: 3, scale: 2 }).notNull().default("0"),
    ratingCount: integer("rating_count").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("vendors_handle_uq").on(t.handle),
    index("vendors_city_idx").on(t.city),
    index("vendors_status_idx").on(t.status),
  ],
);

export type Vendor = typeof vendors.$inferSelect;

/* ─────────────────  PRODUCTS  ───────────────── */

export const products = pgTable(
  "products",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => vendors.id, { onDelete: "cascade" }),
    handle: varchar("handle", { length: 120 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    /** price in paise (integer) */
    priceInPaise: integer("price_in_paise").notNull(),
    /** optional MRP for strike-through */
    mrpInPaise: integer("mrp_in_paise"),
    isVeg: boolean("is_veg").notNull().default(true),
    spiceLevel: integer("spice_level").default(1), // 0..3
    portionLabel: varchar("portion_label", { length: 60 }), // "Serves 2", "350g"
    tags: jsonb("tags").$type<string[]>().notNull().default([]),
    /** cuisines, dietary, allergens */
    allergens: jsonb("allergens").$type<string[]>().notNull().default([]),
    /** which slot kinds this is available in */
    availableIn: jsonb("available_in").$type<("breakfast"|"lunch"|"snacks"|"dinner")[]>()
      .notNull().default([]),
    status: productStatus("status").notNull().default("active"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("products_vendor_handle_uq").on(t.vendorId, t.handle),
    index("products_status_idx").on(t.status),
  ],
);

export type Product = typeof products.$inferSelect;

/* ─────────────────  SLOTS / INVENTORY  ───────────────── */

/** A specific slot for a vendor on a calendar date (e.g. 2025-01-20 lunch). */
export const slots = pgTable(
  "slots",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => vendors.id, { onDelete: "cascade" }),
    date: date("date").notNull(),
    kind: slotKind("kind").notNull(),
    /** ISO local time strings, e.g. "12:30" */
    startTime: varchar("start_time", { length: 5 }).notNull(),
    endTime: varchar("end_time", { length: 5 }).notNull(),
    cutoffAt: timestamp("cutoff_at", { withTimezone: true }).notNull(),
    capacity: integer("capacity").notNull(),
    booked: integer("booked").notNull().default(0),
    isOpen: boolean("is_open").notNull().default(true),
  },
  (t) => [
    uniqueIndex("slots_vendor_date_kind_uq").on(t.vendorId, t.date, t.kind),
    index("slots_date_idx").on(t.date),
  ],
);

/** Per-product availability inside a slot (sold-out tracking). */
export const slotProducts = pgTable(
  "slot_products",
  {
    slotId: uuid("slot_id")
      .notNull()
      .references(() => slots.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull(),
    sold: integer("sold").notNull().default(0),
  },
  (t) => [primaryKey({ columns: [t.slotId, t.productId] })],
);

/* ─────────────────  ORDERS  ───────────────── */

export const orders = pgTable(
  "orders",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    /** human-readable code, e.g. HMX-2401-AB12 */
    code: varchar("code", { length: 20 }).notNull(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "restrict" }),
    vendorId: uuid("vendor_id")
      .notNull()
      .references(() => vendors.id, { onDelete: "restrict" }),
    slotId: uuid("slot_id")
      .notNull()
      .references(() => slots.id, { onDelete: "restrict" }),
    addressId: uuid("address_id")
      .notNull()
      .references(() => addresses.id, { onDelete: "restrict" }),
    /** snapshot of address at time of order */
    addressSnapshot: jsonb("address_snapshot").$type<Record<string, unknown>>().notNull(),
    subtotalInPaise: integer("subtotal_in_paise").notNull(),
    deliveryFeeInPaise: integer("delivery_fee_in_paise").notNull().default(0),
    discountInPaise: integer("discount_in_paise").notNull().default(0),
    taxInPaise: integer("tax_in_paise").notNull().default(0),
    totalInPaise: integer("total_in_paise").notNull(),
    status: orderStatus("status").notNull().default("pending_payment"),
    notes: text("notes"),
    placedAt: timestamp("placed_at", { withTimezone: true }),
    deliveredAt: timestamp("delivered_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("orders_code_uq").on(t.code),
    index("orders_user_idx").on(t.userId),
    index("orders_vendor_idx").on(t.vendorId),
    index("orders_slot_idx").on(t.slotId),
    index("orders_status_idx").on(t.status),
  ],
);

export type Order = typeof orders.$inferSelect;

export const orderItems = pgTable(
  "order_items",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "restrict" }),
    titleSnapshot: varchar("title_snapshot", { length: 200 }).notNull(),
    imageSnapshot: text("image_snapshot"),
    unitPriceInPaise: integer("unit_price_in_paise").notNull(),
    quantity: integer("quantity").notNull(),
    lineTotalInPaise: integer("line_total_in_paise").notNull(),
  },
  (t) => [index("order_items_order_idx").on(t.orderId)],
);

/* ─────────────────  PAYMENTS  ───────────────── */

export const payments = pgTable(
  "payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    orderId: uuid("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    /** Razorpay order id (order_xxx) */
    rzpOrderId: varchar("rzp_order_id", { length: 64 }).notNull(),
    /** Razorpay payment id (pay_xxx) */
    rzpPaymentId: varchar("rzp_payment_id", { length: 64 }),
    rzpSignature: text("rzp_signature"),
    method: paymentMethod("method"),
    amountInPaise: integer("amount_in_paise").notNull(),
    status: paymentStatus("status").notNull().default("created"),
    rawWebhook: jsonb("raw_webhook").$type<Record<string, unknown>>(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("payments_rzp_order_uq").on(t.rzpOrderId),
    index("payments_order_idx").on(t.orderId),
  ],
);

/* ─────────────────  REVIEWS  ───────────────── */

export const reviews = pgTable(
  "reviews",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    vendorId: uuid("vendor_id").notNull().references(() => vendors.id, { onDelete: "cascade" }),
    orderId: uuid("order_id").references(() => orders.id, { onDelete: "set null" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "set null" }),
    rating: integer("rating").notNull(), // 1..5
    body: text("body"),
    images: jsonb("images").$type<string[]>().notNull().default([]),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("reviews_vendor_idx").on(t.vendorId),
    index("reviews_user_idx").on(t.userId),
  ],
);

/* ─────────────────  FAVORITES  ───────────────── */

export const favorites = pgTable(
  "favorites",
  {
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
    vendorId: uuid("vendor_id").references(() => vendors.id, { onDelete: "cascade" }),
    productId: uuid("product_id").references(() => products.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("favorites_user_idx").on(t.userId),
  ],
);

/* ─────────────────  OTP CHALLENGES (audit)  ───────────────── */

export const otpChallenges = pgTable(
  "otp_challenges",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    phone: varchar("phone", { length: 16 }).notNull(),
    /** Twilio Verify SID for this challenge */
    twilioSid: varchar("twilio_sid", { length: 64 }),
    status: varchar("status", { length: 20 }).notNull().default("pending"),
    attempts: integer("attempts").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    verifiedAt: timestamp("verified_at", { withTimezone: true }),
  },
  (t) => [index("otp_phone_idx").on(t.phone)],
);
