import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import { NextResponse } from "next/server";

export const { POST, GET } = toNextJsHandler(auth);

// // Handle CORS preflight requests
// export async function OPTIONS() {
//   return new Response(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//       "Access-Control-Allow-Credentials": "true",
//       "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//       "Access-Control-Max-Age": "86400",
//     },
//   });
// }

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
