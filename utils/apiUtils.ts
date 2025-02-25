import dotenv from "dotenv";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
dotenv.config(); // Carga las variables de entorno desde el archivo .env

interface SendToAPIParams {
    data: string | number | boolean | boolean[] | null;
    token: string;
    name: string;
    apiUrl: string;
}

interface SendToAPIParams {
    data: string | number | boolean | boolean[] | null;
    token: string;
    name: string;
    apiUrl: string;
}

interface UpsertResponse {
    error: {
        message: string;
    } | null;
}

export const sendToAPI = async (name: string, value: string | number | boolean | boolean[], userId: string): Promise<void> => {
    
    if (name === '') {
        return;
    }
    
    const supabase: SupabaseClient = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.NEXT_SUPABASE_ANON_KEY as string);
    
    
    const { error }: UpsertResponse = await supabase
        .from('forms')
        .upsert({  [name]: value, revision_date: new Date().toISOString() });

    if (error) {
        console.error('Error al enviar respuesta:', error);
        setError(`Error al enviar ${name}: ${error.message}`);
    }
};
function setError(message: string): void {
    // Log the error message to the console
    console.error(message);

    // Optionally, you can implement additional error handling logic here
    // For example, you could display the error message to the user using a UI component
    // or send the error message to an error tracking service
}


