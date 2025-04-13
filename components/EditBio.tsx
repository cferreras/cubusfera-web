"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createClient } from "@/utils/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "./ui/form";

interface EditBioProps {
    userId: string;
    currentBio: string;
    onUpdateBio: (bio: string) => void;
    discord: string;
    onUpdateDiscord: (discord: string) => void;
    twitter: string;
    onUpdateTwitter: (twitter: string) => void;
    instagram: string;
    onUpdateInstagram: (instagram: string) => void;
    youtube: string;
    onUpdateYoutube: (youtube: string) => void;
    location: string;
    onUpdateLocation: (location: string) => void;
}

// Updated schema with Discord username
const profileSchema = z.object({
    bio: z
        .string()
        .max(500, { message: "La biografía no puede exceder los 500 caracteres." })
        .nullable()
        .optional()
        .refine((value) => value === null || value === "" || value?.trim().length || 0 > 0, {
            message: "La biografía no puede contener solo espacios en blanco.",
        }),
    twitterUsername: z
        .string()
        .nullable()
        .optional()
        .refine((value) => value === null || value === "" || /^[a-zA-Z0-9_]{1,15}$/.test(value || ""), {
            message: "El nombre de usuario de Twitter debe tener entre 1 y 15 caracteres alfanuméricos.",
        }),
    instagramUsername: z
        .string()
        .nullable()
        .optional()
        .refine((value) => value === null || value === "" || /^[a-zA-Z0-9._]{1,30}$/.test(value || ""), {
            message: "El nombre de usuario de Instagram debe tener entre 1 y 30 caracteres alfanuméricos.",
        }),
    youtubeChannelUrl: z
        .string()
        .nullable()
        .optional()
        .refine((value) => value === null || value === "" || /^https?:\/\/www\.youtube\.com\/@[a-zA-Z0-9_-]+$/.test(value || ""), {
            message: "Ingresa una URL válida para tu canal de YouTube.",
        }),
    discordUsername: z
        .string()
        .nullable()
        .optional()
        .refine((value) => value === null || value === "" || /^[a-zA-Z0-9_]{3,32}$/.test(value || ""), {
            message: "El nombre de usuario de Discord debe tener entre 3 y 32 caracteres alfanuméricos.",
        }),
    location: z
        .string()
        .nullable()
        .optional()
        .refine((value) => {
            if (value === null || value === undefined || value === "") {
                return true;
            }
            return /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s,]{1,30}$/.test(value);
        }, {
            message: "La ubicación debe tener entre 1 y 30 caracteres.",
        }),
});

export default function EditBio({
    userId,
    currentBio,
    onUpdateBio,
    onUpdateDiscord,
    onUpdateTwitter,
    onUpdateInstagram,
    onUpdateYoutube,
    onUpdateLocation
}: EditBioProps) {
    const [isOpen, setIsOpen] = useState(false);
    const supabase = createClient();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            bio: currentBio || "",
            twitterUsername: null,
            instagramUsername: null,
            youtubeChannelUrl: null,
            discordUsername: null,
            location: null,
        },
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!userId) return;
            try {
                const { data: profile, error } = await supabase
                    .from("profiles")
                    .select("bio, twitter_username, instagram_username, youtube_channel_url, discord_username, location")
                    .eq("id", userId)
                    .single();

                if (error) {
                    console.error("Error al obtener los datos del perfil:", error);
                    return;
                }

                if (profile) {
                    form.reset({
                        bio: profile.bio || null,
                        twitterUsername: profile.twitter_username || null,
                        instagramUsername: profile.instagram_username || null,
                        youtubeChannelUrl: profile.youtube_channel_url || null,
                        discordUsername: profile.discord_username || null,
                        location: profile.location || null,
                    });
                }
            } catch (error) {
                console.error("Error al cargar los datos del perfil:", error);
            }
        };

        fetchProfileData();
    }, [userId, form, supabase]);

    const handleSave = async (values: z.infer<typeof profileSchema>) => {
        try {
            const dbValues = {
                bio: values.bio,
                twitter_username: values.twitterUsername || null,
                instagram_username: values.instagramUsername || null,
                youtube_channel_url: values.youtubeChannelUrl || null,
                discord_username: values.discordUsername || null,
                location: values.location || null,
            };

            const { data: profile, error: updateError } = await supabase
                .from("profiles")
                .update(dbValues)
                .eq("id", userId)
                .select()
                .single();

            if (updateError && profile === null) {
                const { data: newProfile, error: insertError } = await supabase
                    .from("profiles")
                    .insert([dbValues])
                    .select()
                    .single();

                if (insertError) {
                    console.error("Error al insertar el perfil:", insertError);
                    return;
                }

                console.log("Nuevo perfil creado:", newProfile);
            }

            if (updateError) {
                console.error("Error al actualizar el perfil:", updateError);
                return;
            }

            // Call all update functions
            onUpdateBio(values.bio || "");
            onUpdateTwitter(values.twitterUsername || "");
            onUpdateInstagram(values.instagramUsername || "");
            onUpdateYoutube(values.youtubeChannelUrl || "");
            onUpdateDiscord(values.discordUsername || "");
            onUpdateLocation(values.location || "");

            setIsOpen(false);
        } catch (error) {
            console.error("Error al guardar los cambios:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-neutral-100 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-md md:text-lg rounded-xl md:mx-4 md:py-6 py-5">
                    Editar Perfil
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Editar Perfil</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSave)} 
                        className="px-1 space-y-6 overflow-y-auto max-h-[calc(90vh-120px)]
                        scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 
                        scrollbar-track-neutral-100 dark:scrollbar-track-neutral-800 
                        hover:scrollbar-thumb-neutral-400 dark:hover:scrollbar-thumb-neutral-600
                        pr-4">
                        <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-neutral-900 dark:text-neutral-100">Biografía</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Escribe tu biografía aquí..."
                                            className="min-h-[100px] border-neutral-200 dark:border-neutral-800 resize-none"
                                        />
                                    </FormControl>
                                    <FormDescription className="text-neutral-600 dark:text-neutral-400">
                                        Compatible con formato Markdown.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="twitterUsername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario de Twitter (X)</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Ejemplo: john_doe"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu nombre de usuario de Twitter/X sin el &#34;@&#34;.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="instagramUsername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario de Instagram</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Ejemplo: john_doe"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu nombre de usuario de Instagram sin el &#34;@&#34;.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="youtubeChannelUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Canal de YouTube</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Ejemplo: https://www.youtube.com/@johndoe"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa el enlace directo a tu canal de YouTube.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discordUsername"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Usuario de Discord</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Ejemplo: john_doe"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu nombre de usuario de Discord.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Ubicación</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            {...field}
                                            value={field.value || ""}
                                            placeholder="Ejemplo: Ciudad, País"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Ingresa tu ubicación actual.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button 
                            type="submit" 
                            className="w-full bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-200"
                        >
                            Guardar cambios
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
