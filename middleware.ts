import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";


export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
}

export const authMdw = withAuth(function middleware(req) {}, {
// export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: "auth/login"
  },
  callbacks: {
    authorized: ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/dashboard") && token === null) {
        return false
      }
      return true
    },
  },
})
