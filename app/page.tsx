"use client";

import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import Link from "next/link";
import { MINECRAFT_VERSION } from "@/constants";
import FAQAccordion from "@/components/FAQAccordion";

export default function Home() {
    return (
        <Container className="py-8 md:py-12 relative !max-w-screen-lg">
            {/* TheHeader now contains all header content with a single h1 */}
            <TheHeader />

            {/* Features section with semantic HTML */}
            <section className="mt-8 md:mt-12 relative" aria-labelledby="features-heading">
                <h2 id="features-heading" className="text-2xl mb-4 font-medium" >Características</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <FeatureCard
                        title="Técnico"
                        description="Enfocado en la construcción técnica y la optimización de granjas."
                        icon="/images/feature-icon-1.svg"
                    />
                    <FeatureCard
                        title="Vanilla"
                        description="Jugabilidad pura de Minecraft sin modificaciones que alteren la experiencia original."
                        icon="/images/feature-icon-2.svg"
                    />
                    <FeatureCard
                        title="Seguro"
                        description="Protección contra griefing y un entorno seguro para todos los jugadores."
                        icon="/images/feature-icon-3.svg"
                    />
                </div>
            </section>

            {/* Community section - New addition */}
            <section className="mt-8" aria-labelledby="community-heading">
                <h2 id="community-heading" className="text-2xl mb-4 font-medium">Comunidad activa</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                    <div className="bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69] p-6 rounded-lg space-y-2">
                        <p className="text-[#4B5563] dark:text-white">Jugadores activos</p>
                        <div className="text-2xl font-medium">100+</div>
                    </div>
                    <div className="bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69] p-6 rounded-lg space-y-2">
                        <p className="text-[#4B5563] dark:text-white">Proyectos técnicos</p>
                        <div className="text-2xl font-medium mb-2 text-[#4B5563] dark:bg-gradient-to-br dark:from-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">50+</div>
                    </div>
                    <div className="bg-white dark:bg-[#21364A] border border-[#E5E7EB] dark:border-[#304D69] p-6 rounded-lg space-y-2">
                        <p className="text-[#4B5563] dark:text-white">Servidor disponible</p>
                        <div className="text-2xl font-medium mb-2 text-[#4B5563] dark:bg-gradient-to-br dark:from-white dark:to-neutral-400 dark:bg-clip-text dark:text-transparent">24/7</div>
                    </div>
                </div>
            </section>

            <section className="mt-8" aria-labelledby="testimonials-heading">
                <h2 id="testimonials-heading" className="text-2xl mb-4 font-medium">Testimonios</h2>
                <TestimonialCard />
            </section>

            {/* FAQ Section - New addition */}
            <section className="mt-8" aria-labelledby="faq-heading">
                <h2 id="faq-heading" className="text-2xl mb-4 font-medium">Preguntas frecuentes</h2>

                <FAQAccordion 
                    items={[
                        {
                            id: "item-1",
                            question: "¿Cómo puedo unirme al servidor?",
                            answer: (
                                <>
                                    Para unirte a Cubusfera, necesitas completar nuestro <Link href="/formulario" className="underline">formulario de solicitud</Link> y ser aceptado por nuestro equipo.
                                    Visita la <Link href="/formulario" className="underline">sección de Unirse</Link> para más detalles.
                                </>
                            )
                        },
                        {
                            id: "item-2",
                            question: "¿Qué versión de Minecraft necesito?",
                            answer: (
                                <>
                                    Actualmente el servidor funciona en la versión Java {MINECRAFT_VERSION}. Recomendamos usar la versión más reciente para
                                    disfrutar de todas las características.
                                </>
                            )
                        },
                        {
                            id: "item-3",
                            question: "¿Qué tipo de proyectos puedo construir?",
                            answer: (
                                <>
                                    En Cubusfera puedes construir todo tipo de proyectos técnicos, desde granjas eficientes hasta
                                    complejos sistemas de redstone. Fomentamos la creatividad y la colaboración entre jugadores.
                                </>
                            )
                        },
                        {
                            id: "item-4",
                            question: "¿Es obligatorio unirse al servidor de Discord?",
                            answer: (
                                <>
                                    Sí, es necesario unirse a nuestro servidor de Discord para formar parte de Cubusfera. Discord es nuestra principal vía de comunicación,
                                    donde compartimos anuncios importantes, coordinamos proyectos y creamos una comunidad activa.
                                    Puedes unirte a través de <Link href="https://discord.com/invite/7uKEYACErc" className="underline">este enlace</Link>.
                                </>
                            )
                        }
                    ]}
                />
            </section>

            <section className="mt-8 flex justify-center">
                <Link
                    href="/formulario"
                    className="px-6 py-2.5 bg-[#3B82F6] text-white rounded-xl transition-colors hover:bg-[#60A5FA]"
                >
                    Comenzar ahora
                </Link>
            </section>

        </Container>
    );
}