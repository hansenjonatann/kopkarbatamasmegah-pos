import { db } from "@/db/drizzle"
import { users } from "@/db/schema/users"
import { eq } from "drizzle-orm"
import { Context } from "hono"

export const adminMiddleware = async (c: Context , next: () => void) => {
    const user = await db.select().from(users).where(eq(users.role , 'ADMIN'))

    if(user.length > 0) {
        return c.json({
            success: true , 
            message: 'Authenticated',
            data: user , 
            statusCode: 200
        })
        next()
    } else {
        return c.json({
            success: false , 
            message: 'Sorry! The role can not access this route!',
            statusCode: 401
        })
    }
}