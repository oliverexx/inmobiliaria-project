import { db } from "./src/db";
import { properties } from "./src/db/schema";
import { eq } from "drizzle-orm";

async function check() {
    const list = await db.select({
        title: properties.title,
        gps: properties.gpsLocation,
        rentalPrices: properties.rentalPrices
    }).from(properties).limit(10);
    console.log(JSON.stringify(list, null, 2));
    process.exit(0);
}

check();
