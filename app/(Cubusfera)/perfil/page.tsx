"use client";
import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import Container from "@/components/Container";

export default function Perfil() {
    const supabase = createClient();

    useEffect(() => {
        const fetchUserAndRedirect = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();

                if (user) {
                    const { data: profile } = await supabase
                        .from("profiles")
                        .select("minecraft_username")
                        .eq("id", user.id)
                        .single();

                    if (profile?.minecraft_username) {
                        window.location.href = `/perfil/${profile.minecraft_username}`;
                    } else {
                        window.location.href = '/formulario';
                    }
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchUserAndRedirect();
    }, [supabase]);

    // Show loading state while redirecting
    return (
        <Container className="py-20">
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-neutral-600 dark:text-neutral-400">Redirigiendo...</p>
            </div>
        </Container>
    );
}