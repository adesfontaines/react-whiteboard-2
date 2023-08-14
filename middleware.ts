import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { fallbackLng, locales } from "./app/i18n/settings";
import withAuth from "next-auth/middleware"
acceptLanguage.languages(locales);

export const config = {
  // matcher: '/:lng*'
  matcher: ["/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)"],
};

const cookieName = "i18next";


export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req: NextRequest) {
    let lng: string | null | undefined;
    if (req.cookies.has(cookieName)) {
      lng = acceptLanguage.get(req.cookies.get(cookieName)?.value);
    }
    if (!lng) {
      lng = acceptLanguage.get(req.headers.get("Accept-Language"));
    }
    if (!lng) {
      lng = fallbackLng;
    }

    // Redirect if lng in path is not supported
    if (
      !locales.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith("/_next")
    ) {
      return NextResponse.redirect(
        new URL(`/${lng}${req.nextUrl.pathname}`, req.url)
      );
    }

    if (req.headers.has("referer")) {
      const refererUrl = new URL(req.headers.get("referer")!);
      const lngInReferer = locales.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`)
      );
      const response = NextResponse.next();
      if (lngInReferer) {
        response.cookies.set(cookieName, lngInReferer);
      }
      return response;
    }
  },
  {
    callbacks: {
      authorized: ({ req, token }: any) => {
        const tokenValue = req.cookies.get("next-auth.session-token")?.value
        return tokenValue
      }
    }
  }
)