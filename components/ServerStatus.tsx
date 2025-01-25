"use client"
import { useEffect, useState } from "react";

interface ServerStatus {
    online: boolean;
    players: {
        online: string;
        list?: string[];
    };
}

export default function ServerStatus() {
        const [serverStatus, setServerStatus] = useState<ServerStatus>({ online: false, players: { online: "?" } });
    
        useEffect(() => {
            const fetchServerStatus = async () => {
                try {
                    const response = await fetch('https://api.mcsrvstat.us/2/cubusfera.com');
                    const data = await response.json();
                    setServerStatus({
                        online: data.online,
                        players: {
                            online: data.players?.online ?? "0",
                            list: data.players?.list ?? []
                        }
                    });
                } catch (error) {
                    console.error('Error fetching server status:', error);
                }
            };
            fetchServerStatus();
        }, []);

        return (
            <div className='text-white  py-2 text-sm text-balance sm:text-nowrap flex items-center'>
            <span><svg className="mr-2 h-5 w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" /></svg> </span>
            <span className='mr-2 text-sm'>{serverStatus.players.online}</span>
            <span>jugadores en línea</span>
        </div>
        )
}