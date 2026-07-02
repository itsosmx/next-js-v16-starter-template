import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import createMiddleware from 'next-intl/middleware';
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const protectedRoutes: (string | RegExp)[] = [
  /^\/[^/]*\/dashboard(\/.*)?$/,  // Matches /:locale/dashboard and /:locale/dashboard/*
  /\/dashboard(\/.*)?$/, // Matches /dashboard and /dashboard/*
  /^\/[^/]*\/onboarding$/,  // Matches /:locale/onboarding
  /\/onboarding$/  // Matches /onboarding
] as const;

export async function proxy(request: NextRequest) {

  const pathname = request.nextUrl.pathname;

  const needsProtection = routerMatcher(pathname);
  if (needsProtection) {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.redirect(new URL("/signup", request.url));
    }
  }


  return handleI18nRouting(request);
}

export const config = {
  // runtime: "nodejs",
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|monitoring|manifest|sitemap\\.xml|robots\\.txt|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|mp3|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    "/((?!api|static|.*\\..*|_next).*)",
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

const routerMatcher = (pathname: string): boolean => {
  return protectedRoutes.some(route => {
    if (typeof route === 'string') {
      return pathname.startsWith(route);
    } else if (route instanceof RegExp) {
      return route.test(pathname);
    }
    return false;
  });
};