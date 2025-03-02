import React from 'react';
import { Badge } from './ui/badge';
import { CheckCircle2, Clock, XCircle, HelpCircle } from "lucide-react";

interface PostulationStatusProps {
    status: 'accepted' | 'pending' | 'rejected' | 'unknown';
}

const PostulationStatus: React.FC<PostulationStatusProps> = ({ status }) => {
    const statusConfig = {
        accepted: {
            icon: <CheckCircle2 className="h-12 w-12 text-green-500" />,
            title: "¡Felicidades!",
            text: "Has sido aceptado en el servidor.",
            badgeClass: "bg-green-500/10 dark:text-green-500 text-green-700 hover:bg-green-500/20"
        },
        pending: {
            icon: <Clock className="h-12 w-12 text-yellow-500" />,
            title: "En revisión",
            text: "Tu postulación está siendo revisada.",
            badgeClass: "bg-yellow-500/10 dark:text-yellow-500 text-yellow-700 hover:bg-yellow-500/20"
        },
        rejected: {
            icon: <XCircle className="h-12 w-12 text-red-500" />,
            title: "No aceptado",
            text: "Lamentamos informarte que tu postulación ha sido rechazada.",
            badgeClass: "bg-red-500/10 dark:text-red-500 text-red-700 hover:bg-red-500/20"
        },
        unknown: {
            icon: <HelpCircle className="h-12 w-12 text-neutral-500" />,
            title: "Estado desconocido",
            text: "No podemos determinar el estado de tu postulación.",
            badgeClass: "bg-neutral-500/10 dark:text-neutral-500 text-neutral-700 hover:bg-neutral-500/20"
        }
    };

    const config = statusConfig[status];

    return (
        <div className="p-8 bg-neutral-100 dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                {config.icon}
                <div className="space-y-2">
                    <h3 className="text-lg font-bold">{config.title}</h3>
                    <Badge className={`${config.badgeClass} px-4 py-2 rounded-xl`}>
                        {config.text}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default PostulationStatus;