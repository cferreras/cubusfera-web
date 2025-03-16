'use client';

import { useState, useEffect } from 'react';

interface ServerStatus {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
}

export function useServerStatus() {
    const [status, setStatus] = useState<ServerStatus | null>(null);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await fetch('https://api.mcsrvstat.us/3/cubusfera.com');
                const data = await response.json();
                setStatus({
                    online: data.online,
                    players: {
                        online: data.players?.online || 0,
                        max: data.players?.max || 0
                    }
                });
            } catch (error) {
                console.error('Failed to fetch server status:', error);
            }
        };

        fetchStatus();
        const interval = setInterval(fetchStatus, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return status;
}