import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { products } from "./products";

export const categories = pgTable('categories' , {
    id: text('id').primaryKey(),
    name: text('name') , 
    slug: text('slug'),
})


export const categoryRelationWithProducts = relations(categories , ({many}) => ({
    products: many(products)
}))