import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: [
    "/",
    "/api/uploadthing",
    "/api/uploadthing/(.*)",
    "/_next/static/(.*)",
    "/favicon.ico",
    "/sign-in(.*)",
    "/sign-up(.*)",
  ],
  debug: process.env.NODE_ENV === "development",
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
