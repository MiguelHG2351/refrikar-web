import { clerkMiddleware, createRouteMatcher} from "@clerk/nextjs/server"
import { currentUser } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in', '/sign-up', '/home/dashboard']);
const isAdminRoute = createRouteMatcher(['/home/admin(.*)']);

export default clerkMiddleware(async (_auth, request) => {
  const auth = _auth()

  if(!isPublicRoute(request)) {
    auth.protect();
  }

}, { debug: process.env.NODE_ENV === 'development' });

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
