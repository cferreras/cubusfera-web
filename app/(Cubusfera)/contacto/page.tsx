import Container from '@/components/Container'
import { MapPinIcon } from 'lucide-react'
import { FaDiscord, FaEnvelope } from 'react-icons/fa6'

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">Contacto</h1>
            <p className='text-lg text-muted-foreground'>¿Tienes alguna pregunta o idea? ¡Contáctanos!</p>
          </div>
          
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 md:p-8 rounded-xl border border-neutral-200 dark:border-neutral-800 mb-8">
            <p className="text-xl text-muted-foreground mb-6">
              Forma parte de nuestra comunidad en Discord donde podrás hacer preguntas,
              compartir ideas y mantenerte al día con las últimas novedades.
            </p>

            <a 
              href="https://discord.com/invite/7uKEYACErc" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full sm:w-auto sm:min-w-[300px] gap-2 bg-[#5865F2] text-white px-6 py-3 rounded-xl font-medium text-lg hover:bg-[#4752C4] transition-all hover:scale-[1.02] dark:bg-[#5865F2]/90 dark:hover:bg-[#4752C4]/90"
            >
              Unirse al servidor de Discord
              <FaDiscord className="w-6 h-6" />
            </a>
          </div>
          
          {/* Información adicional de contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
                  <FaEnvelope className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-2">Correo electrónico</h2>
                  <p className="text-muted-foreground mb-3">Para consultas generales y soporte</p>
                  <a href="mailto:contacto@cubusfera.com" className="text-blue-600 dark:text-blue-400 hover:underline">
                    contacto@cubusfera.com
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
              <div className="flex items-start gap-4">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-lg">
                  <MapPinIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h2 className="text-xl font-medium mb-2">Servidor de Minecraft</h2>
                  <p className="text-muted-foreground mb-3">Dirección para conectarte al servidor</p>
                  <p className="font-mono bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-md inline-block">
                    play.cubusfera.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preguntas frecuentes */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Preguntas frecuentes</h2>
            <div className="space-y-4">
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-medium mb-2">¿Cuánto tiempo tardan en responder?</h3>
                <p className="text-muted-foreground">Normalmente respondemos a todas las consultas en un plazo de 24-48 horas. Para una respuesta más rápida, te recomendamos unirte a nuestro servidor de Discord.</p>
              </div>
              
              <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-medium mb-2">¿Cómo puedo reportar un problema en el servidor?</h3>
                <p className="text-muted-foreground">Puedes reportar problemas directamente en nuestro servidor de Discord en el canal #reportes, o enviarnos un correo electrónico detallando el problema que has encontrado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}