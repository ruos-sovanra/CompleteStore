import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	console.log("========| Middleware Running |========");
	console.log("=> Request URL: ", request.url);
	console.log("=> Request Method: ", request.method);
	// console.log("=> Request Headers: ", request.headers)
	const cookies = request.cookies;
	// console.log("=> Request Cookies: ", cookies)
	const session = cookies.get("authjs.session-token");
	console.log("=> Session: ", session);

	if (!session) {
		return NextResponse.redirect(new URL("/", request.url).toString());
	}
}

// multiple middleware
export const config = {
	matcher: ["/about"],
};
