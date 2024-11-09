import { relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";

export const smallunits = pgTable('small_units' , {
    id: text('id').primaryKey(),
    name: varchar('name'),
})

export const smallUnitRelationWithProducts = relations(smallunits , ({many}) => ({
    products : many(products)
}))