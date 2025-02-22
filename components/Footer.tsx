import Link from "next/link";
import CubusferaIconDark from "./icon/cubusfera-icon-dark";
import CubusferaIconLight from "./icon/cubusfera-icon-light";
import { FaDiscord, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full relative z-10 px-4 py-12 border-t dark:border-neutral-800 border-neutral-200" data-pattern="diamonds">
            <div className="w-full flex flex-col items-center justify-center gap-12 relative z-20">
                <Link href="/" className="h-12 flex items-center shrink-0 gap-3 px-4 text-2xl">
                    <CubusferaIconDark className="hidden h-11 w-auto dark:block" />
                    <CubusferaIconLight className="block h-11 w-auto dark:hidden" />
                    Cubusfera
                </Link>
                <div className="flex items-center gap-2 p-2 dark:bg-neutral-800 bg-neutral-200 rounded-2xl">
                    <a href="https://discord.com/invite/7uKEYACErc" className="w-16 h-12 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-xl">
                        <FaDiscord className="w-6 h-6" />
                    </a>
                    <div className="w-[1px] h-2 dark:bg-white/10 bg-black/10"></div>
                    <a href="https://www.youtube.com/@cubusfera" className="w-16 h-12 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-xl">
                        <FaYoutube className="w-6 h-6" />
                    </a>
                    <div className="w-[1px] h-2 dark:bg-white/10 bg-black/10"></div>
                    <a href="https://www.x.com/cubusfera" className="w-16 h-12 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-xl">
                        <FaXTwitter className="w-6 h-6" />
                    </a>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs dark:text-neutral-300 text-neutral-700">© 2025 Cubusfera</span>
                    <div className="flex items-center gap-3">
                        <a href="/legal/privacy" className="dark:text-neutral-400 text-neutral-600 text-xs hover:underline">Privacidad</a>
                        <span className="dark:text-neutral-400 text-neutral-600 text-sm">·</span>
                        <a href="/legal/terms" className="dark:text-neutral-400 text-neutral-600 text-xs hover:underline">Términos</a>
                        <span className="dark:text-neutral-400 text-neutral-600 text-sm">·</span>
                        <a href="/contact" className="dark:text-neutral-400 text-neutral-600 text-xs hover:underline">Contacto</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}