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

    // Get the response as text first
    const responseText = await response.text();
    
    // Try to parse the JSON safely
    let data;
    try {
      // Fix common JSON issues - replace single quotes with double quotes and fix unquoted property names
      const fixedText = responseText
        .replace(/'/g, '"')
        .replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3')
        // Fix trailing commas in objects
        .replace(/,\s*}/g, '}')
        .replace(/,\s*\]/g, ']');
      
      data = JSON.parse(fixedText);
    } catch (parseError: unknown) {
      if (parseError instanceof Error) {
        console.error('JSON parse error:', parseError);
        console.error('Raw response:', responseText);
        return NextResponse.json({ 
          error: 'Invalid JSON response from Minecraft server',
          details: parseError.message
        }, { status: 500 });
      }
      // Handle non-Error objects
      console.error('Unknown JSON parse error');
      console.error('Raw response:', responseText);
      return NextResponse.json({ 
        error: 'Invalid JSON response from Minecraft server',
        details: 'Unknown parsing error'
      }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching player stats:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}