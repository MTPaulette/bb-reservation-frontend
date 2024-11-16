import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const api_url = process.env.API_URL;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res =await fetch(`${api_url}/csrf-cookie`, {
          method: "GET",
        })

        const setCookieHeader = res.headers.get("set-cookie")
        //console.log("setCookieHeader", setCookieHeader)
        // you'll find your_site_session key in this console log

        const cookies = setCookieHeader?.split(", ")
        // console.log(cookies)
        let sessionKey = null
        let xsrfToken = null

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1]
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1]
          }

          if (sessionKey && xsrfToken) {
            break
          }
        }
        const data = {
          email: credentials?.email,
          password: credentials?.password,
        }
        const headers = new Headers({
          Cookie: `laravel_session=${sessionKey}`,
          "Content-Type": "application/json",
        })

        if (xsrfToken) {
          headers.append("X-XSRF-TOKEN", xsrfToken)
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
        const response = await fetch(`${api_url}/login`, options)
        
        // console.log(response)
        if (response.status == 201) {
          const res = await response.json()
          return res
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user
        token.accessToken = user.token
      }
      return token
    },
    async session({ session, token }) {
      console.log("=========================== dans route.ts");
      console.log(token.user.token);
      // session.accessToken = token.access_token
      session.accessToken = token.user.token
      session.user = token.user.user;
      return session
    },
  },
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
// export { handler as GET, handler as POST, handler as DELETE, handler as UPDATE }
