'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function AuthErrorPage() {
    const [params, setParams] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const result: { [key: string]: string } = {};
        hash.split('&').forEach(part => {
            const [key, value] = part.split('=');
            result[key] = value;
        });
        setParams(result);
    }, []);

    const getErrorMessage = () => {
        switch (params.error) {
            case 'access_denied':
                if (params.error_code === 'provider_email_needs_verification') {
                    return 'Por favor, verifica tu correo de Discord para continuar.';
                }
                return 'Acceso denegado. Por favor, intenta de nuevo.';
            default:
                return 'Ha ocurrido un error durante la autenticación.';
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <motion.div 
                className="max-w-md w-full space-y-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <motion.div
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="flex justify-center mb-6"
                    >
                        <XCircle className="w-16 h-16 text-red-500" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
                        Error de autenticación
                    </h2>
                    <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
                        {getErrorMessage()}
                    </p>
                    {params.error_description && (
                        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-500 bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg">
                            {decodeURIComponent(params.error_description).replace(/\+/g, ' ')}
                        </p>
                    )}
                </div>

                <div className="mt-8">
                    <Link 
                        href="/"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-neutral-900 hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100"
                    >
                        Volver al inicio
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}