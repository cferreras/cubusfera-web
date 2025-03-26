import Container from "@/components/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Política de Privacidad – Cubusfera',
    description: 'Política de privacidad de Cubusfera',
}

export default function Privacidad() {
    return (
        <>
            <Container className="py-20">
                <Breadcrumb className="mb-8">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link className='text-lg dark:text-white text-black' href="/legal">Legal</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className='[&>svg]:w-5 [&>svg]:h-5'>
                            <ChevronRightIcon />
                        </BreadcrumbSeparator>
                        <BreadcrumbItem className='text-lg'>
                            Privacidad
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="text-gray-300">

                    <p className="mb-2">Esta Política de Privacidad (&quot;Política&quot;) se aplica al sitio web de Cubusfera (<Link href="https://cubusfera.com" className="text-blue-400 hover:text-blue-300">cubusfera.com</Link>) y rige la recopilación y el uso de datos.</p>

                    <h2 className="text-md font-semibold text-white mb-2">Recopilación de su Información</h2>
                    <p className="mb-2">Utilizamos proveedores de inicio de sesión social (Discord) para autenticar usuarios. Cuando inicia sesión, solo recopilamos la información necesaria para proporcionar las funciones del sitio, como su nombre de usuario de Discord y dirección de correo electrónico.</p>

                    <p className="mb-2">También podemos recopilar información no personal como:</p>
                    <ul className="list-none space-y-2 mb-8">
                        <li className="flex items-center before:content-['-'] before:mr-2">Dirección IP</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">Tipo de navegador</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">Tiempos de acceso</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">Direcciones de sitios web de referencia</li>
                    </ul>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Cookies y Almacenamiento</h2>
                    <p className="mb-2">Las cookies se utilizan únicamente para mantener las sesiones de inicio de sesión. Para análisis de uso del sitio, utilizamos Simple Analytics, una solución que respeta la privacidad y no utiliza cookies ni recopila datos personales.</p>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Retención de Datos</h2>
                    <p className="mb-2">La retención de datos varía según el evento o la función específica:</p>
                    <ul>
                        <li>Algunos datos pueden conservarse durante unos días para respaldar eventos a corto plazo.</li>
                        <li>Otros datos pueden almacenarse indefinidamente para funciones o información continua.</li>
                    </ul>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Compartir Información con Terceros</h2>
                    <p className="mb-2">No vendemos, alquilamos ni arrendamos ninguna información del usuario a terceros.</p>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Utilizamos:</h2>
                    <ul>
                        <li className="flex items-center before:content-['-'] before:mr-2">Supabase para el almacenamiento de datos</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">Vercel para el alojamiento web y análisis</li>
                    </ul>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Seguridad de su Información</h2>
                    <p className="mb-2">Nos comprometemos a proteger su información y utilizamos prácticas estándar de la industria para salvaguardar sus datos, incluido el cifrado, el almacenamiento seguro y controles de acceso estrictos.</p>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Menores de Edad</h2>
                    <p className="mb-2">Este sitio no está destinado a menores de 13 años. Si es menor de 13 años, debe tener el consentimiento de sus padres o tutores para usar el sitio.</p>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Cambios en esta Política</h2>
                    <p className="mb-2">Nos reservamos el derecho de actualizar esta Política según sea necesario. Los cambios significativos se comunicarán a través de avisos en el sitio.</p>

                    <h2 className="text-md font-semibold text-white mt-8 mb-2">Información de Contacto</h2>
                    <p className="mb-8">Si tiene preguntas sobre esta Política o desea solicitar la eliminación de datos, contáctenos a través de nuestro servidor de Discord.</p>
                </div>
            </Container>
        </>
    );
}