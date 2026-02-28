import { db } from "@/db";
import {
    properties,
    tags,
    propertyTags,
    inquiries,
    users,
    type Property,
    type Tag,
    type NewInquiry,
} from "@/db/schema";
import { eq, and, ilike, gte, lte, sql, desc, asc, count, avg, min, max, inArray } from "drizzle-orm";

// ─── Types ──────────────────────────────────────────────────────
export interface PropertyWithTags extends Property {
    tags: Tag[];
}

export interface PropertyFilters {
    operation?: string;
    propertyType?: string;
    city?: string;
    search?: string;
    minPrice?: string;
    maxPrice?: string;
    minRooms?: string;
    minBathrooms?: string;
    sortBy?: string;
    limit?: number;
    offset?: number;
    rentalPeriod?: "daily" | "weekly" | "monthly" | "longTerm";
}

// ─── Queries ────────────────────────────────────────────────────
export async function getProperties(
    filters: PropertyFilters = {}
): Promise<{ properties: PropertyWithTags[]; total: number }> {
    const conditions = [
        eq(properties.status, "published"),
        eq(properties.isAvailable, true),
    ];

    if (filters.operation) {
        conditions.push(eq(properties.operation, filters.operation));
    }
    if (filters.propertyType) {
        conditions.push(eq(properties.propertyType, filters.propertyType));
    }
    if (filters.city) {
        conditions.push(eq(properties.city, filters.city));
    }
    if (filters.search) {
        conditions.push(
            ilike(properties.title, `%${filters.search}%`)
        );
    }
    if (filters.minPrice) {
        conditions.push(gte(properties.price, filters.minPrice));
    }
    if (filters.maxPrice) {
        conditions.push(lte(properties.price, filters.maxPrice));
    }
    if (filters.minRooms) {
        conditions.push(gte(properties.rooms, parseInt(filters.minRooms)));
    }
    if (filters.minBathrooms) {
        conditions.push(gte(properties.bathrooms, parseInt(filters.minBathrooms)));
    }
    if (filters.rentalPeriod) {
        conditions.push(sql`${properties.rentalPrices} ?? ${filters.rentalPeriod}`);
    }

    const where = and(...conditions);
    const limit = filters.limit ?? 50;
    const offset = filters.offset ?? 0;

    // Determine sort
    let orderBy;
    switch (filters.sortBy) {
        case "price_asc":
            orderBy = asc(properties.price);
            break;
        case "price_desc":
            orderBy = desc(properties.price);
            break;
        case "newest":
            orderBy = desc(properties.publishedAt);
            break;
        case "views":
            orderBy = desc(properties.viewsCount);
            break;
        default:
            orderBy = desc(properties.publishedAt);
    }

    // Get total count
    const [{ total }] = await db
        .select({ total: count() })
        .from(properties)
        .where(where);

    // Get properties
    const rows = await db
        .select()
        .from(properties)
        .where(where)
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset);

    // Get tags for all returned properties
    const propertyIds = rows.map((p) => p.id);
    const tagRows =
        propertyIds.length > 0
            ? await db
                .select({
                    propertyId: propertyTags.propertyId,
                    tag: tags,
                })
                .from(propertyTags)
                .innerJoin(tags, eq(propertyTags.tagId, tags.id))
                .where(inArray(propertyTags.propertyId, propertyIds))
            : [];

    // Group tags by property
    const tagsByProperty = new Map<number, Tag[]>();
    for (const row of tagRows) {
        const existing = tagsByProperty.get(row.propertyId) ?? [];
        existing.push(row.tag);
        tagsByProperty.set(row.propertyId, existing);
    }

    const propertiesWithTags: PropertyWithTags[] = rows.map((p) => ({
        ...p,
        tags: tagsByProperty.get(p.id) ?? [],
    }));

    return { properties: propertiesWithTags, total };
}

export async function getPropertyBySlug(
    slug: string
): Promise<PropertyWithTags | null> {
    const [property] = await db
        .select()
        .from(properties)
        .where(
            and(
                eq(properties.slug, slug),
                eq(properties.status, "published"),
                eq(properties.isAvailable, true)
            )
        )
        .limit(1);

    if (!property) return null;

    // Get tags
    const tagRows = await db
        .select({ tag: tags })
        .from(propertyTags)
        .innerJoin(tags, eq(propertyTags.tagId, tags.id))
        .where(eq(propertyTags.propertyId, property.id));

    return {
        ...property,
        tags: tagRows.map((r) => r.tag),
    };
}

export async function getFeaturedProperties(): Promise<PropertyWithTags[]> {
    const { properties: result } = await getProperties({
        limit: 6,
    });
    // Filter featured ones first, then fall back to most recent
    const featured = result.filter((p) => p.isFeatured);
    return featured.length >= 3 ? featured.slice(0, 6) : result.slice(0, 6);
}

export async function getRelatedProperties(
    currentId: number,
    city: string,
    limit = 3
): Promise<PropertyWithTags[]> {
    const { properties: result } = await getProperties({ city, limit: limit + 1 });
    return result.filter((p) => p.id !== currentId).slice(0, limit);
}

export async function incrementViews(slug: string): Promise<void> {
    await db
        .update(properties)
        .set({ viewsCount: sql`${properties.viewsCount} + 1` })
        .where(eq(properties.slug, slug));
}

export async function getPropertyStats() {
    const [stats] = await db
        .select({
            total: count(),
            forSale: count(
                sql`CASE WHEN ${properties.operation} = 'sale' THEN 1 END`
            ),
            forRent: count(
                sql`CASE WHEN ${properties.operation} = 'rent' THEN 1 END`
            ),
            avgPrice: avg(properties.price),
            minPrice: min(properties.price),
            maxPrice: max(properties.price),
        })
        .from(properties)
        .where(eq(properties.status, "published"));

    const cities = await db
        .select({
            city: properties.city,
            count: count(),
        })
        .from(properties)
        .where(eq(properties.status, "published"))
        .groupBy(properties.city)
        .orderBy(desc(count()))
        .limit(5);

    return { ...stats, cities };
}

export async function getAllPropertySlugs(): Promise<string[]> {
    const rows = await db
        .select({ slug: properties.slug })
        .from(properties)
        .where(
            and(eq(properties.status, "published"), eq(properties.isAvailable, true))
        );
    return rows.map((r) => r.slug);
}

export async function createInquiry(data: NewInquiry) {
    const [inquiry] = await db.insert(inquiries).values(data).returning();
    return inquiry;
}
