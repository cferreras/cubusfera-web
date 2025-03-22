import env from 'dotenv';
env.config();

import { NextResponse } from 'next/server';

export async function GET() {
    try {
        if (!process.env.MINECRAFT_SERVER_STATS_ADRESS) {
            return NextResponse.json({ error: 'Server stats address not configured' }, { status: 500 });
        }

        const statsUrl = new URL(`${process.env.MINECRAFT_SERVER_STATS_ADRESS}/api/stats/global`);
        const response = await fetch(statsUrl.toString());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Stats fetch error:', error);
        return NextResponse.json({ error: 'Failed to fetch server stats' }, { status: 500 });
    }
}