import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const currentPath = request.nextUrl.pathname;

    // Only process authentication for protected routes
    const protectedPaths = ["/configuracion", "/formulario"];
    const isProtectedRoute = protectedPaths.some(path => 
      currentPath === path
    );
    const isAdminRoute = currentPath === "/formulario/admin";

    // Skip middleware for non-protected routes and auth callbacks
    if (!isProtectedRoute && !isAdminRoute || currentPath === "/login" || currentPath.startsWith("/auth/callback")) {
      return NextResponse.next();
    }

    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Actualizar las cookies en la solicitud actual
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            // Actualizar las cookies en la respuesta
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      }
    );

    // Obtener información del usuario actual
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    // Redirect to login if no user for protected routes
    if (!user || userError) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", currentPath);
      return NextResponse.redirect(loginUrl);
    }

    // Additional admin check for admin routes
    if (isAdminRoute) {
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile?.role !== "admin") {
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }

    return response;
  } catch (e) {
    console.error("Error in updateSession:", e);
    return NextResponse.next();
  }
};