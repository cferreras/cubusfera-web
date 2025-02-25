import ServerStatus from './ServerStatus';
import NavbarMenu from './NavbarMenu';
import AuthenticationButton from './AuthenticationButton';
import { FaDiscord, FaEarthAfrica, FaEarthEurope, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import { EarthIcon, WholeWord, WholeWordIcon } from 'lucide-react';

export default function Navbar() {
    return (
        <>
            {/* Barra superior */}
            <div className="bg-indigo-600 w-full h-9">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9">
                    <div className="flex justify-between items-center h-full">
                        {/* Información del servidor */}
                        <div className="hidden md:flex items-center text-gray-700 text-sm space-x-4">
                            <div className="text-white py-2 text-sm text-balance sm:text-nowrap flex items-center">
                                <span>
                                    <FaEarthAfrica className='h-5 w-5 mr-1.5'/>
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
                                    <FaDiscord className='h-5 w-5'/>
                                </a>

                                <a
                                    href="https://www.youtube.com/@cubusfera"
                                    className="flex items-center gap-x-1.5"
                                >
                                    <FaYoutube className='h-5 w-5'/>
                                </a>

                                <a
                                    href="https://www.x.com/cubusfera"
                                    className="flex items-center gap-x-1.5"
                                >
                                    <FaXTwitter className='h-5 w-5'/>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Barra inferior */}
            <nav className="backdrop-blur-sm border-b dark:border-gray-600 w-full bg-white/55 dark:bg-black/45 sticky top-0 z-50">
                <div className="flex justify-between container mx-auto max-w-7xl h-16">
                    <NavbarMenu />
                    <div className="flex items-center py-3 gap-x-1">
                        <AuthenticationButton />
                    </div>
                </div>
            </nav>
        </>
    );
}


