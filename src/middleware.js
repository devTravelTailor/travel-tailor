import { NextResponse } from "next/server";

export function middleware(request) {
  const url = request.nextUrl.clone();
  const host = request.headers.get("host") || url.hostname;

  if (host === "www.traveltailor.in" || url.hostname === "www.traveltailor.in") {
    url.protocol = "https";
    url.hostname = "traveltailor.in";
    url.port = "";
    return NextResponse.redirect(url, 308);
  }

  // if (url.pathname === "/home" || url.pathname === "/home/") {
  //   url.pathname = "/";
  //   url.search = "";
  //   return NextResponse.redirect(url, 308);
  // }

  if (url.pathname.startsWith("/creator/tour/")) {
    url.pathname = url.pathname.replace("/creator/tour/", "/tours/");
    return NextResponse.redirect(url, 308);
  }

  if (url.pathname === "/contact" && url.searchParams.has("src")) {
    url.searchParams.delete("src");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"],
};
