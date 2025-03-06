/* eslint-disable @typescript-eslint/no-explicit-any */
interface RequestBody {
    minecraftUsername: string;
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
        const { minecraftUsername }: RequestBody = await req.json();

        if (!minecraftUsername) {
            return new Response(JSON.stringify({ error: 'Se requiere un nombre de usuario de Minecraft.' } as ErrorResponse), {
                status: 400,
            });
        }

        // Realizar la solicitud POST al servidor Minecraft para remover del whitelist
        const response = await fetch(
            `http://${process.env.MINECRAFT_SERVER_WHITELIST_ADRESS}/unwhitelist`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${process.env.MINECRAFT_SERVER_WHITELIST_ADRESS}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: minecraftUsername }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error al remover del whitelist:', errorData);
            return new Response(
                JSON.stringify({ error: errorData.message || 'Error desconocido' } as ErrorResponse),
                { status: response.status }
            );
        }

        const data = await response.text();
        return new Response(JSON.stringify({ success: true, data } as SuccessResponse), { status: 200 });
    } catch (error) {
        console.error('Error interno:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor' } as ErrorResponse), { status: 500 });
    }
}