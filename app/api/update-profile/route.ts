import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { userId, minecraftUsername } = await request.json();
        
        if (!userId || !minecraftUsername) {
            return NextResponse.json({ error: 'User ID and Minecraft username are required' }, { status: 400 });
        }
        
        const supabase = await createClient();
        
        // Upsert the profile (create if not exists, update if exists)
        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: userId,
                minecraft_username: minecraftUsername,
                role: 'user'
            });
        
        if (error) {
            console.error('Error updating profile:', error);
            return NextResponse.json({ error: `Failed to update profile: ${error.message}` }, { status: 500 });
        }
        
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error in update-profile API:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}