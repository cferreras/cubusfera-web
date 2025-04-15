"use client";

import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTACard from "@/components/CTACard";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
    return (
        <>
            <Container>
                {/* TheHeader now contains all header content with a single h1 */}
                <TheHeader />
                <div className="space-y-24 md:space-y-32">
                    {/* Features section with semantic HTML */}
                    <section className="space-y-24 md:space-y-32" aria-labelledby="features-heading">
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
                    <section className="py-16 md:py-24" aria-labelledby="community-heading">
                        <motion.div 
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2 id="community-heading" className="text-3xl font-bold mb-4">Una comunidad activa y colaborativa</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Únete a cientos de jugadores apasionados por el Minecraft técnico,
                                comparte conocimientos y participa en proyectos comunitarios.
                            </p>
                        </motion.div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div 
                                className="bg-card rounded-xl p-6 text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold mb-2">100+</div>
                                <p className="text-muted-foreground">Jugadores activos</p>
                            </motion.div>
                            <motion.div 
                                className="bg-card rounded-xl p-6 text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold mb-2">50+</div>
                                <p className="text-muted-foreground">Proyectos técnicos</p>
                            </motion.div>
                            <motion.div 
                                className="bg-card rounded-xl p-6 text-center"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl font-bold mb-2">24/7</div>
                                <p className="text-muted-foreground">Servidor disponible</p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="relative py-16 md:py-24" aria-labelledby="testimonials-heading">
                        <div className="absolute inset-0 via-neutral-100/10 to-transparent dark:via-neutral-900/10 -z-10" />
                        <motion.h2 
                            id="testimonials-heading" 
                            className="text-3xl font-bold text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            Lo que dicen nuestros jugadores
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            <TestimonialCard />
                        </motion.div>
                    </section>

                    {/* FAQ Section - New addition */}
                    <section className="py-16 md:py-24" aria-labelledby="faq-heading">
                        <motion.div 
                            className="text-center mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7 }}
                            viewport={{ once: true }}
                        >
                            <h2 id="faq-heading" className="text-3xl font-bold mb-4">Preguntas frecuentes</h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Todo lo que necesitas saber para comenzar tu aventura en Cubusfera
                            </p>
                        </motion.div>
                        <div className="max-w-3xl mx-auto space-y-6">
                            <motion.div 
                                className="bg-card rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold mb-2">¿Cómo puedo unirme al servidor?</h3>
                                <p className="text-muted-foreground">
                                    Para unirte a Cubusfera, necesitas completar nuestro <Link href="/formulario" className="text-primary hover:underline">formulario de solicitud</Link> y ser aceptado por nuestro equipo. 
                                    Visita la <Link href="/formulario" className="text-primary hover:underline">sección de Unirse</Link> para más detalles.
                                </p>
                            </motion.div>
                            <motion.div 
                                className="bg-card rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold mb-2">¿Qué versión de Minecraft necesito?</h3>
                                <p className="text-muted-foreground">
                                    Actualmente el servidor funciona en la versión Java 1.21.4. Recomendamos usar la versión más reciente para
                                    disfrutar de todas las características.
                                </p>
                            </motion.div>
                            <motion.div 
                                className="bg-card rounded-xl p-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                <h3 className="text-xl font-semibold mb-2">¿Qué tipo de proyectos puedo construir?</h3>
                                <p className="text-muted-foreground">
                                    En Cubusfera puedes construir todo tipo de proyectos técnicos, desde granjas eficientes hasta
                                    complejos sistemas de redstone. Fomentamos la creatividad y la colaboración entre jugadores.
                                </p>
                            </motion.div>
                        </div>
                    </section>

                    <section className="py-16 md:py-24">
                        <CTACard />
                    </section>
                </div>

                <motion.section 
                    className="py-16 md:py-24 border-t dark:border-neutral-800 border-neutral-200"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-2xl font-semibold mb-4">Sobre Cubusfera - Servidor de Minecraft Técnico</h2>
                        <div className="prose dark:prose-invert max-w-none">
                            <p>
                                Cubusfera es un servidor de Minecraft técnico en español dedicado a jugadores que disfrutan
                                explorando las mecánicas avanzadas del juego. Nos especializamos en redstone, granjas eficientes,
                                y sistemas automatizados, todo dentro de un entorno vanilla amigable y colaborativo.
                            </p>
                            <p>
                                Nuestra comunidad está formada por jugadores apasionados que comparten conocimientos,
                                colaboran en proyectos y disfrutan juntos del aspecto más técnico de Minecraft. Desde
                                principiantes curiosos hasta expertos en redstone, todos son bienvenidos a aprender y crecer.
                            </p>
                            <p>
                                Si buscas un servidor de Minecraft técnico en español con una comunidad activa,
                                proyectos interesantes y un ambiente seguro, Cubusfera es tu lugar. ¡Únete a nosotros
                                y lleva tus habilidades de Minecraft al siguiente nivel!
                            </p>
                        </div>
                    </div>
                </motion.section>
            </Container>
        </>
    );
}