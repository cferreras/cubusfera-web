// components/ToastTrigger.tsx
"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { getUserID } from "@/utils/supabaseUtils";

export const ToastTrigger = () => {
  const { toast, dismiss } = useToast();
  const supabase = createClient();
  const hasShownToast = useRef(false);

  useEffect(() => {
    let mounted = true;

    const fetchSessionAndShowToast = async () => {
      if (hasShownToast.current) return;
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !mounted) return;
      const userId = await getUserID();

      // First check if user exists in forms table
      const { data: userExists, error: existsError } = await supabase
        .from("forms")
        .select("id, already_submitted")
        .eq("id", userId)
        .maybeSingle();

      if ((!userExists || !userExists.already_submitted) && 
          window.location.pathname !== '/formulario' && 
          mounted) {
        hasShownToast.current = true;
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
                onClick={() => dismiss()}
              >
                Ir al formulario
              </Button>
            </Link>
          ),
        });
      }
    };
  
    fetchSessionAndShowToast();

    return () => {
      mounted = false;
    };
}, [dismiss, supabase, toast]);
  return null; // Este componente no renderiza nada
};