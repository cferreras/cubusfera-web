"use client"; // Marca este componente como un Client Component

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'; // Componentes de shadcn para radio buttons
import Container from '@/components/Container';
import Title from '@/components/Title';

// Definimos el tipo para cada pregunta
type Question = {
    title: string;
    subtitle: string;
    type: 'text' | 'radio'; // Tipo de pregunta: texto o radio buttons
    options?: string[]; // Opciones para preguntas de tipo radio
};

export default function Formulario() {
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [answers, setAnswers] = useState<(string | null)[]>(Array(10).fill(null));
    const [error, setError] = useState<string>(''); // Estado para manejar el mensaje de error

    // Array de preguntas con título, subtítulo y tipo
    const questions: Question[] = [
        {
            title: "¿Cuál es tu nombre completo?",
            subtitle: "Por favor, ingresa tu nombre y apellidos.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu correo electrónico?",
            subtitle: "Asegúrate de ingresar un correo válido.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu fecha de nacimiento?",
            subtitle: "Formato: DD/MM/AAAA.",
            type: 'text'
        },
        {
            title: "¿Tienes experiencia laboral previa?",
            subtitle: "Selecciona una opción.",
            type: 'radio',
            options: ['Sí', 'No'] // Opciones para la pregunta de radio buttons
        },
        {
            title: "¿Cuál es tu número de teléfono?",
            subtitle: "Ingresa tu número con el código de país.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu profesión?",
            subtitle: "Describe tu ocupación actual.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu nivel de educación?",
            subtitle: "Ejemplo: Secundaria, Universitario, Posgrado, etc.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu estado civil?",
            subtitle: "Ejemplo: Soltero, Casado, Divorciado, etc.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu género?",
            subtitle: "Ejemplo: Masculino, Femenino, No binario, etc.",
            type: 'text'
        },
        {
            title: "¿Cuál es tu nacionalidad?",
            subtitle: "Ingresa tu país de origen.",
            type: 'text'
        }
    ];

    const handleNext = (): void => {
        if (answers[currentQuestion] === null || answers[currentQuestion]?.trim() === '') {
            setError('Por favor, responde esta pregunta antes de continuar.'); // Mostrar error si está vacío
            return;
        }
        setError(''); // Limpiar el mensaje de error si la respuesta es válida
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handlePrevious = (): void => {
        setError(''); // Limpiar el mensaje de error al retroceder
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    const handleAnswerChange = (value: string): void => {
        const newAnswers = [...answers];
        newAnswers[currentQuestion] = value;
        setAnswers(newAnswers);
        setError(''); // Limpiar el mensaje de error al cambiar la respuesta
    };

    return (
        <div>
            <Title title="Formulario" subtitle="Forma parte de Cubusfera" />
            <Container>
                <div className="space-y-4">
                    {/* Mostrar el título y subtítulo de la pregunta actual */}
                    <div className="space-y-2">
                        <Label className="text-lg font-semibold">{questions[currentQuestion].title}</Label>
                        <p className="text-sm text-gray-500">{questions[currentQuestion].subtitle}</p>
                    </div>

                    {/* Renderizar el campo de entrada según el tipo de pregunta */}
                    {questions[currentQuestion].type === 'text' ? (
                        <Input
                            type="text"
                            value={answers[currentQuestion] || ''}
                            onChange={(e) => handleAnswerChange(e.target.value)}
                            placeholder="Escribe tu respuesta aquí"
                        />
                    ) : (
                        <RadioGroup
                            value={answers[currentQuestion] || ''}
                            onValueChange={handleAnswerChange}
                        >
                            {questions[currentQuestion].options?.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <RadioGroupItem value={option} id={`option-${index}`} />
                                    <Label htmlFor={`option-${index}`}>{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    )}

                    {error && <p className="text-red-500 text-sm">{error}</p>} {/* Mostrar mensaje de error */}
                    <div className="flex justify-between">
                        <Button onClick={handlePrevious} disabled={currentQuestion === 0}>
                            Anterior
                        </Button>
                        <Button
                            onClick={handleNext}
                            disabled={currentQuestion === questions.length - 1 || answers[currentQuestion] === null || answers[currentQuestion]?.trim() === ''}
                        >
                            Siguiente
                        </Button>
                    </div>
                </div>
            </Container>
        </div>
    );
}