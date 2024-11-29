import { InferInsertModel } from 'drizzle-orm';
import {
  serial,
  text,
  pgTable,
  uniqueIndex,
  integer,
  timestamp,
  boolean,
  decimal
} from 'drizzle-orm/pg-core';

// Users Table with isAdmin attribute
export const users = pgTable(
  'users',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    password: text('password').notNull(),
    isAdmin: boolean('isAdmin').default(false).notNull(), // Default is false, except for you
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email),
    };
  },
);

// Clients Table
export const clients = pgTable(
  'clients',
  {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    lastName: text('lastName').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').notNull(), // Optional, can be used for contact
  },
  (clients) => {
    return {
      uniqueIdx: uniqueIndex('unique_email_clients_idx').on(clients.email),
    };
  },
);

// Reservations Table with new attributes
export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  clientId: integer('clientId')
    .references(() => clients.id)
    .notNull(), // Foreign key referencing the client who made the reservation
  hotelName: text('hotelName').notNull(), // Hotel name
  plan: text("plan").notNull(), // Reservation plan
  checkIn: timestamp('checkIn').notNull(), // Check-in date/time
  checkOut: timestamp('checkOut').notNull(), // Check-out date/time
  amountOfNights: integer('amountOfNights').notNull(), // Number of nights (integer)
  amountOfAdults: integer('amountOfAdults').notNull(), // Number of adults (integer)
  childrenAges: integer('amountOfAdults').array().notNull(), // children ages (integer[])
  reservationDate: timestamp('reservationDate').notNull(), // Date of the reservation
  pricesGrid: text('pricesGrid').notNull(), // Store the prices grid as a string
});

export type NewUser = InferInsertModel<typeof users>;
export type NewClient = InferInsertModel<typeof clients>;
export type NewReservation = InferInsertModel<typeof reservations>;
