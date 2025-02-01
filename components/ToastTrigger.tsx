// components/ToastTrigger.tsx
"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";

export const ToastTrigger = () => {
  const { toast, dismiss } = useToast(); // Usamos `dismiss` para cerrar el Toast
  const supabase = createClient();

  useEffect(() => {
    const fetchSessionAndShowToast = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const submitted = localStorage.getItem("formSubmitted") === "true";
      // const toastClosed = localStorage.getItem("toastClosed") === "true";
  
      if (!submitted && session) {
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