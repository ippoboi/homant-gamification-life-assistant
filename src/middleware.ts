import { NextRequest, NextResponse } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = ["/", "/auth/signin", "/auth/signup", "/auth/verify"];

// Define auth-only routes that require authentication
const authRoutes = ["/dashboard"];

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get token from cookies
  const token = request.cookies.get("access_token")?.value;

  // Check if the path starts with any of the auth routes
  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if the path is a public route
  const isPublicRoute = publicRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // If the route requires authentication and the user is not authenticated
  if (isAuthRoute && !token) {
    const url = new URL("/auth/signin", request.url);
    url.searchParams.set("callbackUrl", encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If the user is on a public route but is already authenticated
  if (isPublicRoute && token) {
    // Don't redirect from root path if already authenticated
    if (pathname === "/") {
      return NextResponse.next();
    }

    // Redirect to dashboard if on a login or register page
    if (["/auth/signup", "/auth/signin", "/auth/verify"].includes(pathname)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes this middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes
     */
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
