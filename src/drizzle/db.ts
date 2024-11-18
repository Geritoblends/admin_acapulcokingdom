import '@/drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { sql } from '@vercel/postgres';
import { users, NewUser, NewClient, clients, NewReservation, reservations } from './schema';
import * as schema from './schema';
import { eq, like } from 'drizzle-orm';

export const db = drizzle(sql, { schema });

export const insertUser = async (user: NewUser) => {
  return db.insert(users).values(user).returning();
};

export const insertClient = async (client: NewClient) => {
  return db.insert(clients).values(client).returning();
};

export const insertReservation = async (reservation: NewReservation) => {
  return db.insert(reservations).values(reservation).returning();
};

export const getPaginatedClients = async (prefix: string, page: number, pageSize: number) => {
  const offset = (page - 1) * pageSize;

  return db.select().from(clients).where(like(clients.name, `${prefix}%`)).limit(pageSize).offset(offset)
};

export const deleteClient = async (id: number) => {
  return db.delete(clients).where(eq(clients.id, id))
}

export const updateClient = async (id: number, name?: string, email?: string, phoneNumber?: string) => {
  const updates: Record<string, string | undefined> = {};

  if (name) updates.name = name;
  if (email) updates.email = email;
  if (phoneNumber) updates.phoneNumber = phoneNumber;

  // Ensure there is at least one field to update
  if (Object.keys(updates).length === 0) {
    throw new Error("No fields provided to update");
  }
  return db.update(clients).set(updates).where(eq(clients.id, id)).returning()
}