"use client"
import { useEffect, useState } from 'react';
import { Button } from './ui/button'; // Asegúrate de que la ruta sea correcta
import { Input } from './ui/input'; // Asegúrate de que la ruta sea correcta
import { createClient } from '@/utils/supabase/client';
import { id } from 'date-fns/locale';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Textarea } from './ui/textarea';

interface EditBioProps {
    userId: string;
    currentBio: string;
    onUpdate: (bio: string) => void;
}

export default function EditBio({ userId, currentBio, onUpdate }: EditBioProps) {
    const [bio, setBio] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    // Crea una instancia del cliente de Supabase
    const supabase = createClient();

    // Sincroniza bio con currentBio cuando cambia currentBio
    useEffect(() => {
        setBio(currentBio); // Actualiza bio al valor de currentBio
    }, [currentBio]); // Se ejecuta cada vez que currentBio cambia

    const handleSave = async () => {
        const { data: profile, error: profileError } = await supabase
            .from('profiles') // Asegúrate de que la tabla se llama 'profiles'
            .update({ bio })
            .eq('id', userId)
            .select().single();
        if (profile === null) {
            // Insertar una nueva fila
            const { data: newProfile, error: insertError } = await supabase
                .from('profiles')
                .insert([{ id: userId, bio }])
                .select()
                .single();

            if (insertError) {
                console.error('Error al insertar el perfil:', insertError);
                return;
            }

            console.log('Nuevo perfil creado:', newProfile);
        }
        if (profileError) {
            console.error('Error al verificar el perfil:', profileError);
            return;
        } else {
            console.log('Datos actualizados:', profile);
            onUpdate(bio);
            setIsOpen(false);
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Editar perfil</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Biografía</DialogTitle>
                </DialogHeader>
                <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                placeholder="Escribe tu biografía aquí..."
                />
                <Button onClick={handleSave}>Guardar</Button>
            </DialogContent>
        </Dialog>
    );
}