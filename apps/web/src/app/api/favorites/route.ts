import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { properties, tags, propertyTags } from "@/db/schema";
import { inArray, and, eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const ids = searchParams
        .getAll("ids")
        .map(Number)
        .filter((n) => !isNaN(n));

    if (ids.length === 0) {
        return NextResponse.json({ properties: [] });
    }

    try {
        const rows = await db
            .select()
            .from(properties)
            .where(
                and(
                    inArray(properties.id, ids),
                    eq(properties.status, "published"),
                    eq(properties.isAvailable, true)
                )
            );

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

        const tagsByProperty = new Map<number, (typeof tagRows)[0]["tag"][]>();
        for (const row of tagRows) {
            const existing = tagsByProperty.get(row.propertyId) ?? [];
            existing.push(row.tag);
            tagsByProperty.set(row.propertyId, existing);
        }

        const result = rows.map((p) => ({
            ...p,
            tags: tagsByProperty.get(p.id) ?? [],
        }));

        return NextResponse.json({ properties: result });
    } catch {
        return NextResponse.json({ properties: [] }, { status: 500 });
    }
}
