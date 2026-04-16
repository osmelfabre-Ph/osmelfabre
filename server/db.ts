import { eq, desc, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, photos, contacts, InsertPhoto, InsertContact, pdfs, InsertPdf, Pdf, purchases, InsertPurchase, subscribers, InsertSubscriber } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── PHOTOS ────────────────────────────────────────────────────────────────────

export async function getGalleryPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(photos)
    .where(and(eq(photos.type, "gallery"), eq(photos.active, true)))
    .orderBy(photos.sortOrder, photos.createdAt);
}

export async function getHeroPhotoByPage(page: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(photos)
    .where(and(eq(photos.type, "hero"), eq(photos.page, page), eq(photos.active, true)))
    .limit(1);
  return result[0] ?? null;
}

export async function getAllPhotos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(photos).orderBy(desc(photos.createdAt));
}

export async function insertPhoto(data: InsertPhoto) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(photos).values(data);
}

export async function deletePhoto(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(photos).where(eq(photos.id, id));
}

// ── CONTACTS ──────────────────────────────────────────────────────────────────

export async function insertContact(data: InsertContact) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(contacts).values(data);
}

export async function getAllContacts() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(contacts).orderBy(desc(contacts.createdAt));
}

export async function markContactRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(contacts).set({ read: true }).where(eq(contacts.id, id));
}

// ── PDFs ────────────────────────────────────────────────────────────────────────────────

export async function getAllPdfs() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(pdfs).where(eq(pdfs.active, true)).orderBy(desc(pdfs.createdAt));
}

export async function getLatestPdf(): Promise<Pdf | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(pdfs)
    .where(and(eq(pdfs.isLatest, true), eq(pdfs.active, true)))
    .limit(1);
  return result[0] ?? null;
}

export async function getPdfById(id: number): Promise<Pdf | null> {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(pdfs).where(eq(pdfs.id, id)).limit(1);
  return result[0] ?? null;
}

export async function insertPdf(data: InsertPdf) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(pdfs).values(data);
}

export async function updatePdf(id: number, data: Partial<InsertPdf>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(pdfs).set(data).where(eq(pdfs.id, id));
}

export async function setLatestPdf(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  // Unset all, then set the chosen one
  await db.update(pdfs).set({ isLatest: false });
  await db.update(pdfs).set({ isLatest: true }).where(eq(pdfs.id, id));
}

export async function deletePdf(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.update(pdfs).set({ active: false }).where(eq(pdfs.id, id));
}

// ── PURCHASES ───────────────────────────────────────────────────────────────────────

export async function insertPurchase(data: InsertPurchase) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.insert(purchases).values(data);
}

export async function getPurchaseBySessionId(sessionId: string) {
  const db = await getDb();
  if (!db) return null;
  const result = await db.select().from(purchases)
    .where(eq(purchases.stripeSessionId, sessionId))
    .limit(1);
  return result[0] ?? null;
}

export async function incrementDownloadCount(sessionId: string) {
  const db = await getDb();
  if (!db) return;
  const purchase = await getPurchaseBySessionId(sessionId);
  if (!purchase) return;
  await db.update(purchases)
    .set({ downloadCount: purchase.downloadCount + 1 })
    .where(eq(purchases.stripeSessionId, sessionId));
}

export async function getAllPurchases() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(purchases).orderBy(desc(purchases.createdAt));
}

// ── SUBSCRIBERS ─────────────────────────────────────────────────────────────────────

export async function insertSubscriber(data: InsertSubscriber) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  try {
    await db.insert(subscribers).values(data);
    return { alreadyExists: false };
  } catch (e: any) {
    if (e?.code === 'ER_DUP_ENTRY') return { alreadyExists: true };
    throw e;
  }
}

export async function getAllSubscribers() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(subscribers).orderBy(desc(subscribers.createdAt));
}
