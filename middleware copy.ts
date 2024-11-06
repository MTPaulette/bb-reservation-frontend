import { withAuth } from "next-auth/middleware";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";



export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(fr|en)/:path*']
}

export const authMdw = withAuth(function middleware(req) {}, {
//export default withAuth(function middleware(req) {}, {
  pages: {
    signIn: "auth/login"
  },
  callbacks: {
    authorized: ({ req, token }) => {
      console.log("================================================")
      if (req.nextUrl.pathname.startsWith("/fr/dashboard1") && token === null) {
        // if (req.nextUrl.pathname.startsWith(locale+"/dashboard1") && token === null) {
        return false
      }
      return true
    },
  },
})

// middleware/auth.js
import axios from 'axios';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Vous devez être connecté' });
  }

  try {
    const response = await axios.get('http://localhost:8000/api/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.data.user) {
      return res.status(401).json({ error: 'Vous devez être connecté' });
    }

    // Vérification des permissions
    const permissions = response.data.user.permissions;
    if (!permissions.includes('accès-ressource')) {
      return res.status(403).json({ error: 'Accès refusé' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Vous devez être connecté' });
  }
};

export default authMiddleware;