"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { logout } from '@/app/actions';
import { Progress } from '@/components/ui/progress';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { createClient } from '@/utils/supabase/client';

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

export default function Form(props: {questions: Question[], apiUrl: string}) {
    const [allreadySubmitted, setAlreadySubmitted] = useState<boolean>(false);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | number | boolean | boolean[] | null)[]>(Array(11).fill(null));
    const [error, setError] = useState<string>('');
    const supabase = createClient();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    
    const getAccessToken = async () => {
        const { data: { session } } = await supabase.auth.getSession(); // Obtiene la sesión actual

        if (session) {
            return session.access_token; // Retorna el token de acceso
        } else {
            throw new Error("No hay una sesión activa"); // Manejo de errores si no hay sesión
        }
    };

    const getDiscordUser = async () => {
        const { data: { session } } = await supabase.auth.getSession();
    
        if (session) {
            return session.user.user_metadata.full_name;
        } else {
            throw new Error("No hay una sesión activa");
        }
    };

    interface SendToAPIParams {
        data: string | number | boolean | boolean[] | null;
        token: string;
        name: string;
    }
    
    const sendToAPI = async ({ data, token, name }: SendToAPIParams): Promise<{ [key: string]: any }> => {
        try {
            const response = await fetch(`${props.apiUrl}/sec/form/update`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ [name]: data }),
            });
    
            if (!response.ok) {
                throw new Error(JSON.parse(await response.text()).error);
            }
    
            console.log('Datos enviados correctamente');
            return response.json();
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            throw error; // Re-lanza el error para manejarlo fuera de la función
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

   

    useEffect(() => {
        if (props.questions[currentQuestion].type === 'text' && inputRef.current) {
            inputRef.current.focus();
        } else if (props.questions[currentQuestion].type === 'textarea' && textareaRef.current) {
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

            try {
                await sendToAPI({ data: answers[currentQuestion],name: props.questions[currentQuestion].apiRef, token: token });
            } catch (error) {
                setError("Error al enviar" + props.questions[currentQuestion].title.toLowerCase() + ": " + (error instanceof Error ? error.message : String(error)));
                return;
            }
        

        setError('');
        if (currentQuestion < props.questions.length - 1) {
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


    return (<>
        <div className="space-y-4">
            <div className="space-y-2">
                <Label className="text-lg font-semibold">{props.questions[currentQuestion].title}</Label>
                <p className="text-sm text-gray-500">{props.questions[currentQuestion].subtitle}</p>
            </div>

            {props.questions[currentQuestion].type === 'text' ? (
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
            ) : props.questions[currentQuestion].type === 'radio' ? (
                <RadioGroup
                    value={answers[currentQuestion]?.toString() || ''}
                    onValueChange={handleAnswerChange}
                >
                    {props.questions[currentQuestion].options?.map((option, index) => (
                        <div key={index} className="flex items-center space-x-2">
                            <RadioGroupItem value={option} id={`option-${index}`} />
                            <Label htmlFor={`option-${index}`}>{option}</Label>
                        </div>
                    ))}
                </RadioGroup>
            ) : props.questions[currentQuestion].type === 'textarea' ? (
                <Textarea
                    ref={textareaRef}
                    value={answers[currentQuestion]?.toString() || ''}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Escribe tu respuesta aquí"
                    autoFocus
                />
            ) : props.questions[currentQuestion].type === 'checkbox' ? (
                <div className="space-y-4">
                    {props.questions[currentQuestion].checkboxes?.map((text, index) => {
                        const currentAnswers = (answers[currentQuestion] as boolean[]) || Array(props.questions[currentQuestion].checkboxes?.length || 0).fill(false);
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
                        min={props.questions[currentQuestion].min || 1}
                        max={props.questions[currentQuestion].max || 5}
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
                <Progress value={currentQuestion / (props.questions.length - 1) * 100}></Progress>

                <Button
                    onClick={handleNext}
                    disabled={
                        currentQuestion === props.questions.length - 1 ||
                        answers[currentQuestion] === null ||
                        answers[currentQuestion] === '' ||
                        (props.questions[currentQuestion].type === 'checkbox' &&
                            !areAllChecked(answers[currentQuestion] as boolean[]))
                    }
                >
                    Siguiente
                </Button>
            </div>
        </div>
    </>)
}