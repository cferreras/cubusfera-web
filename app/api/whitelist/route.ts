/* eslint-disable @typescript-eslint/no-explicit-any */
import env from 'dotenv';
env.config();
interface RequestBody {
    minecraftUsername: string;
    discordUsername: string;
}

interface ErrorResponse {
    error: string;
}

interface SuccessResponse {
    success: boolean;
    data: any;
}

export async function POST(req: Request): Promise<Response> {
    try {
        // Extraer los datos del cuerpo de la solicitud
        const { minecraftUsername, discordUsername }: RequestBody = await req.json();

        if (!minecraftUsername) {
            const errorResponse: ErrorResponse = { error: 'Se requiere un nombre de usuario de Minecraft.' };
            return new Response(JSON.stringify(errorResponse), {
                status: 400,
            });
        }

        if (!discordUsername) {
            const errorResponse: ErrorResponse = { error: 'Se requiere un nombre de usuario de Discord.' };
            return new Response(JSON.stringify(errorResponse), {
                status: 400,
            });
        }

        // Realizar la solicitud POST al servidor Minecraft
        const response = await fetch(
            `${process.env.MINECRAFT_SERVER_WHITELIST_ADRESS}/whitelist`,
            {
                method: 'POST',
                headers: {
                    'X-Cubusfera-Auth': `${process.env.SERVICE_TOKEN}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    username: minecraftUsername,
                    discord: discordUsername
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al agregar al whitelist:', errorData);
            const errorResponse: ErrorResponse = { error: errorData.message || 'Error desconocido' };
            return new Response(JSON.stringify(errorResponse), { status: response.status });
        }

        const data = await response.text();
        const successResponse: SuccessResponse = { success: true, data };
        return new Response(JSON.stringify(successResponse), { status: 200 });
    } catch (error) {
        console.error('Error interno:', error);
        const errorResponse: ErrorResponse = { error: 'Error interno del servidor' };
        return new Response(JSON.stringify(errorResponse), { status: 500 });
    }
}