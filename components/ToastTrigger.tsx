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
      const userId = await getUserID();
      if (!userId) return; // Si no hay ID de usuario, no continuamos

      // Consultar la tabla `forms` para obtener el estado de `already_submitted`
      const { data, error } = await supabase.from("forms").select("already_submitted").eq("id", userId).single();

      if (error) {
        console.error("Error al consultar la base de datos:", error.message);
        return;
      }

      const submitted = data?.already_submitted ?? false; // Leer el valor de `already_submitted`

      // Mostrar el Toast si el formulario no ha sido enviado
      if (!submitted) {
        console.log("Mostrando Toast");
        toast({
          title: "Acceso al servidor de Minecraft",
          description: "Por favor, completa el formulario de acceso para continuar.",
          duration: Infinity,
          action: (
            <Link href="/formulario">
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  dismiss();
                  localStorage.setItem("toastClosed", "true"); // Marcar como cerrado
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
  }, [toast]);

  return null; // Este componente no renderiza nada
};