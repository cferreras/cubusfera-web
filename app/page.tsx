import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Ícono de Discord
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { FileIcon } from "lucide-react";
const lexend = Lexend({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'Inicio – Cubusfera',
  description: 'Cubusfera es un servidor de Minecraft técnico y vanilla en español...',
  other: {
    'og:type': 'website',
    'og:url': 'cubusfera.com',
    'og:image': 'cubusfera.com/images/og-image.png',
    'og:image:alt': 'Cubusfera',
    'og:title': 'Inicio – Cubusfera',
    'og:description': 'Cubusfera es un servidor de Minecraft técnico y vanilla en español, ofreciendo una experiencia de juego vanilla con características técnicas para los amantes de los desafíos y las construcciones avanzadas.',
  },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="w-full h-screen absolute left-0 top-0 z-[-1] pointer-events-none" data-pattern="diamonds">
          <div className="w-full h-full absolute left-0 bottom-0 z-10 bg-gradient-to-t from-white to-neutral-white/0 dark:from-neutral-950 dark:to-neutral-950/0 pointer-events-none"></div>
        </div>
        <TheHeader />
        <Container className="py-9 space-y-12">
          <Card className="bg-transparent border-none shadow-none">
            <article className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex flex-col space-y-4 md:w-2/3">
                <CardTitle className="font-bold text-3xl md:text-5xl text-right">
                  Técnico
                </CardTitle>
                <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-700 text-right">
                  Vive Minecraft de la manera que te gusta y disfruta de la mejor experiencia de Minecraft técnico.
                  Cuenta con una gran comunidad de jugadores, que comparte sus intereses y objetivos.
                  Juega con tus amigos, aprende sobre el mundo de Minecraft y crea tus propias historias.
                </CardDescription>
              </div>
              <img
                className="w-full md:w-1/3 object-cover aspect-[827/640] border dark:border-neutral-800 rounded-2xl"
                src="/images/mob-farm.webp"
                alt="Granja de mobs"
              />
            </article>
          </Card>
  
          <Card className="bg-transparent border-none shadow-none">
            <article className="flex flex-col md:flex-row gap-12 items-center">
              <img
                className="w-full md:w-1/3 object-cover aspect-[827/640] border dark:border-neutral-800 rounded-2xl"
                src="/images/cama.webp"
                alt="Cama en Minecraft"
              />
              <div className="flex flex-col space-y-4 md:w-2/3">
                <CardTitle className="font-bold text-3xl md:text-5xl">
                  Vanilla
                </CardTitle>
                <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-800">
                  No añadimos ninguna modificación o plug-in que altere el juego y lo vuelva menos divertido para las personas que buscan servidores de Minecraft survival sin extras innecesarios.
                </CardDescription>
              </div>
            </article>
          </Card>
  
          <Card className="bg-transparent border-none shadow-none">
            <article className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex flex-col space-y-4 md:w-2/3">
                <CardTitle className="font-bold text-3xl md:text-5xl text-right">
                  Seguro
                </CardTitle>
                <CardDescription className="text-lg md:text-xl dark:text-neutral-300 text-neutral-800 text-right">
                  Juega en un ambiente seguro. Nuestro sistema de backups y protecciones hará que tus construcciones estén seguras a lo largo del tiempo. Además, nuestro servidor está alojado en un servidor de alta velocidad, lo que garantiza que podrás disfrutar de una experiencia de juego sin interrupciones.
                </CardDescription>
              </div>
              <img
                className="w-full md:w-1/3 object-cover aspect-[827/640] border dark:border-neutral-800 rounded-2xl"
                src="/images/jungla.webp"
                alt="Bioma de jungla"
              />
            </article>
          </Card>
  <Card className="flex flex-col md:flex-row gap-4 justify-between items-center md:p-16 p-8 bg-neutral-900 dark:border-neutral-800 rounded-3xl mt-8">
            <div className="flex flex-col gap-4 justify-start">
              <div className="text-3xl md:text-5xl font-bold text-white">
                Comienza a jugar ahora
              </div>
              <div className="text-white opacity-75 text-xl">
                Disfruta de una experiencia en Minecraft sin igual.
              </div>
            </div>
            <Button
              asChild
              variant="secondary"
              className="h-14 px-5 bg-white hover:bg-neutral-200 disabled:bg-neutral-400 text-base text-black rounded-lg enabled:cursor-pointer"
            >
              <Link href="/formulario" className="flex items-center gap-x-2">
                <FileIcon className="h-5 w-5" />
                <span>Aplica a Cubusfera</span>
              </Link>
            </Button>
          </Card>
  
        </Container>
      </main>
      <Footer />
    </>
  );
}