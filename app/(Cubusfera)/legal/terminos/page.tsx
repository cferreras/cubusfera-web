import Container from "@/components/Container";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ChevronRightIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Términos de Servicio – Cubusfera',
    description: 'Términos de servicio de Cubusfera',
}

export default function Terminos() {
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
                            Términos
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="dark:text-gray-300 text-gray-800">
                    <p className="mb-2">Al acceder o utilizar el sitio web de Cubusfera (<Link href="https://cubusfera.com" className="text-blue-400 hover:text-blue-300">cubusfera.com</Link>) (&quot;Sitio&quot;), aceptas los siguientes términos y condiciones (&quot;Términos&quot;). Si no estás de acuerdo con estos Términos, no debes usar el Sitio.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Uso del Sitio</h2>
                    <p className="mb-2">El Sitio se proporciona como una plataforma para la comunidad de Minecraft de Cubusfera. El uso del Sitio está sujeto a las siguientes reglas:</p>
                    <ul className="list-none space-y-2 mb-8">
                        <li className="flex items-center before:content-['-'] before:mr-2">No debes intentar abusar, hacer trampa o manipular las estadísticas o rankings del servidor.</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">No debes interferir con la funcionalidad o disponibilidad del Sitio para otros usuarios.</li>
                        <li className="flex items-center before:content-['-'] before:mr-2">No debes participar en ninguna actividad que viole las leyes o regulaciones aplicables.</li>
                    </ul>

                    <h2 className="text-md font-semibold mt-8 mb-2">Inicio de Sesión y Autenticación</h2>
                    <p className="mb-2">El Sitio utiliza Discord para la autenticación. Al usar este servicio, aceptas sus términos y políticas de privacidad. El mal uso de tu cuenta (por ejemplo, compartirla o usar scripts) puede resultar en acceso restringido o terminación de tu participación.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Sin Garantía de Funcionalidad</h2>
                    <p className="mb-2">El Sitio se ofrece &quot;tal cual&quot; y &quot;según disponibilidad&quot;. No garantizamos que el Sitio funcionará sin interrupciones, retrasos, errores o fallos. El Sitio puede quedar fuera de línea o experimentar problemas sin previo aviso, y no se asumirá ninguna compensación o responsabilidad por tales ocurrencias.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Terminación del Servicio</h2>
                    <p className="mb-2">Nos reservamos el derecho de restringir o terminar el acceso al Sitio para cualquier usuario a nuestra discreción, incluyendo pero no limitado a usuarios que participen en comportamientos abusivos o maliciosos.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Limitación de Responsabilidad</h2>
                    <p className="mb-2">En la máxima medida permitida por la ley, Cubusfera y sus creadores no serán responsables por ningún daño resultante del uso o la imposibilidad de usar el Sitio, incluyendo pero no limitado a pérdida de datos, interrupciones o problemas derivados de las acciones del usuario.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Cambios en los Términos</h2>
                    <p className="mb-2">Podemos actualizar estos Términos en cualquier momento. Los cambios significativos se comunicarán a través de avisos en el Sitio. El uso continuado del Sitio después de que se hayan realizado cambios constituye la aceptación de los nuevos Términos.</p>

                    <h2 className="text-md font-semibold mt-8 mb-2">Contacto</h2>
                    <p className="mb-8">Si tienes preguntas sobre estos Términos, contáctanos a través de nuestro servidor de Discord.</p>
                </div>
            </Container>
        </>
    );
}