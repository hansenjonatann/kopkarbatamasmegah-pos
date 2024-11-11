import { db } from '@/db/drizzle'
import { categories } from '@/db/schema/categories'
import { failResponse } from '@/lib/helpers/fail-response'
import { successResponse } from '@/lib/helpers/success-response'
import { adminMiddleware } from '@/lib/middleware/admin'
import { zValidator } from '@hono/zod-validator'
import { createId } from '@paralleldrive/cuid2'
import { eq } from 'drizzle-orm'
import {Hono} from 'hono'
import { z } from 'zod'

const app = new Hono()

const categorySchema = z.object({
    name: z.string().nonempty('Category is required'),
})

app.get('/' , async (c) => {
    try {
        const allCategories = await db.select().from(categories)
          return c.json(successResponse('List of all category' , allCategories , 200))


    } catch (error) {

        return c.json(failResponse(`${error}`))
        
        
    }
}  )


app.post('/store' ,  adminMiddleware  ,zValidator('json' , categorySchema) ,   async (c) => {
    try {
        const values   = c.req.valid('json')

        const newCategory = await db.insert(categories).values({
            id: createId(),
            slug: values.name.toLowerCase(),
            ...values,

        })

        if(newCategory) {
            return c.json(successResponse('Success create category' , newCategory , 201))
        }

        if(!newCategory) {
            return c.json(failResponse('Something went wrong' , 400))
        }
    } catch (error) {
        return c.json(failResponse(`${error}`))
    }
})



app.get('/detail/:id' , async (c) => {
    try {
        const id = c.req.param('id')
        if(id) {
            const detailCategory = await db.select().from(categories).where(eq(categories.id , id))

            return c.json(successResponse('Detail of category' , detailCategory , 200))
        }

        if(!id) {
            return c.json('Category not found' , 404)
        }
    } catch (error) {
        return c.json(failResponse(`${error}`))
    }
} )



app.patch('/update/:id' , adminMiddleware,  zValidator('json' , categorySchema) , async (c) => {
    try {
        const id = c.req.param('id')
        const values = c.req.valid('json')

        if(id) {
            const updateCategory = await db.update(categories).set({...values})

            if(updateCategory) {
                return c.json(successResponse('Success update category' , updateCategory , 200))
            }
        }


        if(!id) {
            return c.json(failResponse('Category not found' , 404))
        }

    } catch (error) {
        return c.json(failResponse(`${error}`))
    }
})

app.delete('/delete/:id' , adminMiddleware , async (c) => {
    try {
        const id = c.req.param('id')
        if(id) {
            const deleteCategory = await db.delete(categories).where(eq(categories.id , id))

            if(deleteCategory) {
                return c.json(successResponse('Success delete category' , deleteCategory, 200))
            }
        }

        if(!id) {
            return c.json(failResponse('Category not found' , 404))
        }
    } catch (error) {
        return c.json(failResponse(`${error}`))
    }
})

export default app