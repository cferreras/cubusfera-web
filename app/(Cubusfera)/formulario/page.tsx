import Container from '@/components/Container';
import Form from '@/components/Form';
import dotenv from "dotenv";
dotenv.config(); // Carga las variables de entorno desde el archivo .env
export default function Formulario() {

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
            subtitle: "",
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
            title: "¿Has experimentado problemas de conexión recientemente como retrasos, ping alto, desconexiones u otras dificultades con tu red?",
            subtitle: "",
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
            apiRef: 'already_submitted'
        }
    ];
    type Question = {
        title: string;
        subtitle: string;
        type: 'text' | 'radio' | 'textarea' | 'slider' | 'checkbox';
        options?: string[];
        min?: number;
        max?: number;
        checkboxes?: string[];
        apiRef: string;
    };
    return (
        <Container className='py-20'>
            <div className="flex flex-col gap-1 mb-12">
                <h1 className="text-lg font-bold">Formulario</h1>
                <p className="text-base text-muted-foreground">
                    Formulario de inscripción al servidor de Minecraft.
                </p>
            </div>
            <Form questions={questions} />
        </Container>
    );
}