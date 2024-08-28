import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // 获取 token
  const token = request.cookies.get("AuthToken");

  if (
    request.nextUrl.pathname === "/auth" ||
    request.nextUrl.pathname === "/"
  ) {
    return NextResponse.next();
  }

  // 如果没有 token, 则重定向到登录页面
  if (!token) {
    return NextResponse.redirect(new URL("/auth", request.url).toString(), {
      status: 302,
    });
  }
  // 如果存在 token 则允许继续请求
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
