import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        // Debug all headers
        const headers = Object.fromEntries(request.headers.entries());
        console.log('All received headers:', headers);
        
        const authHeader = request.headers.get('authorization');
        console.log('Auth header specifically:', authHeader);
        
        if (!authHeader) {
            console.log('CRON_SECRET value:', process.env.CRON_SECRET);
            return NextResponse.json({ error: 'No authorization header' }, { status: 401 });
        }

        if (authHeader.trim() !== `Bearer ${process.env.CRON_SECRET}`.trim()) {
            return NextResponse.json({ error: 'Invalid authorization token' }, { status: 401 });
        }

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            {
                cookies: {
                    getAll: () => [],
                    setAll: () => {},
                }
            }
        );

        // Get all active players
        const { data: profiles } = await supabase
            .from('profiles')
            .select('id, minecraft_username')
            .not('minecraft_username', 'is', null);

        if (!profiles) return NextResponse.json({ error: 'No profiles found' });

        // Get current date and set to first day of current month
        const currentMonth = new Date();
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth(); // 0-11
        
        // Create month string for current month
        const monthString = `${year}-${String(month + 1).padStart(2, '0')}`;
        console.log('Attempting to delete records for month:', monthString);

        // Check existing records first
        const { data: existingRecords } = await supabase
            .from('monthly_achievements')
            .select('id')
            .eq('month_year', monthString);
            
        console.log('Existing records:', existingRecords?.length || 0);

        // Delete only records for the current month
        const { error: deleteError } = await supabase
            .from('monthly_achievements')
            .delete()
            .eq('month_year', monthString);

        console.log('Delete result:', { error: deleteError });

        if (deleteError) {
            console.error('Error deleting records:', deleteError);
            return NextResponse.json({ error: 'Error deleting existing records' }, { status: 500 });
        }

        // Get players stats and process them
        const playersStats = await Promise.all(profiles.map(async (profile) => {
            try {
                const statsResponse = await fetch(
                    `${process.env.MINECRAFT_SERVER_STATS_ADRESS}/api/stats/player?name=${profile.minecraft_username}`
                );
                const stats = await statsResponse.json();
                
                const playTimeMatch = stats.monthlyStats?.playTime?.match(/(\d+)\s*d\s*(\d+)\s*h/);
                const playTimeHours = playTimeMatch ? 
                    (parseInt(playTimeMatch[1]) * 24) + parseInt(playTimeMatch[2]) : 0;

                return {
                    profile_id: profile.id,
                    minecraft_username: profile.minecraft_username,
                    blocks_mined: stats.monthlyStats?.blocksMined || 0,
                    playtime_hours: playTimeHours,
                    mobs_killed: stats.monthlyStats?.mobsKilled || 0,
                    deaths: stats.monthlyStats?.deaths || 0,
                    experience_level: stats.experienceGained || 0,
                    distance_traveled: parseInt(stats.monthlyStats?.distanceTraveled) || 0
                };
            } catch (error) {
                console.error('Error fetching stats for player:', profile.minecraft_username, error);
                return {
                    profile_id: profile.id,
                    minecraft_username: profile.minecraft_username,
                    blocks_mined: 0,
                    playtime_hours: 0,
                    mobs_killed: 0,
                    deaths: 0,
                    experience_level: 0,
                    distance_traveled: 0
                };
            }
        }));

        const categories = {
            'Tiempo de Juego': 'playtime_hours',
            'Bloques Minados': 'blocks_mined',
            'Mobs Eliminados': 'mobs_killed',
            'Muertes': 'deaths',
            'Nivel de Experiencia': 'experience_level',
            'Distancia Recorrida': 'distance_traveled'
        };

        for (const [category, field] of Object.entries(categories)) {
            const rankings = [...playersStats]
                .sort((a, b) => {
                    const valueA = a[field as keyof typeof a];
                    const valueB = b[field as keyof typeof b];
                    return Number(valueB) - Number(valueA);
                })
                .map((player, index) => ({
                    profile_id: player.profile_id,
                    category,
                    value: player[field as keyof typeof player],
                    month_year: monthString,
                    rank: index + 1
                }));

            await supabase.from('monthly_achievements').insert(rankings);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Monthly achievements job failed:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}