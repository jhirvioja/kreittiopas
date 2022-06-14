import NextAuth from "next-auth"
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  },
  callbacks: {
    async signIn(user, account, profile) {
      let isAllowedToSignIn = false;
      if (user.id === "{{ADD GOOGLE ACCOUNT ID HERE}}") { // use the id of the google account which is allowed to sign in
        isAllowedToSignIn = true;
      } else {
        isAllowedToSignIn = false;
      }

      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async redirect(url, baseUrl) { // this does something important which lets the auth to work in cloud
      return url.startsWith(baseUrl)
        ? url
        : baseUrl
    }
  }
})