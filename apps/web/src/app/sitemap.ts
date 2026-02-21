import type { MetadataRoute } from "next";
import { getAllPropertySlugs } from "@/lib/queries";
import { SITE_URL } from "@calzada/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${SITE_URL}/propiedades`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/propiedades?operation=sale`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/propiedades?operation=rent`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
    ];

    // Dynamic property pages
    let propertySlugs: string[] = [];
    try {
        propertySlugs = await getAllPropertySlugs();
    } catch {
        // DB not available
    }

    const propertyPages: MetadataRoute.Sitemap = propertySlugs.map((slug) => ({
        url: `${SITE_URL}/propiedad/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [...staticPages, ...propertyPages];
}
