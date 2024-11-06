import Container from "@/components/Container";
import TheHeader from "@/components/TheHeader";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'Inicio – Cubusfera',
  description: 'Tienda del servidor de Minecraft Cubusfera',
}
export default function Home() {
  return (
    <>
      <TheHeader />
      <Container>
        <article className="flex-col md:flex-row flex gap-12 m-4">
          <div className="flex flex-col space-y-2  justify-center">
            <h4 className="font-bold text-indigo-500  text-3xl md:text-5xl md:text-right">Técnico</h4>
            <div className="text-lg md:text-xl text-gray-700 md:text-right">
              Vive Minecraft de la manera que te gusta y disfruta de la mejor experiencia de Minecraft técnico.
              Cuenta con una gran comunidad de jugadores, que comparte sus intereses y objetivos.
              Juega con tus amigos, aprende sobre el mundo de Minecraft y crea tus propias historias.
            </div>
          </div>
          <img className="order-first w-full object-cover aspect-[827/640] mt-4 md:mt-0 md:w-1/3 rounded-xl" src="/images/mob-farm.webp" />
        </article>
        <article className="flex-col md:flex-row flex gap-12 m-4">
          <img className="md:order-last order-first w-full object-cover aspect-[827/640] mt-4 md:mt-0 md:w-1/3 rounded-xl" src="/images/cama.webp" />
          <div className="flex flex-col space-y-2  justify-center">
            <h4 className="font-bold text-indigo-500  text-3xl md:text-5xl">Vanilla</h4>
            <div className="text-lg md:text-xl text-gray-700">
            No añadimos ninguna modificación o plug-in que altere el juego y lo vuelva menos divertido para las personas que buscan servidores de Minecraft survival sin extras innecesarios.
            </div>
          </div>
        </article>
        <article className="flex-col md:flex-row flex gap-12 m-4">
          <div className="flex flex-col space-y-2  justify-center">
            <h4 className="font-bold text-indigo-500  text-3xl md:text-5xl md:text-right">Seguro</h4>
            <div className="text-lg md:text-xl text-gray-700 md:text-right mb-4 md:mb-0">
              Juega en un ambiente seguro. Nuestro sistema de backups y protecciones hará que tus construcciones estén seguras a lo largo del tiempo. Ademas, nuestro servidor está alojado en un servidor de alta velocidad, lo que garantiza que podras disfrutar de una experiencia de juego sin interrupciones.
            </div>
          </div>
          <img className="order-first w-full object-cover aspect-[827/640] mt-4 md:mt-0 md:w-1/3 rounded-xl" src="/images/jungla.webp" />
        </article>
        <div className="mx-4 bg-indigo-600 h-64 rounded-xl mt-10 mb-5 text-white text-center space-y-8 p-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center pt-10">Comienza a jugar ahora</h2>
          <a href="https://discord.com/invite/7uKEYACErc"
            className="inline-flex items-center justify-center px-8 py-3 font-medium text-gray-900 bg-white border border-transparent rounded-md hover:bg-white/90 md:py-4 text-sm md:text-lg md:px-10">
            <svg className="w-6 h-6 mr-2 -ml-2" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" /></svg>
            Aplica en Discord
          </a>
        </div>
      </Container>
    </>
  );
}
