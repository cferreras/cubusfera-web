import Link from 'next/link';
import { useEffect, useState } from 'react';
import Tooltip from './Tooltip';
import LoginProfileButton from './LoginProfileButton';
import ServerStatus from './ServerStatus';
import DarkmodeToggle from './DarkmodeToggle';
import NavbarMenu from './NavbarMenu';




export default function Navbar() {
    return (
        <nav className="bg-white dark:bg-black shadow-lg border-b dark:border-gray-600">
            {/* Barra superior */}
            <div className="bg-indigo-600 w-full h-9">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9">
                    <div className="flex justify-between items-center h-full">
                        {/* Información del servidor */}
                        <div className="hidden sm:flex items-center text-gray-700 text-sm space-x-4">
                            <div className="text-white py-2 text-sm text-balance sm:text-nowrap flex items-center">
                                <span>
                                    <svg
                                        className="mr-2 h-5 w-5 opacity-80"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"
                                        />
                                    </svg>
                                </span>
                                <div>
                                    IP del servidor:{" "}
                                    <span className="underline">cubusfera.com</span>
                                </div>
                            </div>
                            <ServerStatus />
                        </div>

                        {/* Iconos de redes sociales */}
                        <div className="flex text-white space-x-4 items-center justify-between md:justify-end md:w-auto w-full">
                            <div className="flex items-center space-x-4">
                                <a
                                    href="https://discord.com/invite/7uKEYACErc"
                                    className="flex items-center gap-x-1.5"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12"
                                        />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.youtube.com/@cubusfera"
                                    className="flex items-center gap-x-1.5"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                                        />
                                    </svg>
                                </a>

                                <a
                                    href="https://www.x.com/cubusfera"
                                    className="flex items-center gap-x-1.5"
                                >
                                    <svg
                                        className="h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="1em"
                                        height="1em"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <div className="flex justify-between container mx-auto max-w-7xl">
                <NavbarMenu />
                <div className="flex items-center space-x-4 py-3">
                    <DarkmodeToggle />
                    <LoginProfileButton />
                </div>
            </div>
        </nav>
    );
}


