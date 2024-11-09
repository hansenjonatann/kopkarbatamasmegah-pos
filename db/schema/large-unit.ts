import { Many, relations } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { products } from "./products";

export const largeunits = pgTable('large_units' , {
    id: text('id').primaryKey(),
    name: varchar('name')
})

export const largeUnitRelationWithProduct = relations(largeunits , ({many}) => (
   { products : many(products)}
))