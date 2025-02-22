"use client";
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from './ui/button';

const FormsTable = () => {
    const supabase = createClient();
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Función para obtener los datos de la tabla forms
    const fetchForms = async () => {
        try {
            const { data, error } = await supabase.from('forms').select('*');
            if (error) throw error;
            setForms(data || []);
        } catch (error) {
            console.error('Error al cargar los formularios:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para alternar el estado de "approved" y añadir al whitelist
    const handleToggleApproval = async (id: string, currentApprovedStatus: boolean, minecraftUsername: string) => {
        try {
            // Alternar el valor de "approved"
            const newApprovedStatus = !currentApprovedStatus;

            // Si se está admitiendo al jugador, enviarlo al whitelist
            if (newApprovedStatus) {
                const whitelistResponse = await fetch('/api/whitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ minecraftUsername }),
                });

                if (!whitelistResponse.ok) {
                    const errorData = await whitelistResponse.json();
                    throw new Error(errorData.error || 'Error al agregar al whitelist.');
                }

                // Actualizar la columna 'minecraft_username' en la tabla profiles
                const { error: profileError } = await supabase
                    .from('profiles')
                    .update({ minecraft_username: minecraftUsername })
                    .eq('id', id);

                if (profileError) {
                    throw new Error('Error al actualizar el nombre de Minecraft en la tabla profiles.');
                }
            }
            // Si se está desaprobando al jugador, removerlo del whitelist
            else {
                const unwhitelistResponse = await fetch('/api/unwhitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: minecraftUsername }),
                });

                if (!unwhitelistResponse.ok) {
                    const errorData = await unwhitelistResponse.json();
                    throw new Error(errorData.error || 'Error al remover del whitelist.');
                }
            }

            // Actualizar el estado en Supabase
            const { error } = await supabase
                .from('forms')
                .update({ approved: newApprovedStatus })
                .eq('id', id);

            if (error) throw error;

            alert(newApprovedStatus ? 'Jugador admitido exitosamente.' : 'Jugador desaprobado.');
            fetchForms(); // Actualizar los datos después de cambiar el estado
        } catch (error) {
            console.error('Error al alternar el estado del jugador:', error);
            alert(`Ocurrió un error: ${(error as any).message}`);
        }
    };

    useEffect(() => {
        fetchForms();
    }, []);

    // Paginación
    const totalPages = Math.ceil(forms.length / itemsPerPage);
    const paginatedForms = forms.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="w-full">
            {/* Encabezado */}
            <h1 className="text-2xl font-bold mb-4">Lista de Formularios</h1>

            {/* Cuerpo de la tabla */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Usuario de Minecraft</TableHead>
                        <TableHead>Conexión</TableHead>
                        <TableHead>Pregunta Clave</TableHead>
                        <TableHead>Mic Disponible</TableHead>
                        <TableHead>Aprobado</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                Cargando...
                            </TableCell>
                        </TableRow>
                    ) : paginatedForms.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={7} className="text-center">
                                No hay formularios disponibles.
                            </TableCell>
                        </TableRow>
                    ) : (
                        paginatedForms.map((form) => (
                            <TableRow key={form.id}>
                                <TableCell>{form.name}</TableCell>
                                <TableCell>{form.minecraft_username}</TableCell>
                                <TableCell>{form.connectivity_issues ? 'Sí' : 'No'}</TableCell>
                                <TableCell>{form.killer_question}</TableCell>
                                <TableCell>{form.mic_available ? 'Sí' : 'No'}</TableCell>
                                <TableCell>{form.approved ? 'Sí' : 'No'}</TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleToggleApproval(form.id, form.approved, form.minecraft_username)
                                        }
                                        className={`px-4 py-2 rounded hover:bg-gray-600 ${form.approved
                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                            : 'bg-green-500 text-white hover:bg-green-600'
                                            }`}
                                    >
                                        {form.approved ? 'Desaprobar Jugador' : 'Admitir Jugador'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Paginación Manual */}
            <div className="flex justify-center mt-4 items-center">
                <Button

                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    className="mr-2"
                    disabled={page === 1}
                >
                    Anterior
                </Button>
                <span className="px-4 py-2 text-xl">{`Página ${page} de ${totalPages}`}</span>
                <Button

                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    className="ml-2"
                    disabled={page === totalPages}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default FormsTable;