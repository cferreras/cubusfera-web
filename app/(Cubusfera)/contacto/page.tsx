import Container from '@/components/Container'

export default function ContactPage() {
  return (
    <Container className="py-20">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="text-6xl">Contacto</div>
          <p className='text-lg text-muted-foreground'>¿Tienes alguna pregunta o idea? ¡Contáctanos!</p>
        </div>
        <p className="text-xl text-muted-foreground mb-2">
                Forma parte de nuestra comunidad en Discord donde podrás hacer preguntas,
                compartir ideas y mantenerte al día con las últimas novedades.
              </p>

              <a 
                href="https://discord.com/invite/7uKEYACErc" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#5865F2] text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-[#4752C4] transition-all hover:scale-105 dark:bg-[#5865F2]/90 dark:hover:bg-[#4752C4]/90"
              >
                Unirse al servidor de Discord
                <span className="text-2xl ml-auto">→</span>
              </a>


      </div>
    </Container>
  )
}