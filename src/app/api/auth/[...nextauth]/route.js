import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and backend tokens to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.user = user
        
        // Include backend tokens if they exist
        if (user.backendTokens) {
          token.backendTokens = user.backendTokens
        }
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken
      session.user = token.user
      session.backendTokens = token.backendTokens
      return session
    },
    async signIn({ user, account, profile }) {
      // You can send user data to your backend here
      console.log('Google Sign-In Success:', { user, account, profile })
      
      // Make API call to your backend to create/update user
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/google-auth/`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            email: user.email,
            name: user.name,
            google_id: user.id,
            avatar: user.image,
            provider: 'google'
          })
        })
        
        if (response.ok) {
          const userData = await response.json()
          console.log('Backend auth success:', userData)
          
          // Store backend tokens in user object for client-side access
          user.backendTokens = {
            access: userData.access,
            refresh: userData.refresh,
            user: userData.user
          }
          
          return true
        } else {
          const errorData = await response.json()
          console.error('Backend auth failed:', response.status, errorData)
          // Still allow sign-in even if backend fails
          return true
        }
      } catch (error) {
        console.error('Backend auth error:', error)
        // Still allow sign-in even if backend fails
        return true
      }
    },
  },
  pages: {
    signIn: '/login', 
    error: '/login', 
  },
  session: {
    strategy: 'jwt',
  },
})

export { handler as GET, handler as POST }
