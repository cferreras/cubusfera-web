"use client"
import { useEffect, useState } from "react";
import { FaEarthAfrica, FaUserGroup } from "react-icons/fa6";
import { motion } from "framer-motion";

interface ServerStatus {
    online: boolean;
    players: {
        online: string;
        list?: string[];
    };
}

export default function ServerStatus() {
    const [serverStatus, setServerStatus] = useState<ServerStatus>({ online: false, players: { online: "?" } });
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchServerStatus = async () => {
            try {
                setIsLoading(true);
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
            } finally {
                setIsLoading(false);
            }
        };
        fetchServerStatus();
    }, []);

    return (
        <div className="hidden md:flex items-center text-sm space-x-4">
        <motion.div 
            className=" py-2 text-sm text-balance sm:text-nowrap flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.span
                animate={{ rotate: [0, 10, 0, -10, 0] }}
                transition={{ 
                    repeat: Infinity,
                    duration: 5,
                    repeatType: "loop",
                    ease: "easeInOut",
                    repeatDelay: 2
                }}
            >
                <FaEarthAfrica className='h-4 w-4 mr-1.5'/>
            </motion.span>
            <div>
                IP del servidor:{" "}
                <motion.span 
                    className="underline cursor-pointer text-neutral-700 dark:text-neutral-300"
                    whileHover={{ scale: 1.05, color: "#6366f1" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        navigator.clipboard.writeText("cubusfera.com");
                    }}
                >
                    cubusfera.com
                </motion.span>
            </div>
        </motion.div>
        <motion.div 
            className='py-2 text-sm text-balance sm:text-nowrap flex items-center'
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.span
                animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: serverStatus.online ? 1 : 0.5
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    repeatType: "loop"
                }}
            >
                <FaUserGroup className={`h-4 w-4 mr-1 ${serverStatus.online ? 'text-green-400' : 'text-red-400'}`}/>
            </motion.span>
            
            {isLoading ? (
                <motion.span
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className='mr-2 text-sm'
                >
                    Cargando...
                </motion.span>
            ) : (
                <>
                    <motion.span 
                        className='mr-2 text-sm'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {serverStatus.players.online}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        jugadores en línea
                    </motion.span>
                </>
            )}
        </motion.div>
        </div>
    )
}