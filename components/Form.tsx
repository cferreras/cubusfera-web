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
import { getDiscordUser, getUserID } from '@/utils/supabaseUtils';
import { areAllChecked } from '@/utils/validationUtils';
import PostulationStatus from './PostulationStatus';
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

export default function Form(props: { questions: Question[], apiUrl: string }) {
    const [alreadySubmitted, setAlreadySubmitted] = useState<boolean | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(string | number | boolean | boolean[] | null)[]>(Array(11).fill(null));
    const [error, setError] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    // Obtener nombre de usuario de Discord
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

    // Hacer focus en el input
    useEffect(() => {
        if (props.questions[currentQuestion].type === 'text' && inputRef.current) {
            inputRef.current.focus();
        } else if (props.questions[currentQuestion].type === 'textarea' && textareaRef.current) {
            textareaRef.current?.focus();
        }
    }, [currentQuestion]);

    // Función para cargar la respuesta desde la API
    const fetchFieldData = async (fieldName: string) => {
        const supabase = createClient();
        const userId = await getUserID();

        if (fieldName === 'already_submitted') {
            return;
        }
        const { data, error } = await supabase
            .from('forms')
            .select(fieldName)
            .eq('id', userId);

        if (error) {
            console.error('Error al obtener el valor del campo:', error);
            return;
        }

        if (data && data.length > 0) {
            const fieldValue = data[0][fieldName as keyof typeof data[0]] as string | number | boolean | boolean[] | null;
            const newAnswers = [...answers];
            newAnswers[currentQuestion] = fieldValue;
            setAnswers(newAnswers);
        }
    };

    // Cargar la respuesta al cambiar de pregunta
    useEffect(() => {
        const fieldName = props.questions[currentQuestion]?.apiRef;

        if (fieldName) {
            fetchFieldData(fieldName); // Carga el valor del campo correspondiente
        }
    }, [currentQuestion]);


    // Verificar si el usuario ya ha respondido
    const isAlreadySubmitted = async () => {
        const supabase = createClient();
        const userId = await getUserID();
        const { data, error } = await supabase
            .from('forms')
            .select('already_submitted')
            .eq('id', userId);

        if (error) {
            console.error('Error al verificar si el usuario ya ha enviado el formulario:', error);
            return;
        }

        if (data && data.length > 0) {
            setAlreadySubmitted(data[0].already_submitted || false);
        } else {
            setAlreadySubmitted(false); // Si no hay datos, asumimos que no ha sido enviado
        }
    };

    useEffect(() => {
        isAlreadySubmitted();
    }, [currentQuestion])

    // Hacer focus en el input
    useEffect(() => {
        if (props.questions[currentQuestion].type === 'text' && inputRef.current) {
            inputRef.current.focus();
        } else if (props.questions[currentQuestion].type === 'textarea' && textareaRef.current) {
            textareaRef.current?.focus();
        }
    }, [currentQuestion]);

    const handleNext = async (): Promise<void> => {
        if (answers[currentQuestion] === null || answers[currentQuestion] === '') {
            setError('Por favor, responde esta pregunta antes de continuar.');
            return;
        }

        try {
            const name = props.questions[currentQuestion].apiRef;
            const value = props.questions[currentQuestion].apiRef === 'already_submitted' ? true : answers[currentQuestion];

            const supabase = createClient();

            if (name !== '') {
                
            
            const { error } = await supabase
                .from('forms')
                .upsert({ [name]: value, revision_date: new Date().toISOString() });

            

            if (error) {
                console.error('Error al enviar respuesta:', error);
                setError(`Error al enviar ${name}: ${error.message}`);
            }
        }


        } catch (error) {
            setError(`Error al enviar ${props.questions[currentQuestion].title.toLowerCase()}: ${String(error)}`);
            return;
        }

        setError('');
        if (currentQuestion < props.questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }

        if (currentQuestion === props.questions.length - 1) {
            setAlreadySubmitted(true);
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

    // Función para manejar la pulsación de Enter
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita el comportamiento predeterminado (envío de formulario)
            handleNext(); // Llama a handleNext cuando se presiona Enter
        }
    };

    return (
        <div className="space-y-6">
            {alreadySubmitted === null ? (
                // Skeleton cuando alreadySubmitted es null
                <div className="animate-pulse space-y-6 flex flex-col  p-6">
                    <div className="space-y-4">
                        <div className="h-6 w-2/4 bg-gray-200 rounded" />
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </div>
                    <div className="min-h-10 w-full bg-gray-200 rounded" />
                    <div className="min-h-4 w-3/4 bg-gray-200 rounded" />

                    <div className="flex justify-between items-center gap-x-4 pt-1.5">
                        <div className="h-10 w-36 bg-gray-200 rounded-lg" />
                        <div className="h-4 w-full bg-gray-200 rounded-full" />
                        <div className="h-10 w-36 bg-gray-200 rounded-lg" />
                    </div>
                </div>
            ) : !alreadySubmitted ? (
                // Contenido principal cuando alreadySubmitted es false
                <div className="space-y-6  p-6">
                    <div className="space-y-2">
                        <Label className="text-xl font-semibold">{props.questions[currentQuestion].title}</Label>
                        <p className="text-sm text-gray-500">{props.questions[currentQuestion].subtitle}</p>
                    </div>

                    {/* Renderizar el tipo de pregunta */}
                    {props.questions[currentQuestion].type === 'text' && (
                        <div className="space-y-2">
                            <Input
                                type="text"
                                value={answers[currentQuestion]?.toString() || ''}
                                onChange={(e) => handleAnswerChange(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Escribe tu respuesta aquí"
                                autoFocus
                                disabled={currentQuestion === 0}
                                className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                            />
                            {currentQuestion === 0 && (
                                <div className="flex items-center text-sm text-gray-500">
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
                    )}

                    {props.questions[currentQuestion].type === 'radio' && (
                        <RadioGroup
                            value={answers[currentQuestion]?.toString() || ''}
                            onValueChange={handleAnswerChange}
                            className="space-y-2"
                        >
                            {props.questions[currentQuestion].options?.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {props.questions[currentQuestion].type === 'textarea' && (
                        <Textarea
                            value={answers[currentQuestion]?.toString() || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Escribe tu respuesta aquí"
                            autoFocus
                            className="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-md"
                        />
                    )}

                    {props.questions[currentQuestion].type === 'checkbox' && (
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
                    )}

                    {props.questions[currentQuestion].type === 'slider' && (
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
                                className="w-full"
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
                                currentQuestion === props.questions.length ||
                                answers[currentQuestion] === null ||
                                answers[currentQuestion] === '' ||
                                (props.questions[currentQuestion].type === 'checkbox' &&
                                    !areAllChecked(answers[currentQuestion] as boolean[]))
                            }
                        >
                            {props.questions.length - 1 === currentQuestion ? 'Finalizar' : 'Siguiente'}
                        </Button>
                    </div>
                </div>
            ) : (
                // Contenido cuando alreadySubmitted es true
                <PostulationStatus status="pending"></PostulationStatus>
            )}
        </div>
    );
}