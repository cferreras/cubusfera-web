import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  try {
    const currentPath = request.nextUrl.pathname;

    // Excluir rutas específicas del middleware
    if (
      currentPath.startsWith("/auth/callback") || // Excluir la ruta de callback
      currentPath === "/login" || // Evitar procesar si ya está en /login
      currentPath === "/" // Opcional: Excluir la ruta principal si no necesitas protegerla
    ) {
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

    if (userError) {
      console.error("Error al obtener el usuario:", userError);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Definir rutas protegidas
    const protectedRoutes = ["/perfil", "/configuracion", "/formulario"];
    const adminOnlyRoutes = ["/formulario/admin"]; // Ruta específica para administradores

    // Verificar si la ruta actual es protegida y si el usuario no está autenticado
    if (
      protectedRoutes.some((route) => currentPath.startsWith(route)) &&
      !user // Solo redirigir si el usuario no está autenticado
    ) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("next", currentPath); // Usar la ruta actual como valor predeterminado
      return NextResponse.redirect(loginUrl);
    }

    // Si la ruta requiere rol de administrador, verificar el rol
    if (adminOnlyRoutes.includes(currentPath)) {
      if (!user) {
        // Si no hay usuario, redirigir al inicio de sesión
        return NextResponse.redirect(new URL("/login", request.url));
      }

      // Consultar el rol del usuario en la tabla profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profileError || profile.role !== "admin") {
        // Si no es administrador, redirigir a una página de acceso denegado
        return NextResponse.redirect(new URL("/access-denied", request.url));
      }
    }

    // Si todo está bien, permitir el acceso
    return response;
  } catch (e) {
    console.error("Error en updateSession:", e);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};