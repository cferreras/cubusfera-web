import { useState, useEffect } from 'react';

export function useOnlinePlayers() {
    const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);

    useEffect(() => {
        const fetchOnlinePlayers = async () => {
            try {
                const response = await fetch('https://api.mcsrvstat.us/2/cubusfera.com');
                const data = await response.json();
                setOnlinePlayers(data.players?.list || []);
            } catch (error) {
                console.error('Failed to fetch online players:', error);
                setOnlinePlayers([]);
            }
        };

        fetchOnlinePlayers();
        const interval = setInterval(fetchOnlinePlayers, 60000); // Update every minute

        return () => clearInterval(interval);
    }, []);

    return onlinePlayers;
}