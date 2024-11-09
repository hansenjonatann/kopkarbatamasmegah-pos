import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { categories } from "./categories";
import { relations } from "drizzle-orm";
import { smallunits } from "./small-unit";
import { largeunits } from "./large-unit";

export const products = pgTable('products' , {
    id: text('id').primaryKey(),
    name: text('name'),
    smallPrice: integer('small_price') , 
    largePrice: integer('large_price'),
    smallunit: text('product_smallunit').references(() => smallunits.id),
    largeunit: text('product_largeunit').references(() => largeunits.id),
    category : text('product_category').references(() => categories.id),
    smallStock: integer('small_stock'),
    largeStock: integer('large_stock'),
    image: text('image') , 
    description: text('description'),


})

export const productRelationWithCategory = relations(products , ({one}) => ({
    category: one(categories , {
        fields: [products.category],
        references: [categories.id]
    })
}))


export const productRelationWithSmallUnit = relations(products , ({one}) => ({
    smallunit: one(smallunits , {
        fields: [products.smallunit ] , 
        references: [smallunits.id]
    })
}))



export const productRelationWithLargeUnit = relations(products , ({one}) => ({
    largeunit: one(largeunits , {
        fields: [products.largeunit ], 
        references: [largeunits.id]
    })
}))
