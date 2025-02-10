import React from 'react';
import { Badge } from './ui/badge';
import { Card } from './ui/card';

interface PostulationStatusProps {
    status: 'accepted' | 'pending' | 'rejected' | 'unknown';
}

const PostulationStatus: React.FC<PostulationStatusProps> = ({ status }) => {
    let statusText;
    let badgeColor;

    switch (status) {
        case 'accepted':
            statusText = '¡Felicidades! Has sido aceptado.';
            badgeColor = 'bg-green-500';
            break;
        case 'pending':
            statusText = 'Tu postulación está pendiente de revisión.';
            badgeColor = 'bg-blue-500';
            break;
        case 'rejected':
            statusText = 'Lamentamos informarte que has sido rechazado.';
            badgeColor = 'bg-red-500';
            break;
        default:
            statusText = 'Estado de postulación desconocido.';
            badgeColor = 'bg-gray-500';
    }

    return (
        <div className='p-6 space-y-4'>
            <h2 className="text-2xl font-semibold">Estado de tu postulación</h2>
            <Badge className={`${badgeColor} text-white px-4 py-2 rounded-md hover:${badgeColor}/50`}>
                {statusText}
            </Badge>
        </div>
    );
};

export default PostulationStatus;