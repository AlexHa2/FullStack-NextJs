import { NextResponse } from "next/server";
import { authMiddleware } from "./middlewares/api/authMiddleware";

export const config = {
  matcher: "/api/:path*",
};

export default function middleware(request: Request) {
  const autheResult = authMiddleware(request);
   if (!autheResult?.isValid ) {
    return new NextResponse(
      JSON.stringify({
        message: "Unauthorize",
      }),
      { status: 401 }
    );
  }
  return NextResponse.next();
}
