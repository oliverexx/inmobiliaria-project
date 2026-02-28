import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET ?? "calzada-inmobiliaria-secret-dev-2024"
);
const COOKIE_NAME = "calzada-session";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Allow login page and API auth routes
    if (
        pathname === "/admin/login" ||
        pathname.startsWith("/api/auth/")
    ) {
        return NextResponse.next();
    }

    // Protect /admin/* and /api/admin/*
    if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
        const token = request.cookies.get(COOKIE_NAME)?.value;

        if (!token) {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }

        try {
            const { payload } = await jwtVerify(token, JWT_SECRET);
            if (payload.role !== "admin") {
                return NextResponse.redirect(
                    new URL("/admin/login", request.url)
                );
            }
            return NextResponse.next();
        } catch {
            return NextResponse.redirect(new URL("/admin/login", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
