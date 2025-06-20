import env from 'dotenv';
env.config();

import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Obtener estadísticas del servidor de Minecraft
        let minecraftStats = {};
        if (process.env.MINECRAFT_SERVER_STATS_ADRESS) {
            try {
                const statsUrl = new URL(`${process.env.MINECRAFT_SERVER_STATS_ADRESS}/api/stats/global`);
                const response = await fetch(statsUrl.toString());
                if (response.ok) {
                    minecraftStats = await response.json();
                }
            } catch (error) {
                console.error('Failed to fetch Minecraft stats:', error);
            }
        }

        // Obtener conteo de formularios de Supabase
        const supabase = await createClient();
        const { count: totalForms } = await supabase
            .from('forms')
            .select('*', { count: 'exact', head: true });

        // Combinar ambas estadísticas
        const combinedStats = {
            ...minecraftStats,
            totalForms: totalForms || 0
        };

        return NextResponse.json(combinedStats);
    } catch (error) {
        console.error('Stats fetch error:', error);
        return NextResponse.json({ 
            error: 'Failed to fetch server stats',
            totalForms: 0 // Valor por defecto en caso de error
        }, { status: 500 });
    }
}