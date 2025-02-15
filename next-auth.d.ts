// import { JWT, Session, User } from "next-auth/next"

declare module "next-auth" {
  interface Session {
    permissions: string[]
    accessToken: string
    user: {
      id: string
      accessToken: string
    } & Session["user"]
  }
  interface User {
    accessToken: string
  }
  interface JWT {
    accessToken: string
  }
}
