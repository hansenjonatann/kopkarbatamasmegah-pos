import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';
import { compare } from 'bcrypt-ts';

export const {handlers  , signIn , signOut , auth} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username' , type: 'text'},
                password: {label: 'Password' , type: 'password'}
            },
            async authorize(credentials: any) {
                const user = await db.select().from(users).where(eq(users.username , credentials?.username)).execute()

                if(user.length === 0) {
                    throw new Error('User does not exist ')
                } 

                const isValidPassword = await compare(credentials!.password , String(user[0].password))

                if(!isValidPassword) {
                    throw new Error('Invalid Credentials')
                }

                return {id: user[0].id , username : user[0].username , role: user[0].role}

            }
        },  
    ),
    ],
    pages: {
        signIn: '/auth/sign-in',
        signOut: '/auth/sign-out',
    },
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token , user} : any) {
            if(user) {
                token.id = user.id
                token.username = user.username
            }
            return token
        },

        async session({session , token} : any) {
            if(token) {
                session.user = token.user
            }
            return session
        },
        authorized: async ({auth}) => {
            return !!auth
        }
    },
    secret: process.env.AUTH_SECRET
})