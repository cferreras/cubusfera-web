"use client";
import { createClient } from '@/utils/supabase/client';
import { useState, useEffect, useCallback } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from './ui/button';
import { Check, X, ChevronDown, ChevronUp, Eye } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface Form {
    id: string;
    name: string;
    minecraft_username: string;
    connectivity_issues: string;
    minecraft_knowledge: string;
    killer_question: string;
    mic_available: boolean;
    uses_mic: string;
    status: string;
    revision_date: string;
    premium_minecraft: string;
    discord_full_name: string;
    minecraft_skills: boolean[];
    farm_experience: boolean[];
    technical_question_1: string;
    iron_golem_mechanics: string; // Nuevo campo

    lag_optimization: string; // Nuevo campo
    technical_project_plan: string; // Nuevo campo
    terms_acceptance: boolean[]; // Nuevo campo
    player_type: string; // Campo existente que faltaba
    technical_question_2: string;
    update_suppression_knowledge: string;
    iron_farm_knowledge: string;
}

const FormsTable = () => {
    const supabase = createClient();
    const [forms, setForms] = useState<Form[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const itemsPerPage = 10;

    // Wrap fetchForms in useCallback to prevent recreation on every render
    const fetchForms = useCallback(async () => {
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
    }, [supabase]);

    const handleStatusChange = async (id: string, newStatus: 'accepted' | 'rejected', minecraftUsername: string) => {
        try {
            setLoading(true);

            // Find the form to get the Discord username
            const form = forms.find(f => f.id === id);
            const discordUsername = form?.discord_full_name || 'Unknown';

            // Si se está admitiendo al jugador
            if (newStatus === 'accepted') {
                const whitelistResponse = await fetch('/api/whitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        minecraftUsername,
                        discordUsername
                    }),
                });

                if (!whitelistResponse.ok) {
                    const errorData = await whitelistResponse.json();
                    throw new Error(errorData.error || 'Error al agregar al whitelist.');
                }

                // Use a server-side API to update the profile
                const profileResponse = await fetch('/api/update-profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: id,
                        minecraftUsername: minecraftUsername
                    }),
                });

                if (!profileResponse.ok) {
                    const errorData = await profileResponse.json();
                    throw new Error(errorData.error || 'Error al actualizar el perfil.');
                }
            } else {
                // Si se está rechazando, remover del whitelist
                const unwhitelistResponse = await fetch('/api/unwhitelist', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        minecraftUsername,
                        discordUsername
                    }),
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

            // Update the local state directly instead of calling fetchForms again
            setForms(prevForms =>
                prevForms.map(form =>
                    form.id === id
                        ? { ...form, status: newStatus, revision_date: new Date().toISOString() }
                        : form
                )
            );
        } catch (error) {
            console.error('Error al cambiar el estado del jugador:', error);
            console.error('Error occurred:', (error as Error).message);
            alert(`Error: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleResetToNotSubmitted = async (id: string) => {
        try {
            setLoading(true);

            // Actualizar el estado en Supabase para permitir volver a enviar el formulario
            const { error } = await supabase
                .from('forms')
                .update({
                    already_submitted: false,
                    revision_date: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;

            alert('Formulario habilitado para volver a enviarse.');

            // Update local state directly
            setForms(prevForms =>
                prevForms.map(form =>
                    form.id === id
                        ? { ...form, already_submitted: false, revision_date: new Date().toISOString() }
                        : form
                )
            );
        } catch (error) {
            console.error('Error al reiniciar el formulario:', error);
            console.error('Error occurred:', (error as Error).message);
            alert(`Error: ${(error as Error).message}`);
        } finally {
            setLoading(false);
        }
    };

    // Toggle expanded row
    const toggleExpandRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    useEffect(() => {
        fetchForms();
    }, [fetchForms]);

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
                            <TableHead className="font-medium">Conocimiento MC</TableHead>
                            <TableHead className="font-medium">Micrófono</TableHead>
                            <TableHead className="font-medium">Detalles</TableHead>
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
                                <>
                                    <TableRow
                                        key={form.id}
                                        className={`hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 ${expandedRow === form.id ? 'bg-neutral-200/30 dark:bg-neutral-800/30' : ''}`}
                                    >
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span>{form.name}</span>
                                                <span className="text-sm text-muted-foreground">{form.discord_full_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {form.minecraft_username}
                                            {form.premium_minecraft === "Sí" ?
                                                <div className='text-muted-foreground'>Premium</div> :
                                                <div className='text-muted-foreground'>No premium</div>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            {form.minecraft_knowledge}<span className='text-muted-foreground'>/5</span>
                                        </TableCell>
                                        <TableCell>
                                            {form.uses_mic ? 'Sí' : 'No'}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => toggleExpandRow(form.id)}
                                                    variant="outline"
                                                    size="icon"
                                                    className="rounded-xl h-8 w-8"
                                                >
                                                    {expandedRow === form.id ?
                                                        <ChevronUp className="h-4 w-4" /> :
                                                        <ChevronDown className="h-4 w-4" />
                                                    }
                                                </Button>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            className="rounded-xl h-8 w-8"
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                                                        <DialogHeader>
                                                            <DialogTitle>Detalles del formulario de {form.name}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="space-y-4 mt-4">
                                                            <Accordion type="single" collapsible className="w-full">
                                                                <AccordionItem value="info-personal">
                                                                    <AccordionTrigger>Información Personal</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div>
                                                                                <h3 className="font-semibold">Nombre</h3>
                                                                                <p>{form.name}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Discord</h3>
                                                                                <p>{form.discord_full_name}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Usuario de Minecraft</h3>
                                                                                <p>{form.minecraft_username}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Minecraft Premium</h3>
                                                                                <p>{form.premium_minecraft}</p>
                                                                            </div>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="tech-info">
                                                                    <AccordionTrigger>Información Técnica</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="grid grid-cols-2 gap-4">
                                                                            <div>
                                                                                <h3 className="font-semibold">Usa micrófono</h3>
                                                                                <p>{form.uses_mic}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Problemas de conexión</h3>
                                                                                <p>{form.connectivity_issues ? 'Sí' : 'No'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Conocimiento de Minecraft</h3>
                                                                                <p>{form.minecraft_knowledge}/5</p>
                                                                            </div>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="technical-questions">
                                                                    <AccordionTrigger>Preguntas Técnicas</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div className="space-y-4">
                                                                            <div>
                                                                                <h3 className="font-semibold">Los aldeanos necesitan acceso a sus estaciones de trabajo para reabastecerse</h3>
                                                                                <p>{form.technical_question_1 || 'No respondido'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Explica cómo funcionan los Iron Golems en las granjas de hierro</h3>
                                                                                <p className="whitespace-pre-wrap">{form.iron_golem_mechanics || 'No respondido'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">¿Qué es el &apos;update suppression&apos; en Minecraft?</h3>
                                                                                <p className="whitespace-pre-wrap">{form.update_suppression_knowledge || 'No respondido'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">¿Cómo optimizarías una granja que está causando lag?</h3>
                                                                                <p className="whitespace-pre-wrap">{form.lag_optimization || 'No respondido'}</p>
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-semibold">Proyecto técnico que te gustaría desarrollar</h3>
                                                                                <p className="whitespace-pre-wrap">{form.technical_project_plan || 'No respondido'}</p>
                                                                            </div>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                                <AccordionItem value="motivation">
                                                                    <AccordionTrigger>Motivación</AccordionTrigger>
                                                                    <AccordionContent>
                                                                        <div>
                                                                            <h3 className="font-semibold">Motivación para unirse al servidor</h3>
                                                                            <p className="whitespace-pre-wrap">{form.killer_question}</p>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
                                                        </div>
                                                    </DialogContent>
                                                </Dialog>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                {form.status === 'pending' ? (
                                                    <>
                                                        <Button
                                                            onClick={() => handleStatusChange(form.id, 'accepted', form.minecraft_username)}
                                                            variant="outline"
                                                            className="rounded-xl h-8"
                                                        >
                                                            <Check className="h-4 w-4 mr-1" /> Aprobar
                                                        </Button>
                                                        <Button
                                                            onClick={() => handleStatusChange(form.id, 'rejected', form.minecraft_username)}
                                                            variant="outline"
                                                            className="rounded-xl h-8"
                                                        >
                                                            <X className="h-4 w-4 mr-1" /> Rechazar
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {form.status === 'accepted' ? (
                                                            <Button
                                                                onClick={() => handleStatusChange(form.id, 'rejected', form.minecraft_username)}
                                                                variant="outline"
                                                                className="rounded-xl h-8"
                                                            >
                                                                <X className="h-4 w-4 mr-1" /> Cambiar a rechazado
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                onClick={() => handleStatusChange(form.id, 'accepted', form.minecraft_username)}
                                                                variant="outline"
                                                                className="rounded-xl h-8"
                                                            >
                                                                <Check className="h-4 w-4 mr-1" /> Cambiar a aprobado
                                                            </Button>
                                                        )}
                                                        <Button
                                                            onClick={() => handleResetToNotSubmitted(form.id)}
                                                            variant="outline"
                                                            className="rounded-xl h-8"
                                                        >
                                                            Reiniciar
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                    {expandedRow === form.id && (
                                        <TableRow className="bg-neutral-200/30 dark:bg-neutral-800/30">
                                            <TableCell colSpan={6} className="p-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <h3 className="font-semibold">Problemas de conexión</h3>
                                                        <p>{form.connectivity_issues ? 'Sí' : 'No'}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Motivación</h3>
                                                        <p className="truncate max-w-xs">{form.killer_question}</p>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Conocimientos técnicos</h3>
                                                        <div className="text-sm">
                                                            <p>Aldeanos: {form.technical_question_1 || 'No respondido'}</p>
                                                            <p>Pistones: {form.technical_question_2 || 'No respondido'}</p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold">Habilidades</h3>
                                                        <p className="text-sm">{form.minecraft_skills ? `${form.minecraft_skills.filter(Boolean).length} habilidades` : 'No especificado'}</p>
                                                        <p className="text-sm">{form.farm_experience ? `${form.farm_experience.filter(Boolean).length} tipos de granjas` : 'No especificado'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </>
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