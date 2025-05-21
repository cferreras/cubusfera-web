"use client";

import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTACard from "@/components/CTACard";
import Link from "next/link";
import { motion } from "framer-motion";
import { MINECRAFT_VERSION } from "@/constants";

export default function Home() {
    return (
        <Container className="py-8 md:py-12 relative">
            {/* TheHeader now contains all header content with a single h1 */}
            <TheHeader />
            <div className="space-y-16 md:space-y-24 lg:space-y-32">
                {/* Features section with semantic HTML */}
                <section className="space-y-16 md:space-y-24 lg:space-y-32 mt-8 md:mt-12 relative" aria-labelledby="features-heading">
                    
                    <h2 id="features-heading" className="sr-only">Características de nuestro servidor</h2>

                    <FeatureCard
                        title="Técnico"
                        description="Vive Minecraft de la manera que te gusta y disfruta de la mejor experiencia de Minecraft técnico. Cuenta con una gran comunidad de jugadores, que comparte sus intereses y objetivos. Juega con tus amigos, aprende sobre el mundo de Minecraft y crea tus propias historias."
                        imageSrc="/images/mob-farm.webp"
                        imageAlt="Granja de mobs eficiente con sistema de clasificación automática"
                    />

                    {/* Rest of the content remains the same */}
                    <FeatureCard
                        title="Vanilla"
                        description="No añadimos ninguna modificación o plug-in que altere el juego y lo vuelva menos divertido para las personas que buscan servidores de Minecraft survival sin extras innecesarios. Disfruta de la experiencia pura de Minecraft tal como fue diseñada, con todas las mecánicas originales intactas."
                        imageSrc="/images/cama.webp"
                        imageAlt="Base acogedora con cama en Minecraft mostrando el estilo vanilla del servidor"
                    />
                    <FeatureCard
                        title="Seguro"
                        description="Juega en un ambiente seguro. Nuestro sistema de backups y protecciones hará que tus construcciones estén seguras a lo largo del tiempo. Además, nuestro servidor está alojado en un servidor de alta velocidad, lo que garantiza que podrás disfrutar de una experiencia de juego sin interrupciones."
                        imageSrc="/images/jungla.webp"
                        imageAlt="Bioma de jungla protegido con sistemas de seguridad para construcciones"
                    />
                </section>

                {/* Community section - New addition */}
                <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 rounded-3xl bg-gradient-to-br from-neutral-50/50 via-neutral-100/50 to-neutral-50/50 dark:from-neutral-900/50 dark:via-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative overflow-hidden" aria-labelledby="community-heading">
                    <motion.div
                        className="text-center mb-10 md:mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "linear" }}
                        viewport={{ once: true }}
                    >
                        <h2 id="community-heading" className="text-3xl font-bold mb-4">Una comunidad activa y colaborativa</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Únete a cientos de jugadores apasionados por el Minecraft técnico,
                            comparte conocimientos y participa en proyectos comunitarios.
                        </p>
                    </motion.div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-4xl mx-auto">
                        <motion.div
                            className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">100+</div>
                            <p className="text-muted-foreground">Jugadores activos</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">50+</div>
                            <p className="text-muted-foreground">Proyectos técnicos</p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl p-6 md:p-8 text-center bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <div className="text-4xl font-bold mb-2 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent">24/7</div>
                            <p className="text-muted-foreground">Servidor disponible</p>
                        </motion.div>
                    </div>
                </section>

                <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden" aria-labelledby="testimonials-heading">

                    <motion.div
                        className="text-center mb-10 md:mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "linear" }}
                        viewport={{ once: true }}
                    >
                        <h2 id="testimonials-heading" className="text-3xl font-bold mb-4 bg-gradient-to-br from-neutral-950 to-neutral-500 dark:from-white dark:to-neutral-400 bg-clip-text text-transparent inline-block">Lo que dicen nuestros jugadores</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Descubre las experiencias de quienes ya forman parte de nuestra comunidad
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: "linear" }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto px-4 md:px-0"
                    >
                        <div className="bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 rounded-3xl p-8 md:p-10">
                            <TestimonialCard />
                        </div>
                    </motion.div>
                </section>

                {/* FAQ Section - New addition */}
                <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 rounded-3xl bg-gradient-to-br from-neutral-50/50 via-neutral-100/50 to-neutral-50/50 dark:from-neutral-900/50 dark:via-neutral-800/50 dark:to-neutral-900/50 border border-neutral-200/50 dark:border-neutral-800/50 shadow-sm relative overflow-hidden" aria-labelledby="faq-heading">
                    <div className="absolute -left-24 -top-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute -right-24 -bottom-24 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <motion.div
                        className="text-center mb-10 md:mb-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "linear" }}
                        viewport={{ once: true }}
                    >
                        <h2 id="faq-heading" className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Todo lo que necesitas saber para comenzar tu aventura en Cubusfera
                        </p>
                    </motion.div>
                    <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
                        <motion.div
                            className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-semibold mb-3">¿Cómo puedo unirme al servidor?</h3>
                            <p className="text-muted-foreground">
                                Para unirte a Cubusfera, necesitas completar nuestro <Link href="/formulario" className="text-primary hover:underline hover:text-primary/80 transition-colors">formulario de solicitud</Link> y ser aceptado por nuestro equipo.
                                Visita la <Link href="/formulario" className="text-primary hover:underline hover:text-primary/80 transition-colors">sección de Unirse</Link> para más detalles.
                            </p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-semibold mb-3">¿Qué versión de Minecraft necesito?</h3>
                            <p className="text-muted-foreground">
                                Actualmente el servidor funciona en la versión Java {MINECRAFT_VERSION}. Recomendamos usar la versión más reciente para
                                disfrutar de todas las características.
                            </p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-semibold mb-3">¿Qué tipo de proyectos puedo construir?</h3>
                            <p className="text-muted-foreground">
                                En Cubusfera puedes construir todo tipo de proyectos técnicos, desde granjas eficientes hasta
                                complejos sistemas de redstone. Fomentamos la creatividad y la colaboración entre jugadores.
                            </p>
                        </motion.div>
                        <motion.div
                            className="rounded-xl p-6 md:p-8 bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200 dark:border-neutral-800 hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 hover:shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4, ease: "linear" }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-xl font-semibold mb-3">¿Es obligatorio unirse al servidor de Discord?</h3>
                            <p className="text-muted-foreground">
                                Sí, es necesario unirse a nuestro servidor de Discord para formar parte de Cubusfera. Discord es nuestra principal vía de comunicación,
                                donde compartimos anuncios importantes, coordinamos proyectos y creamos una comunidad activa.
                                Puedes unirte a través de <Link href="https://discord.com/invite/7uKEYACErc" className="text-primary hover:underline hover:text-primary/80 transition-colors">este enlace</Link>.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <section className="py-12 md:py-16 lg:py-20 mt-4 md:mt-8 relative overflow-hidden">
                    <CTACard />
                </section>
            </div>
        </Container>
    );
}