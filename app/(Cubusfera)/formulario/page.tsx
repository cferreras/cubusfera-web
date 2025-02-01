"use client";

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import Container from '@/components/Container';
import Title from '@/components/Title';
import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { logout } from '@/app/actions';
import dotenv from "dotenv";
import { Progress } from '@/components/ui/progress';
dotenv.config();

type Question = {
    title: string;
    subtitle: string;
    type: 'text' | 'radio' | 'textarea' | 'slider' | 'checkbox';
    options?: string[];
    min?: number;
    max?: number;
    checkboxes?: string[];
};

const supabase = createClient();


const getDiscordUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
        return session.user.user_metadata.full_name;
    } else {
        throw new Error("No hay una sesión activa");
    }
};

export default function Formulario() {
    const [allreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | number | boolean | boolean[] | null)[]>(Array(11).fill(null));
    const [error, setError] = useState<string>('');
    const router = useRouter();
    const supabase = createClient();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const getAccessToken = async () => {
        const { data: { session } } = await supabase.auth.getSession(); // Obtiene la sesión actual

        if (session) {
            console.log(session.access_token)
            return session.access_token; // Retorna el token de acceso
        } else {
            throw new Error("No hay una sesión activa"); // Manejo de errores si no hay sesión
        }
    };

    useEffect(() => {
        getDiscordUser()
            .then((user) => {
                const newAnswers = [...answers];
                newAnswers[0] = user;
                setAnswers(newAnswers);
            })
            .catch((error) => {
                console.error("Error al obtener el usuario de Discord:", error);
            });
    }, []);

    const questions: Question[] = [
        {
            title: "Usuario de Discord",
            subtitle: "Asegúrate de enviar el usuario y no el nombre.",
            type: 'text'
        },
        {
            title: "Nombre",
            subtitle: "Como quieres que nos refiramos a ti.",
            type: 'text'
        },
        {
            title: "Nombre en Minecraft",
            subtitle: "",
            type: 'text'
        },
        {
            title: "¿Utilizas Minecraft en versión Premium?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No']
        },
        {
            title: "¿Dispones de micrófono?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No']
        },
        {
            title: "¿Te sientes cómodo/a usando micrófono para comunicarte con otros miembros mientras juegas?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'Otro:']
        },
        {
            title: "¿Has experimentado problemas de conexión recientemente como retrasos, ping alto, desconexiones u otras dificultades con tu red?",
            subtitle: "",
            type: 'radio',
            options: ['Sí', 'No', 'Otro:']
        },
        {
            title: "¿Sabes jugar a Minecraft?",
            subtitle: "Selecciona tu nivel de experiencia.",
            type: 'slider',
            min: 1,
            max: 5
        },
        {
            title: "Cuéntanos tus motivaciones para unirte al servidor y comparte tus ideas o proyectos específicos que te gustaría desarrollar aquí.",
            subtitle: "Buscamos respuestas detalladas que muestren tu verdadero interés y objetivos, no solo respuestas simples o genéricas.",
            type: 'textarea'
        },
        {
            title: "Términos y condiciones",
            subtitle: "Por favor, acepta todos los términos para continuar.",
            type: 'checkbox',
            checkboxes: [
                "He ingresado en la comunidad de Discord del servidor",
                "Respetaré las normas del servidor",
                "Voy a jugar un mínimo de 3 horas semanales",
                "Avisaré de mis ausencias cuando no pueda jugar"
            ]
        }
    ];

    useEffect(() => {
        if (questions[currentQuestion].type === 'text' && inputRef.current) {
            inputRef.current.focus();
        } else if (questions[currentQuestion].type === 'textarea' && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [currentQuestion]);

    const handleNext = async (): Promise<void> => {
        const token = await getAccessToken();
        if (answers[currentQuestion] === null || answers[currentQuestion] === '') {
            setError('Por favor, responde esta pregunta antes de continuar.');
            return;
        }

        // Si la pregunta actual es la del nombre de usuario (índice 0), envía la respuesta a la API
        if (currentQuestion === 1) {
            try {
                const response = await fetch(`${process.env.SPRING_API}/form/username`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'text/plain',
                    },
                    body: answers[currentQuestion]?.toString(),
                });

                if (!response.ok) {
                    throw new Error('Error al enviar el nombre de usuario a la API');
                }

                console.log('Nombre de usuario enviado correctamente');
            } catch (error) {
                console.error('Error al enviar el nombre de usuario:', error);
                setError('Error al enviar el nombre de usuario. Por favor, inténtalo de nuevo.');
                return;
            }
        }

        setError('');
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = (): void => {
        setError('');
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerChange = (value: string | number | boolean | boolean[]): void => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);
        setError('');
    };

    const areAllChecked = (values: boolean[]): boolean => {
        return values.every(value => value === true);
    };

    return (
        <div>
            <Title title="Formulario" subtitle="Forma parte de Cubusfera" />
            <Container className='max-w-xl border rounded-lg py-8 px-2'>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold">{questions[currentQuestion].title}</Label>
                        <p className="text-sm text-gray-500">{questions[currentQuestion].subtitle}</p>
                    </div>

                    {questions[currentQuestion].type === 'text' ? (
                        <div className="space-y-2">
                            <Input
                                ref={inputRef}
                                type="text"
                                value={answers[currentQuestion]?.toString() || ''}
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                placeholder="Escribe tu respuesta aquí"
                                autoFocus
                                disabled={currentQuestion === 0}
                            />
                            {currentQuestion === 0 && (
                                <div className='flex items-center text-sm text-gray-500'>
                                    <span>¿El Discord no es correcto?</span>
                                    <form action={logout}>
                                        <Button
                                            type="submit"
                                            variant="link"
                                            className="text-sm text-gray-500 hover:text-gray-700 pl-2"
                                        >
                                            Cerrar sesión
                                        </Button>
                                    </form>
                                </div>
                            )}
                        </div>
                    ) : questions[currentQuestion].type === 'radio' ? (
                        <RadioGroup
                            value={answers[currentQuestion]?.toString() || ''}
                            onValueChange={handleAnswerChange}
                        >
                            {questions[currentQuestion].options?.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    ) : questions[currentQuestion].type === 'textarea' ? (
                        <Textarea
                            ref={textareaRef}
                            value={answers[currentQuestion]?.toString() || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Escribe tu respuesta aquí"
                            autoFocus
                        />
                    ) : questions[currentQuestion].type === 'checkbox' ? (
                        <div className="space-y-4">
                            {questions[currentQuestion].checkboxes?.map((text, index) => {
                                const currentAnswers = (answers[currentQuestion] as boolean[]) || Array(questions[currentQuestion].checkboxes?.length || 0).fill(false);
                                return (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`terms-${index}`}
                                            checked={currentAnswers[index] || false}
                                            onCheckedChange={(checked) => {
                                                const newCheckboxValues = [...(currentAnswers || [])];
                                                newCheckboxValues[index] = checked as boolean;
                                                handleAnswerChange(newCheckboxValues);
                                            }}
                                        />
                                        <Label htmlFor={`terms-${index}`} className="text-sm">
                                            {text}
                                        </Label>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-sm text-gray-500">Novato</span>
                                <span className="text-sm text-gray-500">Experto</span>
                            </div>
                            <Slider
                                value={[answers[currentQuestion] as number || 1]}
                                min={questions[currentQuestion].min || 1}
                                max={questions[currentQuestion].max || 5}
                                step={1}
                                onValueChange={(value) => handleAnswerChange(value[0])}
                            />
                            <p className="text-sm text-gray-500 text-center">
                                Valor seleccionado: {answers[currentQuestion] || 1}
                            </p>
                        </div>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="flex justify-between items-center gap-x-4">
                        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
                            Anterior
                        </Button>
            <Progress value={currentQuestion / (questions.length - 1) * 100}></Progress>

                        <Button
                            onClick={handleNext}
                            disabled={
                                currentQuestion === questions.length - 1 || 
                                answers[currentQuestion] === null || 
                                answers[currentQuestion] === '' ||
                                (questions[currentQuestion].type === 'checkbox' && 
                                !areAllChecked(answers[currentQuestion] as boolean[]))
                            }
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}