import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
async function validateUserByToken(token) {
  try {
    if (!token) return { error: "Log in first" };
    let { payload } = await jwtVerify(token, JWT_SECRET);
    // console.log("Decoded Token: ", payload);

    if (!payload) return { error: "User not found, log in again" };

    if (payload.role !== "admin") {
      return { error: "These are not the admin credentials" };
    }

    return { user: payload };
  } catch (err) {
    console.error("Error in validateUserByToken:", err);
    if (err.name === "JWTExpired") {
      return { error: "Expired token, log in again" };
    } else if (err.name === "JWTInvalid") {
      return { error: "Invalid token, log in again" };
    } else {
      return { error: "Unknown validation error, log in again" };
    }
  }
}

// Middleware main function
export async function middleware(request) {
  const token = request.cookies.get("token")?.value;
  const requestedPath = request.nextUrl.pathname;
  // console.log("Token: ", token);

  if (token) {
    const { user, error } = await validateUserByToken(token);

    if (error) {
      console.error("Middleware Error:", error);
      // Redirect based on the requested path
      if (
        requestedPath === "/auth/login" ||
        requestedPath === "/auth/register"
      ) {
        return NextResponse.next(); // Allow access to the login and register pages
      }
      return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect to login if there's an error
    }

    if (
      user &&
      (requestedPath === "/auth/login" || requestedPath === "/auth/register")
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url)); // Redirect to the list page if logged in
    }
  } else {
    if (requestedPath !== "/auth/login" && requestedPath !== "/auth/register") {
      return NextResponse.redirect(new URL("/auth/login", request.url)); // Redirect to login if not authenticated and not accessing login/register pages
    }
  }

  return NextResponse.next(); // Continue to the requested page if no redirect needed
}

// Configure the middleware matcher
export const config = {
  matcher: ["/auth/:path*", "/admin/:path*"],
};
