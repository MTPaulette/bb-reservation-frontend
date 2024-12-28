import { encryptToken } from "@/lib/utils";
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
    /*
    async jwt({ token, trigger, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.token;
      }
      return token
    },
    // Using the `...rest` parameter to be able to narrow down the type based on `trigger`
    async session({ session, token, trigger, newSession }) {
      console.log("newSession===============");
      console.log(newSession);
      // Note, that `rest.session` can be any arbitrary object, remember to validate it!
      if (trigger === "update" && newSession?.user) {
        // You can update the session in the database if it's not already updated.
        // await adapter.updateUser(session.user.id, { name: newSession.name })

        // Make sure the updated value is reflected on the client
        session.user = newSession.user
      }
      session.accessToken = token.user.token;
      session.user = token.user.user;
      console.log("session===============");
      console.log(session);
      return session
    }
    async jwt({ token, trigger, session }) {
      console.log(session);
      if (trigger === "update" && session?.user) {
        token.user = session.user;
        token.accessToken = session.user.token;
      }
      console.log("token===============");
      console.log(token);
      return token
    }, */
    async jwt({ token, trigger, user, session }) {
      if(trigger == 'update') {
        if (session?.user) {
          token.user = session.user;
        }
        if (session?.accessToken) {
          token.accessToken = encryptToken(String(session.accessToken));
        }
      }
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token
    },
    async session({ session, token }) {
      //session.accessToken = token.accessToken;
      session.accessToken = encryptToken(String(token.accessToken));
      session.user = token.user;
      return session
    },
  },
}
const handler = NextAuth(authOptions)
//export { handler as GET, handler as POST }
export { handler as GET, handler as POST, handler as DELETE, handler as UPDATE }
