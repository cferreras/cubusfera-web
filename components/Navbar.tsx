import NavbarMenu from './NavbarMenu';
import AuthenticationButton from './AuthenticationButton';
import DarkmodeToggle from './DarkmodeToggle';
import Link from 'next/link';
import Image from 'next/image';
import CubusferaIcon from './icon/cubusfera-icon-dark';
import CubusferaIconDark from './icon/cubusfera-icon-dark';
import CubusferaIconLight from './icon/cubusfera-icon-light';

export default function Navbar() {
    return (
        <nav className="backdrop-blur-md border-b   dark:border-white/20 w-full bg-white/75 dark:bg-black/60 sticky top-0 z-50 shadow-sm">
          <div className='flex justify-between mx-auto md:max-w-screen-xl px-10'>
            <div className="flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md flex items-center justify-center">
                        <CubusferaIconDark className='hidden dark:block' />
                        <CubusferaIconLight className='dark:hidden' />
                    </div>

                    <span className="font-bold text-xl hidden sm:block text-gray-800 dark:text-white">Cubusfera</span>
                </Link>
            </div>
            <div className="flex items-center gap-x-2 flex-row-reverse md:flex-row">
                <NavbarMenu />
                <AuthenticationButton />
                <DarkmodeToggle />
            </div>
            </div> 
        </nav>
    );
}


