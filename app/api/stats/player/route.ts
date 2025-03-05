import env from 'dotenv';
env.config();

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ error: 'Player name is required' }, { status: 400 });
  }

  try {
    const response = await fetch(`http://${process.env.MINECRAFT_SERVER_STATS_ADRESS}/api/stats/player?name=${name}`);

    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return NextResponse.json({ error: 'Failed to fetch player statistics' }, { status: 500 });
  }
}