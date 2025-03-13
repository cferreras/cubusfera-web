import ServerStatus from './ServerStatus';
import NavbarMenu from './NavbarMenu';
import AuthenticationButton from './AuthenticationButton';
import { FaDiscord, FaXTwitter, FaYoutube } from 'react-icons/fa6';

export default function Navbar() {
    return (
        <>
            {/* Barra superior */}
            <div className="bg-white dark:bg-black w-full h-9 border-b dark:border-neutral-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-9">
                    <div className="flex justify-between items-center h-full">
                        {/* Información del servidor */}
                        <ServerStatus />

                        {/* Iconos de redes sociales */}
                        <div className="flex text-neutral-700 dark:text-white space-x-4 items-center justify-between md:justify-end md:w-auto w-full">
                            <div className="flex items-center space-x-4">
                                <a
                                    href="https://discord.com/invite/7uKEYACErc"
                                    className="flex items-center gap-x-1.5 hover:text-indigo-500 transition-colors"
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


