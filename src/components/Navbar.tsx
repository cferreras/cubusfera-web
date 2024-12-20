"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ServerStatus {
    online: boolean;
    players: {
        online: string;
        list?: string[];
    };
}

export default function Navbar() {

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
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-lg">
            <div className='bg-indigo-600 w-full h-11'>
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full">
                    <div className='flex justify-between items-center h-full'>
                        <div className="hidden sm:flex items-center text-gr-700 text-sm space-x-4">
                            <div className='text-white  py-2 text-sm text-balance sm:text-nowrap flex items-center'>
                                <span><svg className="mr-2 h-5 w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2" /></svg> </span>
                                <div>IP del servidor: <span className='underline'>cubusfera.com</span></div>
                            </div>
                            <div className='text-white  py-2 text-sm text-balance sm:text-nowrap flex items-center'>
                                <span><svg className="mr-2 h-5 w-5 opacity-80" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" /></svg> </span>
                                <span className='mr-2 text-sm'>{serverStatus.players.online}</span>
                                <span>jugadores en línea</span>
                            </div>
                        </div>
                        <div className='text-white flex items-center space-x-2'>
                            <a href="https://x.com/cubusfera"><svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"/></svg></a>
                            <a href="https://www.youtube.com/@cubusfera"><svg className='h-6 w-6' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"/></svg></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 justify-between">
                    <div className="flex ">
                        <div className="-ml-2 mr-2 flex items-center lg:hidden">
                            {/* <!-- Mobile menu button --> */}
                            <button type="button" onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center rounded-md p-2 text-gray-400  hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                {/* <!--
                                    Icon when menu is closed.

                                    Menu open: "hidden", Menu closed: "block"
            --> */}
                                <svg className={!isOpen ? "block h-6 w-6" : "hidden h-6 w-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                {/* <!--
                                    Icon when menu is open.

                                    Menu open: "block", Menu closed: "hidden"
            --> */}
                                <svg className={isOpen ? "block h-6 w-6" : "hidden h-6 w-6"} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <Link href='/' className="flex flex-shrink-0 items-center">
                            <img className="block h-12 w-auto lg:hidden" src="/cubusfera-logo.png" alt="Your Company" />
                            <img className="hidden h-12 w-auto lg:block" src="/cubusfera-logo.png" alt="Your Company" />
                        </Link>
                        <div className="hidden lg:ml-6 lg:flex ">
                            {/* <!-- Current: "border-indigo-500 text-gra-700", Default: "border-transparent text-gr-700 hover:border-gray-300 hover:text-purple-700" --> */}
                            <Link href="/" className="inline-flex items-center  px-8 pt-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" /></svg> Inicio</Link>
                            <Link href="/mapa" className="inline-flex items-center px-8 pt-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 5.1L9 3L3 5.02v16.2l6-2.33l6 2.1l6-2.02V2.77zm0 13.79l-6-2.11V5.11l6 2.11z" /></svg> Mapa</Link>
                            <Link href="/blog" className="inline-flex items-center px-8 pt-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"/></svg> Blog</Link>
                            <Link href="/normas" className="inline-flex items-center px-8 pt-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-1.27 0-2.4.8-2.82 2H3v2h1.95L2 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3L6.05 7h3.12c.33.85.98 1.5 1.83 1.83V20H2v2h20v-2h-9V8.82c.85-.32 1.5-.97 1.82-1.82h3.13L15 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3l-2.95-7H21V5h-6.17C14.4 3.8 13.27 3 12 3m0 2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-6.5 5.25L7 14H4zm13 0L20 14h-3z" /></svg>Normas</Link>
                            <Link href="/miembros" className="inline-flex items-center px-8 pt-1 text-sm text-gray-700 hover:bg-gray-100 transition-colors"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" /></svg>Miembros</Link>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <button type="button" className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm  text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                <svg className="-ml-0.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" /></svg>
                                Discord
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div className={isOpen ? "block lg:hidden" : "hidden lg:hidden"} id="mobile-menu">
               
                    {/* <!-- Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gra-700 hover:bg-gray-50 hover:border-gray-300 hover:text-purple-700" --> */}
                    <Link onClick={() => setIsOpen(!isOpen)} href="/" className="flex hover:bg-gray-100 py-4 pl-3 pr-4 text-base text-gray-700 sm:pl-5 sm:pr-6"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" /></svg> Inicio</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} href="/mapa" className="flex hover:bg-gray-100 border-transparent py-4 pl-3 pr-4 text-base text-gray-700  hover:border-gray-300 sm:pl-5 sm:pr-6"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M15 5.1L9 3L3 5.02v16.2l6-2.33l6 2.1l6-2.02V2.77zm0 13.79l-6-2.11V5.11l6 2.11z" /></svg> Mapa</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} href="/blog" className="flex hover:bg-gray-100 border-transparent py-4 pl-3 pr-4 text-base text-gray-700  hover:border-gray-300 sm:pl-5 sm:pr-6"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2m-6 14H8c-.55 0-1-.45-1-1s.45-1 1-1h5c.55 0 1 .45 1 1s-.45 1-1 1m3-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1m0-4H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1"/></svg> Blog</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} href="/normas" className="flex hover:bg-gray-100 border-transparent py-4 pl-3 pr-4 text-base text-gray-700  hover:border-gray-300 sm:pl-5 sm:pr-6"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3c-1.27 0-2.4.8-2.82 2H3v2h1.95L2 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3L6.05 7h3.12c.33.85.98 1.5 1.83 1.83V20H2v2h20v-2h-9V8.82c.85-.32 1.5-.97 1.82-1.82h3.13L15 14c-.47 2 1 3 3.5 3s4.06-1 3.5-3l-2.95-7H21V5h-6.17C14.4 3.8 13.27 3 12 3m0 2a1 1 0 0 1 1 1a1 1 0 0 1-1 1a1 1 0 0 1-1-1a1 1 0 0 1 1-1m-6.5 5.25L7 14H4zm13 0L20 14h-3z" /></svg>Normas</Link>
                    <Link onClick={() => setIsOpen(!isOpen)} href="/miembros" className="flex hover:bg-gray-100 border-transparent py-4 pl-3 pr-4 text-base text-gray-700  hover:border-gray-300 sm:pl-5 sm:pr-6"><svg className='h-6 w-6 mr-2 text-indigo-600' xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05c1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5" /></svg>Miembros</Link>
               
            </div>
        </nav>
    );
}

