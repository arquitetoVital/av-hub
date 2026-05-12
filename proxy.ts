import { withAuth } from "next-auth/middleware";

export default withAuth(
  // Caso bloquear acesso através das rotas:
  // function middleware(req) {
  //   const token = req.nextauth.token;

  //   if (req.nextUrl.pathname.startsWith("/admin")) {
  //     if (token?.role !== "admin") {
  //       return NextResponse.redirect(new URL("/login", req.url));
  //     }
  //   }
  // },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    }
  },
);

//rotas que serão bloqueadas sem autenticação
export const config = {
  matcher: [
    "/",
    "/orcamento/:path*"
  ],
};