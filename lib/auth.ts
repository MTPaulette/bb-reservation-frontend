import { NextAuthOptions } from "next-auth";
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

        const setCookieHeader = res.headers.get("set-cookie");
        //console.log("setCookieHeader", setCookieHeader)
        // you'll find your_site_session key in this console log

        const cookies = setCookieHeader?.split(", ");
        // console.log(cookies)
        let sessionKey = null;
        let xsrfToken = null;

        for (const cookie of cookies!) {
          if (cookie.startsWith("laravel_session=")) {
            sessionKey = cookie.split("=")[1];
          } else if (cookie.startsWith("XSRF-TOKEN=")) {
            xsrfToken = cookie.split("=")[1];
          }

          if (sessionKey && xsrfToken) {
            break;
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
          headers.append("X-XSRF-TOKEN", xsrfToken);
        }

        const options = {
          method: "POST",
          headers,
          body: JSON.stringify(data),
        }
        const response = await fetch(`${api_url}/login`, options);
        
        if (response.status == 201) {
          const res = await response.json();
          return res;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      console.log("jwt user============");
      console.log(user);
      // when update
      if(trigger == 'update') {
        if (session?.user) {
          token.user = session.user;
        }
        if (session?.accessToken) {
          token.accessToken = session.accessToken;
        }
        if (session?.permissions) {
          token.permissions = session.permissions;
        }
      }
      // when login
      if (user) {
        token.user = user.user;
        token.accessToken = user.token;
        token.permissions = user.permissions;
      }
      return token
    },
    async session({ session, token }) {

      console.log("session token============");
      console.log(token);

      session.accessToken = token.accessToken;
      session.user = token.user;
      session.permissions = token.permissions;
      return session;
    },
  },
}