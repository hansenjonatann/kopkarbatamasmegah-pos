import {defineConfig} from 'drizzle-kit'

export default defineConfig({
    schema: "./db/schema",
    out: './db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_DB_URL!
    }
})