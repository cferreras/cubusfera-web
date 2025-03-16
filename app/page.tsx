import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import { Metadata } from "next";
import FeatureCard from "@/components/FeatureCard";
import TestimonialCard from "@/components/TestimonialCard";
import CTACard from "@/components/CTACard";

export const metadata: Metadata = {
  title: 'Inicio – Cubusfera',
  description: 'Cubusfera es un servidor de Minecraft técnico y vanilla en español...',
  other: {
    'og:type': 'website',
    'og:url': 'cubusfera.com',
    // 'og:image': 'cubusfera.com/images/og-image.png',
    'og:image:alt': 'Cubusfera',
    'og:title': 'Inicio – Cubusfera',
    'og:description': 'Cubusfera es un servidor de Minecraft técnico y vanilla en español, ofreciendo una experiencia de juego vanilla con características técnicas para los amantes de los desafíos y las construcciones avanzadas.',
  },
};

export default function Home() {
  return (
    <>

        <TheHeader />
        <Container className="py-16 md:py-24">
            <div className="space-y-24 md:space-y-32">
                <section className="space-y-24 md:space-y-32">
                    <FeatureCard
                        title="Técnico"
                        description="Vive Minecraft de la manera que te gusta y disfruta de la mejor experiencia de Minecraft técnico. Cuenta con una gran comunidad de jugadores, que comparte sus intereses y objetivos. Juega con tus amigos, aprende sobre el mundo de Minecraft y crea tus propias historias."
                        imageSrc="/images/mob-farm.webp"
                        imageAlt="Granja de mobs"
                    />
                    <FeatureCard
                        title="Vanilla"
                        description="No añadimos ninguna modificación o plug-in que altere el juego y lo vuelva menos divertido para las personas que buscan servidores de Minecraft survival sin extras innecesarios."
                        imageSrc="/images/cama.webp"
                        imageAlt="Cama en Minecraft"
                    />
                    <FeatureCard
                        title="Seguro"
                        description="Juega en un ambiente seguro. Nuestro sistema de backups y protecciones hará que tus construcciones estén seguras a lo largo del tiempo. Además, nuestro servidor está alojado en un servidor de alta velocidad, lo que garantiza que podrás disfrutar de una experiencia de juego sin interrupciones."
                        imageSrc="/images/jungla.webp"
                        imageAlt="Bioma de jungla"
                    />
                </section>

                <section className="relative py-16 md:py-24">
                    <div className="absolute inset-0 via-neutral-100/10 to-transparent dark:via-neutral-900/10 -z-10" />
                    <TestimonialCard />
                </section>

                <section className="py-16 md:py-24">
                    <CTACard />
                </section>
            </div>
        </Container>
    </>
  );
}