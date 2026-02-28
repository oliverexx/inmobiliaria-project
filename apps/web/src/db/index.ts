import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

let _db: NodePgDatabase<typeof schema> | null = null;

export function getDb(): NodePgDatabase<typeof schema> {
    if (_db) return _db;

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error(
            "DATABASE_URL environment variable is not set. " +
            "Run `docker-compose up -d` and create an .env.local file."
        );
    }

    _db = drizzle(connectionString, { schema });
    return _db;
}

// For convenience — throws if DB is not configured
export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
    get(_, prop) {
        return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
    },
});
