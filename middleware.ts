export { default } from "next-auth/middleware";
export const config = {
  matcher: [
    "/comingsoon/:path*",
  ],
};

// export function middleware(request: NextRequest) {}

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { persistor, store } from "@/store/store";
// import { $CombinedState } from "redux";

// export function middleware(request: NextRequest) {
//   // console.log("middleware");

//   // const url = request.nextUrl.clone();

//   // console.log(store.getState().authReducer.token);

//   // console.log(url);
//   // console.log(request.url);

//   const loggedIn = false;

//   if (loggedIn) {
//     if (request.nextUrl.pathname.startsWith("/login")) {
//       return NextResponse.rewrite(new URL("/", request.url));
//     }
//     if (request.nextUrl.pathname.startsWith("/register")) {
//       return NextResponse.rewrite(new URL("/", request.url));
//     }
//   } else {
//     if (
//       request.nextUrl.pathname.startsWith("/dashboard") ||
//       request.nextUrl.pathname.startsWith("/store/offers") ||
//       request.nextUrl.pathname.startsWith("/reward") ||
//       request.nextUrl.pathname.startsWith("/customers") ||
//       request.nextUrl.pathname.startsWith("/notifications") ||
//       request.nextUrl.pathname.startsWith("/analytics")
//     ) {
//       return NextResponse.rewrite(new URL("/login", request.url));
//       // } else {
//       //   if (url.pathname === "/") {
//       //     // url.pathname === "/store/offers";
//       //     return NextResponse.redirect(url);
//       //   }
//     }
//   }
// }
