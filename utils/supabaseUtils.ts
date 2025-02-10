import { createClient } from '@/utils/supabase/client';

export const getAccessToken = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        return session.access_token;
    } else {
        throw new Error("No hay una sesión activa");
    }
};

export const getUserID = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        return session.user.id;
    } else {
        throw new Error("No hay una sesión activa");
    }
};

export const getDiscordUser = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
        return session.user.user_metadata.full_name;
    } else {
        throw new Error("No hay una sesión activa");
    }
};