import Container from '@/components/Container';
import Form from '@/components/Form';
import dotenv from "dotenv";

dotenv.config(); // Carga las variables de entorno desde el archivo .env

export default function Formulario() {

    type Question = {
        title: string;
        subtitle: string;
        type: 'text' | 'radio' | 'textarea' | 'slider' | 'checkbox';
        options?: string[];
        min?: number;
        max?: number;
        placeholder?: string;
        checkboxes?: string[];
        apiRef: string;
        requireAll?: boolean;
    };

    const questions: Question[] = [
        {
            title: "Usuario de Discord",
            subtitle: "Asegúrate de enviar el usuario y no el nombre.",
            type: 'text',
            apiRef: ''
        },
        {
            title: "Nombre",
            subtitle: "Como quieres que nos refiramos a ti.",
            type: 'text',
            apiRef: 'name'
        },
        {
            title: "Nombre en Minecraft",
            subtitle: "Exactamente como lo ves en el juego con mayúsculas y minúsculas.",
            type: 'text',
            apiRef: 'minecraft_username'
        },
        {
            title: "¿Utilizas Minecraft en versión Premium?",
            subtitle: "Requerido para acceder al servidor.",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'premium_minecraft'
        },
        {
            title: "¿Dispones de micrófono y te sientes cómodo/a usándolo para comunicarte?",
            subtitle: "Importante para coordinar proyectos técnicos complejos.",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'uses_mic'
        },
        {
            title: "¿Has experimentado problemas de conexión recientemente?",
            subtitle: "Los proyectos técnicos requieren estabilidad de conexión.",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'connectivity_issues'
        },
        {
            title: "¿Qué tipo de jugador eres?",
            subtitle: "Describe tu estilo de juego y especialidades:",
            type: 'text',
            placeholder: "Ej: Me especializo en redstone, construcción técnica, granjas automáticas...",
            apiRef: 'player_type',
        },
        {
            title: "¿Cuál es el límite de bloques que puede empujar un pistón?",
            subtitle: "Pregunta técnica (1/4)",
            type: 'radio',
            options: ['10 bloques', '12 bloques', '15 bloques', '16 bloques'],
            apiRef: 'technical_question_1'
        },
        {
            title: "¿Qué causa que los golems de hierro dejen de spawnear en una granja?",
            subtitle: "Pregunta técnica (2/4)",
            type: 'textarea',
            apiRef: 'iron_golem_mechanics'
        },
        {
            title: "Explica qué es el 'update suppression' y menciona un uso práctico",
            subtitle: "Pregunta técnica (3/4)",
            type: 'textarea',
            apiRef: 'update_suppression_knowledge'
        },
        {
            title: "¿Cómo optimizarías una granja que está causando lag en el servidor?",
            subtitle: "Pregunta técnica (4/4) - Menciona al menos 3 estrategias específicas",
            type: 'textarea',
            apiRef: 'lag_optimization'
        },
        {
            title: "Proyecto técnico que te gustaría desarrollar",
            subtitle: "Describe un proyecto técnico específico que planeas construir. Incluye detalles sobre mecánicas, escala y propósito.",
            type: 'textarea',
            apiRef: 'technical_project_plan'
        },
        {
            title: "Términos y condiciones",
            subtitle: "Por favor, acepta todos los términos para continuar.",
            type: 'checkbox',
            checkboxes: [
                "He ingresado en la comunidad de Discord del servidor",
                "Respetaré las normas del servidor y las áreas técnicas",
                "Compartiré conocimientos técnicos con otros miembros",
                "Avisaré de mis ausencias cuando no pueda jugar"
            ],
            apiRef: 'already_submitted',
            requireAll: true
        }
    ];

    return (
        <Container className='py-20'>
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg">Formulario de Ingreso</h1>
                <p className="text-base text-muted-foreground">
                    Formulario especializado para jugadores técnicos de Minecraft. Evaluamos conocimientos en redstone, granjas automáticas y mecánicas avanzadas.
                </p>
            </div>
            <Form questions={questions} />
        </Container>
    );
}