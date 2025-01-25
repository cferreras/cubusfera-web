"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Container from "@/components/Container";
import EditBio from "@/components/EditBio";
import ProfileTitle from "@/components/ProfileTitle";
import { User } from '@supabase/supabase-js';
import Link from "next/link";
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function Perfil() {
    const [user, setUser] = useState<User | null>(null);
    const [bio, setBio] = useState('');
    const supabase = createClient();

    // Función para obtener el token de acceso
    const getAccessToken = async () => {
        const { data: { session } } = await supabase.auth.getSession(); // Obtiene la sesión actual

        if (session) {
            console.log(session.access_token)
            return session.access_token; // Retorna el token de acceso
        } else {
            throw new Error("No hay una sesión activa"); // Manejo de errores si no hay sesión
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            // Obtén el usuario autenticado
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            // Obtén la biografía del perfil del usuario
            const { data: profile, error } = await supabase
                .from('profiles')
                .select('bio')
                .eq('id', user?.id)
                .single();

            if (error) {
                console.info('No se ha encontrado perfil:', error);
                return;
            }
            if (profile) {
                setBio(profile.bio);
            }
        };

        fetchUser();
        // Ejemplo de uso
        const fetchDataFromApi = async () => {
            try {
                const token = await getAccessToken(); // Obtiene el token

                const response = await fetch('http://51.68.37.119:8089', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}` // Envía el token en el encabezado
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos');
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        // Llama a la función para probar
        fetchDataFromApi();
    }, []);

    // if (!user) {
    //     return <div>Cargando...</div>;
    // }

    return (
        <>
            <ProfileTitle title={user?.user_metadata?.full_name ?? 'Guest'} rank="Owner" tooltip={user?.user_metadata?.full_name ?? 'Guest'} />
            <Container>
                {/* Grid responsive */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 my-3 h-auto">
                    {/* Columna izquierda: Biografía */}
                    <div className="col-span-1 md:col-span-8">
                        <Card className="w-full h-full">
                            <CardHeader>
                                <div className="flex gap-2 items-center justify-between">
                                    <Link href="#" className="text-base md:text-lg space-x-1 hover:underline">
                                        <span className="font-bold">8</span>
                                        <span className="opacity-75">Amigos</span>
                                    </Link>
                                    <EditBio userId={user?.id ?? ''} currentBio={bio} onUpdate={setBio} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">{bio}</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Columna derecha: Información del perfil */}
                    <div className="col-span-1 md:col-span-4">
                        <Card className="w-full h-full">
                            <CardHeader>
                                <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200">Información del Perfil</h2>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Ubicación */}
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12"
                                        />
                                    </svg>
                                    <span>España</span>
                                </div>

                                {/* Fecha de unión */}
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M11 14v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zm-4 4v-2h2v2zm-4 0v-2h2v2zm8 0v-2h2v2zM3 22V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5zM5 8h14V6H5zm0 0V6z"
                                        />
                                    </svg>
                                    <span>Se unió en enero de 2025</span>
                                </div>

                                {/* Discord */}
                                <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" />
                                    </svg>
                                    <span>Cferreras</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </>
    );
}


