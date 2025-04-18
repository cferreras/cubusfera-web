import NavbarMenu from './NavbarMenu';
import AuthenticationButton from './AuthenticationButton';
import DarkmodeToggle from './DarkmodeToggle';

export default function Navbar() {
    return (
        <nav className="backdrop-blur-sm border-y dark:border-gray-600 w-full bg-white/55 dark:bg-black/45 sticky top-0 z-50">
            <div className="flex justify-between container mx-auto max-w-7xl h-16">
                <NavbarMenu />
                <div className="flex items-center py-3 gap-x-1">
                    <DarkmodeToggle/>
                    <AuthenticationButton />
                </div>
            </div>
        </nav>
    );
}


