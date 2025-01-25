import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Ícono de Discord
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Lexend } from "next/font/google";
import Navbar from "@/components/Navbar";
const lexend = Lexend({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Inicio – Cubusfera',
  description: 'Cubusfera es un servidor de Minecraft técnico y vanilla en español, ofreciendo una experiencia de juego vanilla con características técnicas para los amantes de los desafíos y las construcciones avanzadas.',
};

export default function Home() {
  return (
    <>
      <body className={`bg-fixed min-h-screen grid grid-rows-[auto_1fr_auto] ${lexend.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>
            <TheHeader />
            <Container className="py-9 space-y-12">
              {/* Sección Técnico */}
              <Card className="bg-transparent border-none shadow-none">
                <article className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex flex-col space-y-4 md:w-2/3">
                    <CardTitle className="font-bold text-3xl md:text-5xl text-right">
                      Técnico
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl opacity-95 text-right">
                      Vive Minecraft de la manera que te gusta y disfruta de la mejor experiencia de Minecraft técnico.
                      Cuenta con una gran comunidad de jugadores, que comparte sus intereses y objetivos.
                      Juega con tus amigos, aprende sobre el mundo de Minecraft y crea tus propias historias.
                    </CardDescription>
                  </div>
                  <img
                    className="w-full md:w-1/3 object-cover aspect-[827/640] border rounded-xl"
                    src="/images/mob-farm.webp"
                    alt="Granja de mobs"
                  />
                </article>
              </Card>

              {/* Sección Vanilla */}
              <Card className="bg-transparent border-none shadow-none">
                <article className="flex flex-col md:flex-row gap-12 items-center">
                  <img
                    className="w-full md:w-1/3 object-cover aspect-[827/640] border rounded-xl"
                    src="/images/cama.webp"
                    alt="Cama en Minecraft"
                  />
                  <div className="flex flex-col space-y-4 md:w-2/3">
                    <CardTitle className="font-bold text-3xl md:text-5xl">
                      Vanilla
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl opacity-95">
                      No añadimos ninguna modificación o plug-in que altere el juego y lo vuelva menos divertido para las personas que buscan servidores de Minecraft survival sin extras innecesarios.
                    </CardDescription>
                  </div>
                </article>
              </Card>

              {/* Sección Seguro */}
              <Card className="bg-transparent border-none shadow-none">
                <article className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex flex-col space-y-4 md:w-2/3">
                    <CardTitle className="font-bold text-3xl md:text-5xl text-right">
                      Seguro
                    </CardTitle>
                    <CardDescription className="text-lg md:text-xl opacity-95 text-right">
                      Juega en un ambiente seguro. Nuestro sistema de backups y protecciones hará que tus construcciones estén seguras a lo largo del tiempo. Además, nuestro servidor está alojado en un servidor de alta velocidad, lo que garantiza que podrás disfrutar de una experiencia de juego sin interrupciones.
                    </CardDescription>
                  </div>
                  <img
                    className="w-full md:w-1/3 object-cover aspect-[827/640] border rounded-xl"
                    src="/images/jungla.webp"
                    alt="Bioma de jungla"
                  />
                </article>
              </Card>

              {/* Llamada a la acción */}
              <Card className="bg-indigo-600 dark:bg-indigo-700 text-center py-16 rounded-xl mt-8">
                <CardHeader className="space-y-8">
                  <CardTitle className="text-3xl md:text-5xl font-bold text-white">
                    Comienza a jugar ahora
                  </CardTitle>
                  <div className="mt-5 sm:mt-8">
                    <Button
                      asChild
                      className="bg-white hover:bg-gray-100 text-black font-medium text-lg px-4 py-6 rounded-md"
                    >
                      <a href="https://discord.com/invite/7uKEYACErc">
                        <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" /></svg>
                        Aplica en Discord
                      </a>
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            </Container>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </>
  );
}