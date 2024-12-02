import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
<<<<<<< HEAD
  "/api/services",
  "/home/dashboard",
=======
  "/home/presentation",
>>>>>>> d2dfb418f0d68a81b021daf46089af8997b18c56
]);
const isAdminRoute = createRouteMatcher(["/home/admin(.*)"]);

export default clerkMiddleware(
  async (auth, request) => {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  },
  {
    // debug: process.env.NODE_ENV === "development",
  }
);

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
