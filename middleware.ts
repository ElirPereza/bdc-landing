import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the auth token and get user
  const { data: { user } } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Protected routes - redirect to login if not authenticated
  if (pathname.startsWith("/dashboard") && !user) {
    const loginUrl = new URL("/login", request.url)
    return NextResponse.redirect(loginUrl)
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (pathname === "/login" && user) {
    const dashboardUrl = new URL("/dashboard", request.url)
    return NextResponse.redirect(dashboardUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
  ],
}
