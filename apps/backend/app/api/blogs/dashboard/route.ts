import getCorsHeaders from "@/constants/corsHeader";
import { auth } from "@/lib/auth";
import { createBlog } from "@/services/blogs";
import { NETWORK_ERROR_CODES } from "@workspace/constants/errorCodes";
import { createBlogsSchema } from "@workspace/schema/blogs";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!(session && session.user)) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHENTICATED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHENTICATED.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }

  const { error, success } = await auth.api.userHasPermission({
    body: {
      permissions: {
        blogs: ["insert"],
      },
    },
    headers: await headers(),
  });

  if (error || !success) {
    return NextResponse.json(NETWORK_ERROR_CODES.UNAUTHORIZED.body, {
      status: NETWORK_ERROR_CODES.UNAUTHORIZED.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }

  const { success: isValid, data } = createBlogsSchema.safeParse(
    await request.json()
  );

  if (!isValid) {
    return NextResponse.json(NETWORK_ERROR_CODES.BAD_REQUEST.body, {
      status: NETWORK_ERROR_CODES.BAD_REQUEST.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }

  const authorId = session.user.id;

  const result = await createBlog({ authorId, ...data });
  if (!result) {
    return NextResponse.json(NETWORK_ERROR_CODES.INTERNAL_ERROR.body, {
      status: NETWORK_ERROR_CODES.INTERNAL_ERROR.init.status,
      headers: { ...getCorsHeaders("POST") },
    });
  }
  return NextResponse.json(
    {
      success: true,
      id: result.id,
      message: "Blog Creation Successful",
    },
    {
      headers: { ...getCorsHeaders("POST") },
    }
  );
}

// export async function OPTIONS() {
//   return NextResponse.json(
//     {},
//     {
//       headers: {
//         ...getCorsHeaders(["GET", "OPTIONS", "POST", "PUT", "DELETE"]),
//       },
//     }
//   );
// }

// export function OPTIONS() {
//   return new NextResponse(null, {
//     status: 204,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, x-forwarded-host, cache-control",
      "Access-Control-Allow-Credentials": "true",
    },
  });
}
