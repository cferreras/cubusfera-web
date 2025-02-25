// components/ToastTrigger.tsx
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { getUserID } from "@/utils/supabaseUtils";

export const ToastTrigger = () => {
  const { toast, dismiss } = useToast(); // Usamos `dismiss` para cerrar el Toast
  const supabase = createClient();

  useEffect(() => {
    const fetchSessionAndShowToast = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return; // Si no hay ID de usuario, no continuamos
      const userId = await getUserID();

      // Consultar la tabla `forms` para obtener el estado de `already_submitted`
      const { data, error } = await supabase.from("forms").select("already_submitted").eq("id", userId).single();

      if (error) {
        console.error("Error al consultar la base de datos:", error.message);
        return;
      }

      const submitted = data?.already_submitted ?? false; // Leer el valor de `already_submitted`

      // Mostrar el Toast si el formulario no ha sido enviado y no estamos en la página del formulario
      if (!submitted && window.location.pathname !== '/formulario') {
        console.log("Mostrando Toast");
        toast({
          title: "Acceso al servidor de Minecraft",
          description: "Por favor, completa el formulario de acceso para continuar.",
          duration: Infinity,
          className: "bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl",
          action: (
            <Link href="/formulario">
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
                onClick={() => {
                  dismiss();
                  localStorage.setItem("toastClosed", "true");
                }}
              >
                Ir al formulario
              </Button>
            </Link>
          ),
        });
      }
    };
  
    fetchSessionAndShowToast();
}, [dismiss, supabase, toast]); // Add missing dependencies
  return null; // Este componente no renderiza nada
};