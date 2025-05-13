import NavbarMenu from './NavbarMenu';
import AuthenticationButton from './AuthenticationButton';
import DarkmodeToggle from './DarkmodeToggle';
import Link from 'next/link';
import CubusferaIconDark from './icon/cubusfera-icon-dark';
import CubusferaIconLight from './icon/cubusfera-icon-light';

export default function Navbar() {
    return (
        <nav className="backdrop-blur-md border-b dark:border-gray-800 w-full bg-white/75 dark:bg-black/60 sticky top-0 z-50 shadow-sm">
            <div className="flex justify-between items-center container mx-auto max-w-7xl h-16 px-4 sm:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <CubusferaIconDark className="hidden h-9 w-auto dark:block" />
                        <CubusferaIconLight className="block h-9 w-auto dark:hidden" />
                        </div>
                      
                        <span className="font-bold text-xl hidden sm:block text-gray-800 dark:text-white">Cubusfera</span>
                    </Link>
                </div>
                <NavbarMenu />
                <div className="flex items-center py-3 gap-x-3">
                    <DarkmodeToggle />
                    <AuthenticationButton />
                </div>
            </div>
        </nav>
    );
}


