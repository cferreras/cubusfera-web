"use client"
import { useEffect, useState } from "react";
import { FaUserGroup } from "react-icons/fa6";

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
            <span><FaUserGroup className="h-5 w-5 mr-1"/></span>
            <span className='mr-2 text-sm'>{serverStatus.players.online}</span>
            <span>jugadores en línea</span>
        </div>
        )
}