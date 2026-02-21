import {
    pgTable,
    serial,
    varchar,
    text,
    integer,
    boolean,
    decimal,
    timestamp,
    jsonb,
    index,
    uniqueIndex,
    primaryKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ─── Users ──────────────────────────────────────────────────────
export const users = pgTable(
    "users",
    {
        id: serial("id").primaryKey(),
        email: varchar("email", { length: 255 }).unique().notNull(),
        name: varchar("name", { length: 200 }).notNull(),
        passwordHash: varchar("password_hash", { length: 255 }).notNull(),
        role: varchar("role", { length: 20 }).notNull().default("client"),
        bio: text("bio"),
        avatar: varchar("avatar", { length: 500 }),
        website: varchar("website", { length: 500 }),
        phone: varchar("phone", { length: 20 }),
        company: varchar("company", { length: 200 }),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [
        index("users_role_idx").on(table.role),
        index("users_email_idx").on(table.email),
    ]
);

export const usersRelations = relations(users, ({ many }) => ({
    properties: many(properties),
}));

// ─── Categories ─────────────────────────────────────────────────
export const categories = pgTable(
    "categories",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 100 }).unique().notNull(),
        slug: varchar("slug", { length: 100 }).unique().notNull(),
        description: text("description"),
        icon: varchar("icon", { length: 50 }),
        parentId: integer("parent_id"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [uniqueIndex("categories_slug_idx").on(table.slug)]
);

export const categoriesRelations = relations(categories, ({ one, many }) => ({
    parent: one(categories, {
        fields: [categories.parentId],
        references: [categories.id],
    }),
    children: many(categories),
    properties: many(properties),
}));

// ─── Tags ───────────────────────────────────────────────────────
export const tags = pgTable(
    "tags",
    {
        id: serial("id").primaryKey(),
        name: varchar("name", { length: 50 }).unique().notNull(),
        slug: varchar("slug", { length: 50 }).unique().notNull(),
        createdAt: timestamp("created_at").defaultNow().notNull(),
    },
    (table) => [uniqueIndex("tags_slug_idx").on(table.slug)]
);

export const tagsRelations = relations(tags, ({ many }) => ({
    propertyTags: many(propertyTags),
}));

// ─── Properties ─────────────────────────────────────────────────
export const properties = pgTable(
    "properties",
    {
        id: serial("id").primaryKey(),
        title: varchar("title", { length: 200 }).notNull(),
        slug: varchar("slug", { length: 200 }).unique().notNull(),
        description: text("description").notNull(),
        price: decimal("price", { precision: 12, scale: 2 }).notNull(),
        operation: varchar("operation", { length: 10 }).notNull(), // 'sale' | 'rent'
        propertyType: varchar("property_type", { length: 20 })
            .notNull()
            .default("house"),
        categoryId: integer("category_id"),
        address: varchar("address", { length: 300 }).notNull(),
        city: varchar("city", { length: 100 }).notNull(),
        state: varchar("state", { length: 100 }).default("Buenos Aires"),
        country: varchar("country", { length: 100 }).default("Argentina"),
        gpsLocation: varchar("gps_location", { length: 100 }),
        area: integer("area").notNull(),
        landArea: integer("land_area"),
        rooms: integer("rooms").notNull().default(0),
        bathrooms: integer("bathrooms").notNull().default(0),
        parkingSpaces: integer("parking_spaces").notNull().default(0),
        floors: integer("floors").notNull().default(1),
        yearBuilt: integer("year_built"),
        featuredImage: varchar("featured_image", { length: 500 }),
        gallery: jsonb("gallery").$type<string[]>().default([]),
        agentId: integer("agent_id").notNull(),
        status: varchar("status", { length: 20 }).notNull().default("draft"),
        viewsCount: integer("views_count").notNull().default(0),
        isFeatured: boolean("is_featured").notNull().default(false),
        isAvailable: boolean("is_available").notNull().default(true),
        metaDescription: varchar("meta_description", { length: 160 }),
        publishedAt: timestamp("published_at"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [
        uniqueIndex("properties_slug_idx").on(table.slug),
        index("properties_published_at_idx").on(table.publishedAt),
        index("properties_operation_idx").on(table.operation),
        index("properties_status_idx").on(table.status),
        index("properties_city_idx").on(table.city),
        index("properties_price_idx").on(table.price),
        index("properties_is_featured_idx").on(table.isFeatured),
    ]
);

export const propertiesRelations = relations(properties, ({ one, many }) => ({
    agent: one(users, {
        fields: [properties.agentId],
        references: [users.id],
    }),
    category: one(categories, {
        fields: [properties.categoryId],
        references: [categories.id],
    }),
    propertyTags: many(propertyTags),
    inquiries: many(inquiries),
}));

// ─── Property ↔ Tags (junction) ────────────────────────────────
export const propertyTags = pgTable(
    "property_tags",
    {
        propertyId: integer("property_id").notNull(),
        tagId: integer("tag_id").notNull(),
    },
    (table) => [
        primaryKey({ columns: [table.propertyId, table.tagId] }),
        index("property_tags_property_id_idx").on(table.propertyId),
        index("property_tags_tag_id_idx").on(table.tagId),
    ]
);

export const propertyTagsRelations = relations(propertyTags, ({ one }) => ({
    property: one(properties, {
        fields: [propertyTags.propertyId],
        references: [properties.id],
    }),
    tag: one(tags, {
        fields: [propertyTags.tagId],
        references: [tags.id],
    }),
}));

// ─── Inquiries ──────────────────────────────────────────────────
export const inquiries = pgTable(
    "inquiries",
    {
        id: serial("id").primaryKey(),
        propertyId: integer("property_id").notNull(),
        clientId: integer("client_id"),
        clientName: varchar("client_name", { length: 200 }),
        clientEmail: varchar("client_email", { length: 255 }).notNull(),
        clientPhone: varchar("client_phone", { length: 20 }),
        message: text("message").notNull(),
        status: varchar("status", { length: 20 }).notNull().default("new"),
        notes: text("notes"),
        isContacted: boolean("is_contacted").notNull().default(false),
        contactedAt: timestamp("contacted_at"),
        createdAt: timestamp("created_at").defaultNow().notNull(),
        updatedAt: timestamp("updated_at").defaultNow().notNull(),
    },
    (table) => [
        index("inquiries_property_created_idx").on(
            table.propertyId,
            table.createdAt
        ),
        index("inquiries_status_idx").on(table.status),
        index("inquiries_client_email_idx").on(table.clientEmail),
    ]
);

export const inquiriesRelations = relations(inquiries, ({ one }) => ({
    property: one(properties, {
        fields: [inquiries.propertyId],
        references: [properties.id],
    }),
    client: one(users, {
        fields: [inquiries.clientId],
        references: [users.id],
    }),
}));

// ─── Type Exports ───────────────────────────────────────────────
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export type Tag = typeof tags.$inferSelect;
export type NewTag = typeof tags.$inferInsert;

export type Property = typeof properties.$inferSelect;
export type NewProperty = typeof properties.$inferInsert;

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
