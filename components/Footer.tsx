import Link from "next/link";
import CubusferaIconDark from "./icon/cubusfera-icon-dark";
import CubusferaIconLight from "./icon/cubusfera-icon-light";
import { FaDiscord, FaYoutube, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <footer className="w-full relative z-10 py-8">
            <div className="container mx-auto max-w-screen-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Columna 1: Logo e información */}
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="h-12 flex items-center shrink-0 gap-3 text-2xl">
                            <CubusferaIconDark className="hidden h-11 w-auto dark:block" />
                            <CubusferaIconLight className="block h-11 w-auto dark:hidden" />
                            Cubusfera
                        </Link>
                        <p className="text-sm dark:text-[#8FADCC] text-[#5C738A]">
                            Servidor de Minecraft técnico en español dedicado a jugadores que disfrutan explorando las mecánicas avanzadas del juego.
                        </p>
                    </div>

                    {/* Columna 2: Sobre Cubusfera */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Sobre Cubusfera</h3>
                        <p className="text-sm dark:text-[#8FADCC] text-[#5C738A]">
                            Nos especializamos en redstone, granjas eficientes, y sistemas automatizados, todo dentro de un entorno vanilla amigable y colaborativo.
                        </p>
                        <p className="text-sm dark:text-[#8FADCC] text-[#5C738A]">
                            Nuestra comunidad está formada por jugadores apasionados que comparten conocimientos y colaboran en proyectos.
                        </p>
                    </div>

                    {/* Columna 3: Enlaces útiles */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Enlaces útiles</h3>
                        <div className="flex flex-col gap-2">
                            <Link href="/mapa" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Mapa del servidor</Link>
                            <Link href="/normas" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Normas</Link>
                            <Link href="/ranking" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Ranking</Link>
                            <Link href="/blog" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Blog</Link>
                            <Link href="/contacto" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Contacto</Link>
                            <a href="https://cubusfera.tebex.io/" className="text-sm dark:text-[#8FADCC] text-[#5C738A] hover:underline">Tienda</a>
                        </div>
                    </div>

                    {/* Columna 4: Redes sociales */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-lg font-medium">Síguenos</h3>
                        <p className="text-sm dark:text-[#8FADCC] text-[#5C738A]">
                            Únete a nosotros y lleva tus habilidades de Minecraft al siguiente nivel.
                        </p>
                        <div className="flex items-center justify-evenly gap-2 p-2 bg-[#EBEDF2] dark:bg-[#21364A] rounded-xl">
                            <a href="https://discord.com/invite/7uKEYACErc" className="w-12 h-10 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-lg" aria-label="Discord">
                                <FaDiscord className="w-5 h-5" />
                            </a>
                            <div className="w-[1px] h-2 dark:bg-white/10 bg-black/10"></div>
                            <a href="https://www.youtube.com/@cubusfera" className="w-12 h-10 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-lg" aria-label="YouTube">
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            <div className="w-[1px] h-2 dark:bg-white/10 bg-black/10"></div>
                            <a href="https://www.x.com/cubusfera" className="w-12 h-10 flex items-center justify-center dark:hover:bg-white/5 hover:bg-black/5 rounded-lg" aria-label="Twitter">
                                <FaXTwitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Línea divisoria */}
                <div className="w-full h-px bg-neutral-200 dark:bg-[#304D69] my-6"></div>

                {/* Pie de página */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-xs dark:text-[#8FADCC] text-[#5C738A]">© 2025 Cubusfera - Servidor de Minecraft Técnico</span>
                    <div className="flex items-center gap-3">
                        <a href="/legal/privacidad" className="dark:text-[#8FADCC] text-[#5C738A] text-xs hover:underline">Privacidad</a>
                        <span className="dark:text-[#8FADCC] text-[#5C738A] text-sm">·</span>
                        <a href="/legal/terminos" className="dark:text-[#8FADCC] text-[#5C738A] text-xs hover:underline">Términos</a>
                        <span className="dark:text-[#8FADCC] text-[#5C738A] text-sm">·</span>
                        <a href="/contacto" className="dark:text-[#8FADCC] text-[#5C738A] text-xs hover:underline">Contacto</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}