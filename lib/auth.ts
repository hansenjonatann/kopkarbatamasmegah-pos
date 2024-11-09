import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

export const {handlers  , signIn , signOut , auth} = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username' , type: 'text'},
                password: {label: 'Password' , type: 'password'}
            }
        })
    ]
})