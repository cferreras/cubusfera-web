"use client";

import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTACard from "@/components/CTACard";
import Link from "next/link";
import { MINECRAFT_VERSION } from "@/constants";

export default function Home() {
    return (
        <Container className="py-8 md:py-12 relative">
            {/* TheHeader now contains all header content with a single h1 */}
            <TheHeader />
            <div className="space-y-16 md:space-y-24 lg:space-y-32">
                {/* Features section with semantic HTML */}
                <section className="mt-8 md:mt-12 relative" aria-labelledby="features-heading">
                    
                    <h2 id="features-heading" className="text-xl mb-4 font-medium" >Características</h2>

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
                <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 rounded-3xl bg-gradient-to-br from-neutral-50/50 via-neutral-100/50 to-neutral-50/50 dark:from-neutral-900/50 dark:via-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative overflow-hidden" aria-labelledby="community-heading">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 id="community-heading" className="text-3xl font-bold mb-4">Una comunidad activa y colaborativa</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Únete a cientos de jugadores apasionados por el Minecraft técnico,
                            comparte conocimientos y participa en proyectos comunitarios.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
                        <div className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">100+</div>
                            <p className="text-muted-foreground">Jugadores activos</p>
                        </div>
                        <div className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">50+</div>
                            <p className="text-muted-foreground">Proyectos técnicos</p>
                        </div>
                        <div className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">24/7</div>
                            <p className="text-muted-foreground">Servidor disponible</p>
                        </div>
                    </div>
                </section>

                <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden" aria-labelledby="testimonials-heading">
                    <div className="text-center mb-10 md:mb-14">
                        <h2 id="testimonials-heading" className="text-3xl font-bold mb-4 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent inline-block">Lo que dicen nuestros jugadores</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Descubre las experiencias de quienes ya forman parte de nuestra comunidad
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto px-4 md:px-0">
                        <div className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-10">
                            <TestimonialCard />
                        </div>
                    </div>
                </section>

                {/* FAQ Section - New addition */}
                <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 rounded-3xl bg-gradient-to-br from-neutral-50/50 via-neutral-100/50 to-neutral-50/50 dark:from-neutral-900/50 dark:via-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative overflow-hidden" aria-labelledby="faq-heading">
                    <div className="absolute -left-24 -top-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="text-center mb-10 md:mb-14">
                        <h2 id="faq-heading" className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Todo lo que necesitas saber para comenzar tu aventura en Cubusfera
                        </p>
                    </div>
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                        <div className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <h3 className="text-xl font-semibold mb-3">¿Cómo puedo unirme al servidor?</h3>
                            <p className="text-muted-foreground">
                                Para unirte a Cubusfera, necesitas completar nuestro <Link href="/formulario" className="text-primary hover:underline hover:text-primary/80 transition-colors">formulario de solicitud</Link> y ser aceptado por nuestro equipo.
                                Visita la <Link href="/formulario" className="text-primary hover:underline hover:text-primary/80 transition-colors">sección de Unirse</Link> para más detalles.
                            </p>
                        </div>
                        <div className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <h3 className="text-xl font-semibold mb-3">¿Qué versión de Minecraft necesito?</h3>
                            <p className="text-muted-foreground">
                                Actualmente el servidor funciona en la versión Java {MINECRAFT_VERSION}. Recomendamos usar la versión más reciente para
                                disfrutar de todas las características.
                            </p>
                        </div>
                        <div className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <h3 className="text-xl font-semibold mb-3">¿Qué tipo de proyectos puedo construir?</h3>
                            <p className="text-muted-foreground">
                                En Cubusfera puedes construir todo tipo de proyectos técnicos, desde granjas eficientes hasta
                                complejos sistemas de redstone. Fomentamos la creatividad y la colaboración entre jugadores.
                            </p>
                        </div>
                        <div className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md">
                            <h3 className="text-xl font-semibold mb-3">¿Es obligatorio unirse al servidor de Discord?</h3>
                            <p className="text-muted-foreground">
                                Sí, es necesario unirse a nuestro servidor de Discord para formar parte de Cubusfera. Discord es nuestra principal vía de comunicación,
                                donde compartimos anuncios importantes, coordinamos proyectos y creamos una comunidad activa.
                                Puedes unirte a través de <Link href="https://discord.com/invite/7uKEYACErc" className="text-primary hover:underline hover:text-primary/80 transition-colors">este enlace</Link>.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="py-12 md:py-16 lg:py-20 mt-4 md:mt-8 relative overflow-hidden">
                    <CTACard title={""} description={""} primaryButtonText={""} primaryButtonHref={""} />
                </section>
            </div>
        </Container>
    );
}