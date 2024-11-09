import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";


export const roleEnum = pgEnum('role' , ['ADMIN' , 'CASHIER'])

export const users = pgTable('users' , {
    id: text('id').primaryKey(),
    name: text('name'),
    username : text('username'),
    password: text('password'),
    role: roleEnum()
})