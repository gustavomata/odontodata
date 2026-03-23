import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Proteger rotas /admin/* e /api/admin/* (exceto /api/admin/login)
  const isAdminUI  = pathname.startsWith("/admin");
  const isAdminAPI = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/login");

  if (isAdminUI || isAdminAPI) {
    const auth = req.cookies.get("admin_auth")?.value;

    if (auth !== process.env.ADMIN_PASSWORD) {
      if (isAdminUI) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
