"use client";
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { Trash2 } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { Separator } from './ui/separator';

interface Comment {
    id: string;
    content: string;
    created_at: string;
    user_id: string;
    minecraft_username: string;
    profile_minecraft_username: string;
}

interface CommentProps {
    profileId: string;
    currentUser: User | null;
}

export default function Comentarios({ profileId, currentUser }: CommentProps) {
    const { toast } = useToast()
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const supabase = createClient();
    const [currentUserProfile, setCurrentUserProfile] = useState<{ minecraft_username: string } | null>(null);

    useEffect(() => {
        fetchComments();
    }, [profileId]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!currentUser) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('minecraft_username')
                .eq('id', currentUser.id)
                .single();

            if (error) {
                console.error('Error fetching user profile:', error);
                return;
            }

            setCurrentUserProfile(data);
        };

        fetchUserProfile();
    }, [currentUser]);

    const fetchComments = async () => {
        console.log('Fetching comments for profile:', profileId);
        const { data, error } = await supabase
            .from('comments')
            .select('*')
            .eq('profile_minecraft_username', profileId)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching comments:', error);
            return;
        }

        setComments(data || []);
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim() || !currentUser || !currentUserProfile) return;

        try {
            const { data, error } = await supabase
                .from('comments')
                .insert({
                    content: newComment,
                    user_id: currentUser.id,
                    minecraft_username: currentUserProfile.minecraft_username,
                    profile_minecraft_username: profileId
                })
                .select()
                .single();

            if (error) throw error;

            if (data) {
                setComments(prev => [data, ...prev]);
            }

            setNewComment('');
            toast({
                title: "Éxito",
                description: "Comentario publicado correctamente"
            });
        } catch (err: any) {
            console.error('Error details:', err.message);
            toast({
                variant: "destructive",
                title: "Error",
                description: err?.message || 'No se pudo publicar el comentario'
            });
        }
    };
    const handleDeleteComment = async (commentId: string, userId: string) => {
        if (currentUser?.id !== userId) return;

        try {
            const { error } = await supabase
                .from('comments')
                .delete()
                .eq('id', commentId)
                .eq('user_id', userId);

            if (error) throw error;

            // Only update local state if delete was successful
            setComments(prev => prev.filter(comment => comment.id !== commentId));

            toast({
                title: "Éxito",
                description: "Comentario eliminado correctamente"
            });
        } catch (error: any) {
            console.error('Error deleting comment:', error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "No se pudo eliminar el comentario"
            });
            // Log the full error for debugging
            console.log('Full error:', error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="space-y-5">
                {currentUser ? (
                    <div className="flex gap-4">
                        <Avatar className="h-10 w-10">
                            <AvatarImage
                                src={`https://mc-heads.net/avatar/${currentUserProfile?.minecraft_username}/64`}
                                alt={currentUserProfile?.minecraft_username || 'User'}
                            />
                            <AvatarFallback>{currentUserProfile?.minecraft_username?.[0] || 'U'}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <Textarea
                                placeholder="Escribe un comentario..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                className="min-h-[100px] resize-none bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 focus:ring-2 focus:ring-neutral-200 dark:focus:ring-neutral-700 rounded-xl transition-all"
                            />
                            <Button
                                onClick={handleSubmitComment}
                                className="rounded-xl"
                            >
                                Comentar
                            </Button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-neutral-600 dark:text-neutral-400">
                        Debes iniciar sesión para comentar
                    </p>
                )}
                <div className="space-y-4 mt-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage
                                    src={`https://mc-heads.net/avatar/${comment.minecraft_username}/64`}
                                    alt={comment.minecraft_username}
                                />
                                <AvatarFallback>{comment.minecraft_username[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between gap-2">
                                    <div className='flex flex-col'>
                                        <div className="flex items-center gap-2">
                                            <h4 className="font-semibold">{comment.minecraft_username}</h4>
                                            <time className="text-sm text-neutral-500">
                                                {new Date(comment.created_at).toLocaleDateString()} {new Date(comment.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </time>
                                        </div>
                                        <div className="mt-1 text-neutral-700 dark:text-neutral-300">
                                            {comment.content}
                                        </div></div>
                                    {currentUser?.id === comment.user_id && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDeleteComment(comment.id, comment.user_id)}
                                            className="h-8 w-8 text-neutral-500 hover:text-red-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}