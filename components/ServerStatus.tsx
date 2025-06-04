"use client";
import { useServerStatus } from '@/hooks/useServerStatus';
import { Copy } from 'lucide-react';
import { useState } from 'react';

export default function ServerStatus() {
    const serverStatus = useServerStatus();
    const [copied, setCopied] = useState(false);

    const handleCopyIP = () => {
        navigator.clipboard.writeText('cubusfera.com');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Estado del servidor</h2>
            
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Estado:</span>
                    <div className="flex items-center gap-2">
                        <div className={`h-2 w-2 rounded-full ${serverStatus?.online ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
                        <span className="font-medium">
                            {serverStatus?.online ? 'Online' : 'Offline'}
                        </span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">Jugadores:</span>
                    <span className="font-medium">
                        {serverStatus?.players.online ?? '...'} / {serverStatus?.players.max ?? '...'}
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-neutral-600 dark:text-neutral-400">IP del servidor:</span>
                    <div className="flex items-center gap-2">
                        <code className="font-mono bg-neutral-100 dark:bg-neutral-700 px-2 py-1 rounded text-sm">
                            cubusfera.com
                        </code>
                        <button 
                            onClick={handleCopyIP}
                            className="p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-md transition-colors"
                            aria-label="Copiar IP del servidor"
                        >
                            <Copy size={16} />
                        </button>
                    </div>
                </div>
            </div>
            
            {copied && (
                <div className="mt-4 text-center text-sm text-green-600 dark:text-green-400">
                    ¡IP copiada al portapapeles!
                </div>
            )}
        </div>
    );
}