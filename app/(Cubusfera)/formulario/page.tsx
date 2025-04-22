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
        checkboxes?: string[];
        apiRef: string;
        requireAll?: boolean; // Nueva propiedad para indicar si todas las checkboxes son requeridas
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
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'premium_minecraft'
        },
        {
            title: "¿Dispones de micrófono?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'mic_available'
        },
        {
            title: "¿Te sientes cómodo/a usando micrófono para comunicarte con otros miembros mientras juegas?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'uses_mic'
        },
        {
            title: "¿Has experimentado problemas de conexión recientemente?",
            subtitle: "Retrasos, ping alto, desconexiones u otras dificultades con tu red.",
            type: 'radio',
            options: ['Sí', 'No'],
            apiRef: 'connectivity_issues'
        },
        {
            title: "¿Sabes jugar a Minecraft?",
            subtitle: "Selecciona tu nivel de experiencia.",
            type: 'slider',
            min: 1,
            max: 5,
            apiRef: 'minecraft_knowledge'
        },
        // Nuevas preguntas sobre Minecraft y Minecraft técnico
        {
            title: "Conocimientos de Minecraft",
            subtitle: "Selecciona todas las opciones que conozcas y hayas utilizado:",
            type: 'checkbox',
            checkboxes: [
                "Redstone básica (puertas lógicas, circuitos simples)",
                "Redstone avanzada (sistemas de memoria, contadores)",
                "Granjas automáticas",
                "Sistemas de clasificación de items",
                "Comandos y funciones",
                "Datapacks",
            ],
            apiRef: 'minecraft_skills',
            requireAll: false // No requiere que todas estén marcadas
        },
        {
            title: "¿Qué tipo de granjas has construido?",
            subtitle: "Selecciona todas las que apliquen:",
            type: 'checkbox',
            checkboxes: [
                "Granjas de mobs hostiles",
                "Granjas de hierro",
                "Granjas de XP",
                "Granjas de cultivos",
                "Granjas de recursos del Nether/End",
                "Granjas técnicas complejas (TNT duping, etc.)",
            ],
            apiRef: 'farm_experience',
            requireAll: false // No requiere que todas estén marcadas
        },
        {
            title: "Los aldeanos necesitan acceso a sus estaciones de trabajo para reabastecerse",
            subtitle: "Pregunta técnica de Minecraft (1/2)",
            type: 'radio',
            options: ['Verdadero', 'Falso'],
            apiRef: 'technical_question_1'
        },
        {
            title: "Un pistón puede empujar hasta 12 bloques",
            subtitle: "Pregunta técnica de Minecraft (2/4)",
            type: 'radio',
            options: ['Verdadero', 'Falso'],
            apiRef: 'technical_question_2'
        },
        {
            title: "¿Qué es el 'update suppression' en Minecraft?",
            subtitle: "Pregunta técnica de Minecraft (3/4)",
            type: 'textarea',
            apiRef: 'update_suppression_knowledge'
        },
        {
            title: "Explica brevemente cómo funciona una granja de hierro",
            subtitle: "Pregunta técnica de Minecraft (4/4)",
            type: 'textarea',
            apiRef: 'iron_farm_knowledge'
        },
        {
            title: "Cuéntanos tus motivaciones para unirte al servidor y comparte tus ideas o proyectos específicos que te gustaría desarrollar aquí.",
            subtitle: "Buscamos respuestas detalladas que muestren tu verdadero interés y objetivos, no solo respuestas simples o genéricas.",
            type: 'textarea',
            apiRef: 'killer_question'
        },
        {
            title: "Términos y condiciones",
            subtitle: "Por favor, acepta todos los términos para continuar.",
            type: 'checkbox',
            checkboxes: [
                "He ingresado en la comunidad de Discord del servidor",
                "Respetaré las normas del servidor",
                "Voy a jugar un mínimo de 3 horas semanales",
                "Avisaré de mis ausencias cuando no pueda jugar",
            ],
            apiRef: 'already_submitted',
            requireAll: true // Requiere que todas estén marcadas
        }
    ];
    return (
        <Container className='py-20'>
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg">Formulario</h1>
                <p className="text-base text-muted-foreground">
                    Formulario de inscripción al servidor de Minecraft.
                </p>
            </div>
            <Form questions={questions} />
        </Container>
    );
}