"use client";
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Check, X } from "lucide-react";

const FormsTable = () => {
    const supabase = createClient();
    const [forms, setForms] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Función para obtener los datos de la tabla forms
    const fetchForms = async () => {
        try {
            const { data, error } = await supabase
                .from('forms')
                .select('*')
                .order('revision_date', { ascending: false });
            if (error) throw error;
            setForms(data || []);
        } catch (error) {
            console.error('Error al cargar los formularios:', error);
        } finally {
            setLoading(false);
        }
    };

    // Función para alternar el estado de "approved" y añadir al whitelist
    // Modificar la función handleToggleApproval
    const handleStatusChange = async (id: string, newStatus: 'accepted' | 'rejected', minecraftUsername: string) => {
        try {
            // Si se está admitiendo al jugador
            if (newStatus === 'accepted') {
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
            } else {
                // Si se está rechazando, remover del whitelist
                const unwhitelistResponse = await fetch('/api/unwhitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ minecraftUsername }),
                });

                if (!unwhitelistResponse.ok) {
                    const errorData = await unwhitelistResponse.json();
                    throw new Error(errorData.error || 'Error al remover del whitelist.');
                }
            }

            // Actualizar el estado en Supabase
            const { error } = await supabase
                .from('forms')
                .update({ 
                    status: newStatus,
                    revision_date: new Date().toISOString() 
                })
                .eq('id', id);

            if (error) throw error;

            alert(newStatus === 'accepted' ? 'Jugador admitido exitosamente.' : 'Jugador rechazado.');
            fetchForms();
        } catch (error) {
            console.error('Error al cambiar el estado del jugador:', error);
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
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-lg font-bold">Lista de Formularios</h1>
                <p className="text-base text-muted-foreground">
                    Gestiona las solicitudes de ingreso al servidor.
                </p>
            </div>

            {/* Table Container */}
            <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50">
                            <TableHead className="font-medium">Nombre</TableHead>
                            <TableHead className="font-medium">Usuario de Minecraft</TableHead>
                            <TableHead className="font-medium">Conexión</TableHead>
                            <TableHead className="font-medium">Conocimiento MC</TableHead>
                            <TableHead className="font-medium">Pregunta Clave</TableHead>
                            <TableHead className="font-medium">Mic Disponible</TableHead>
                            <TableHead className="font-medium">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : paginatedForms.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground">
                                    No hay formularios disponibles.
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedForms.map((form) => (
                                <TableRow key={form.id} className="hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50">
                                    <TableCell>{form.name}</TableCell>
                                    <TableCell>{form.minecraft_username}</TableCell>
                                    <TableCell>{form.connectivity_issues ? 'Sí' : 'No'}</TableCell>
                                    <TableCell>{form.minecraft_knowledge}<span className='text-muted-foreground'>/5</span></TableCell>
                                    <TableCell>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="text-left">
                                                    <span className="max-w-md truncate block">
                                                        {form.killer_question}
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent className="max-w-lg">
                                                    <p className="text-sm">{form.killer_question}</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell>{form.mic_available ? 'Sí' : 'No'}</TableCell>
                                    <TableCell>
                                        {form.status === 'pending' ? (
                                            <div className="flex gap-1">
                                                <Button
                                                    onClick={() => handleStatusChange(form.id, 'accepted', form.minecraft_username)}
                                                    variant="default"
                                                    size="icon"
                                                    className="rounded-xl h-8 w-8"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleStatusChange(form.id, 'rejected', form.minecraft_username)}
                                                    variant="destructive"
                                                    size="icon"
                                                    className="rounded-xl h-8 w-8"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : form.status === 'accepted' ? (
                                            <Button
                                                onClick={() => handleStatusChange(form.id, 'rejected', form.minecraft_username)}
                                                variant="destructive"
                                                className="rounded-xl px-3 py-1"
                                            >
                                                Rechazar
                                            </Button>
                                        ) : (
                                            <Button
                                                onClick={() => handleStatusChange(form.id, 'accepted', form.minecraft_username)}
                                                variant="default"
                                                className="rounded-xl px-3 py-1"
                                            >
                                                Aprobar
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex justify-center mt-8 items-center gap-4">
                    <Button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1}
                        variant="outline"
                        className="rounded-xl"
                    >
                        Anterior
                    </Button>
                    <span className="text-muted-foreground text-base">{`Página ${page} de ${totalPages}`}</span>
                    <Button
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages}
                        variant="outline"
                        className="rounded-xl"
                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FormsTable;