// middleware.ts
import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

// This function can be marked `async` if using `await` inside
export async function middleware(req) {
  // We need to create a response and hand it to the supabase client to be able to modify the response headers.
  const res = NextResponse.next()

  // Create authenticated Supabase Client.
  const supabase = createMiddlewareSupabaseClient({ req, res })

  // Check if we have a session
  //   const {
  //     data: { session }
  //   } = await supabase.auth.getSession()

  //   if (!session) {
  //     // Auth condition not met, redirect to home page.
  //     const redirectUrl = req.nextUrl.clone()
  //     redirectUrl.pathname = "/signin"
  //     redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
  //     return NextResponse.redirect(redirectUrl)
  //   }

  return res
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/app", "/app/:path*"]
}
