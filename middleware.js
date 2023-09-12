import { NextResponse } from "next/server";

export const middleware = (req) => {
  if (req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/orders", req.url));
  }

  return NextResponse.next();
};
