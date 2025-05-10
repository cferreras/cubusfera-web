import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(request: Request) {
    try {
        // Debug all headers
        const headers = Object.fromEntries(request.headers.entries());
        
        const authHeader = request.headers.get('authorization');
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Token de autorización no proporcionado' }, { status: 401 });
        }

        const token = authHeader.replace('Bearer ', '');
        // Verificar que el token sea válido
        if (token !== process.env.SERVICE_TOKEN) {
            console.log('SERVICE_TOKEN value:', process.env.SERVICE_TOKEN);
            return NextResponse.json({ error: 'Token de autorización inválido' }, { status: 401 });
        }

        // Inicializar el cliente de Supabase con la clave de service role
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

        // Obtener datos del cuerpo de la solicitud
        const { minecraft_username, is_vip } = await request.json();
        console.log('Request body:', { minecraft_username, is_vip });

        // Validar los datos recibidos
        if (!minecraft_username) {
            return NextResponse.json({ error: 'Se requiere minecraft_username' }, { status: 400 });
        }

        if (typeof is_vip !== 'boolean') {
            return NextResponse.json({ error: 'is_vip debe ser un valor booleano' }, { status: 400 });
        }

        // Primero buscar el usuario por su minecraft_username
        const { data: userData, error: userError } = await supabase
            .from('profiles')
            .select('id')
            .eq('minecraft_username', minecraft_username)
            .single();

        if (userError) {
            console.error('Error finding user by minecraft_username:', userError);
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        if (!userData) {
            return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 });
        }

        // Actualizar el estado VIP del usuario
        const { error } = await supabase
            .from('profiles')
            .update({ is_vip: is_vip })
            .eq('id', userData.id)
            .select();

        if (error) {
            console.error('Error updating VIP status:', error);
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        console.log('VIP status updated successfully:');

        // Responder con los datos actualizados
        return NextResponse.json({
            message: `Estado VIP ${is_vip ? 'activado' : 'desactivado'} correctamente para ${minecraft_username}`,
        });
    } catch (error) {
        console.error('Error al actualizar estado VIP:', error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
}