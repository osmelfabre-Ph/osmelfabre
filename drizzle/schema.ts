import { boolean, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Photos table — stores gallery images and hero images for each page.
 * type: "gallery" | "hero"
 * page: for hero images, identifies which page (e.g. "home", "chi-sono", "il-metodo", "servizi-donna", "servizi-uomo", "formazione", "contatti")
 */
export const photos = mysqlTable("photos", {
  id: int("id").autoincrement().primaryKey(),
  url: text("url").notNull(),
  fileKey: text("fileKey").notNull(),
  type: mysqlEnum("type", ["gallery", "hero"]).notNull(),
  page: varchar("page", { length: 64 }),
  subject: varchar("subject", { length: 128 }),
  category: mysqlEnum("category", ["Uomo", "Donna"]).default("Uomo"),
  sortOrder: int("sortOrder").default(0),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Photo = typeof photos.$inferSelect;
export type InsertPhoto = typeof photos.$inferInsert;

/**
 * Contact form submissions
 */
export const contacts = mysqlTable("contacts", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 64 }).notNull(),
  message: text("message").notNull(),
  read: boolean("read").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Contact = typeof contacts.$inferSelect;
export type InsertContact = typeof contacts.$inferInsert;

/**
 * PDFs table — stores downloadable PDF products managed from admin.
 * isLatest: only one PDF can be the "latest" (shown as primary download after payment).
 * stripePaymentLink: Stripe Payment Link URL for this specific PDF.
 * coverUrl: CDN URL of the cover image shown in the archive.
 */
export const pdfs = mysqlTable("pdfs", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  pdfUrl: text("pdfUrl").notNull(),
  pdfKey: text("pdfKey").notNull(),
  coverUrl: text("coverUrl"),
  coverKey: text("coverKey"),
  previewUrl: text("previewUrl"),
  previewKey: text("previewKey"),
  stripePaymentLink: text("stripePaymentLink"),
  stripeProductId: varchar("stripeProductId", { length: 128 }),
  stripePriceId: varchar("stripePriceId", { length: 128 }),
  price: varchar("price", { length: 32 }).default("0"),
  isFree: boolean("isFree").default(false).notNull(),
  isLatest: boolean("isLatest").default(false).notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Pdf = typeof pdfs.$inferSelect;
export type InsertPdf = typeof pdfs.$inferInsert;

/**
 * Purchases table — records verified Stripe payments.
 * Stores the Stripe session ID to verify access to the download page.
 * sessionId is passed as a query param on the success_url and verified server-side.
 */
export const purchases = mysqlTable("purchases", {
  id: int("id").autoincrement().primaryKey(),
  stripeSessionId: varchar("stripeSessionId", { length: 256 }).notNull().unique(),
  pdfId: int("pdfId").notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  customerName: varchar("customerName", { length: 256 }),
  downloadCount: int("downloadCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Purchase = typeof purchases.$inferSelect;
export type InsertPurchase = typeof purchases.$inferInsert;

/**
 * Newsletter subscribers
 */
export const subscribers = mysqlTable("subscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  name: varchar("name", { length: 256 }),
  source: varchar("source", { length: 64 }).default("website"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Subscriber = typeof subscribers.$inferSelect;
export type InsertSubscriber = typeof subscribers.$inferInsert;

export const ebooks = mysqlTable("ebooks", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  fileKey: text("fileKey").notNull(),
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Ebook = typeof ebooks.$inferSelect;
export type InsertEbook = typeof ebooks.$inferInsert;