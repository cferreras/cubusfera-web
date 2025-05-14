"use client";
import { useState } from "react";
import { Crown, Sparkles, Star, Trophy, Gem } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTrigger,
  DialogTitle
} from "@/components/ui/dialog";

interface VipBadgeProps {
  size?: "sm" | "md" | "lg";
  theme?: string;
  username?: string;
}

export default function VipBadge({
  theme = "default",
  username = ""
}: VipBadgeProps) {
  const [isOpen, setIsOpen] = useState(false);


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="text-xs px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700 flex items-center gap-1">
          <Crown className="h-3 w-3" />
          <span>VIP</span>
        </div>
      </DialogTrigger>

      <DialogPortal>

        <DialogContent className="fixed inset-0 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-transparent border-none shadow-none p-0 w-full max-w-4xl max-h-[90vh] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95">
          <DialogTitle className="sr-only">Beneficios VIP</DialogTitle>

          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-800 relative">
            {/* Eliminamos el botón de cierre personalizado ya que DialogContent ya incluye uno */}

            {/* Encabezado con gradiente - Mejorado espaciado vertical y centrado */}
            <div className="h-40 sm:h-48 bg-gradient-to-r from-amber-300 to-yellow-400 dark:from-yellow-600 dark:to-amber-700 text-neutral-800 dark:text-white flex items-center justify-center relative py-8">
              <div className="absolute inset-0 bg-[url('/images/pattern-vip.png')] opacity-10 bg-repeat"></div>
              <div className="flex flex-col items-center justify-center gap-3 p-4">
                <div className="flex items-center gap-3">
                  <Crown className="w-9 h-9 drop-shadow-md" />
                  <h2 className="text-2xl sm:text-3xl font-bold dark:text-white">Beneficios VIP</h2>
                </div>
                <p className="text-center max-w-lg dark:text-white font-medium drop-shadow-sm">Descubre todas las ventajas exclusivas para miembros VIP</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Información del usuario */}
              {username && (
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 rounded-sm ring-4 border-yellow-400 dark:border-yellow-500 shadow-lg">
                      <AvatarImage src={`https://mc-heads.net/avatar/${username}/128`} alt={`Avatar de ${username}`} />
                      <AvatarFallback className="rounded-sm">{username[0] || ''}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{username}</h3>
                        <Crown className="w-6 h-6 text-yellow-600" />
                      </div>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">Miembro VIP desde 2023</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Secciones de beneficios */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Beneficios en la web */}
                <Card className="border-2 border-blue-400 dark:border-blue-600 rounded-xl overflow-hidden">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900/30">
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-500" />
                      Beneficios en la Web
                    </CardTitle>
                    <CardDescription>Ventajas exclusivas en nuestra plataforma</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                        <Star className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Perfil personalizado</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Personaliza tu perfil con banners, colores y temas exclusivos</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                        <Crown className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Insignia VIP</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Muestra tu estatus con una insignia exclusiva en tu perfil y comentarios</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-1.5 rounded-full">
                        <Trophy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Acceso anticipado</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Sé el primero en acceder a nuevas funciones y contenidos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Beneficios en el servidor */}
                <Card className="border-2 border-emerald-400 dark:border-emerald-600 rounded-xl overflow-hidden">
                  <CardHeader className="bg-emerald-50 dark:bg-emerald-900/30">
                    <CardTitle className="flex items-center gap-2">
                      <Gem className="w-5 h-5 text-emerald-500" />
                      Beneficios en Minecraft
                    </CardTitle>
                    <CardDescription>Ventajas exclusivas en nuestro servidor</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full">
                        <Star className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Slots reservados</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Acceso garantizado incluso cuando el servidor está lleno</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full">
                        <Crown className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Comandos exclusivos</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Acceso a comandos especiales como /nick, más funcionalidades próximamente.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-full">
                        <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">Eventos VIP</h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">Participa en eventos exclusivos con premios especiales</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Nueva sección: Beneficios en Discord */}
                <Card className="md:col-span-2 border-2 border-indigo-400 dark:border-indigo-600 rounded-xl overflow-hidden">
                  <CardHeader className="bg-indigo-50 dark:bg-indigo-900/30">
                    <CardTitle className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                      </svg>
                      Beneficios en Discord
                    </CardTitle>
                    <CardDescription>Ventajas exclusivas en nuestro servidor de Discord</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                          <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Rol VIP exclusivo</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Insignia VIP visible en Discord con un color distintivo</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                          <Star className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Canales exclusivos</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Acceso a canales privados solo para miembros VIP</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                          <Crown className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Prioridad de soporte</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Atención prioritaria en canales de soporte y ayuda</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="mt-1 bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-full">
                          <Trophy className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Bots exclusivos</h4>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">Acceso a comandos y funciones especiales de bots</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sección de cómo obtener VIP - Texto centrado y sin sombras */}
              <div className="mt-6 border-2 border-amber-400 dark:border-amber-600 rounded-xl overflow-hidden">
                <div className="bg-amber-50 dark:bg-amber-900/30 p-4">
                  <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
                    <Crown className="w-5 h-5 text-amber-500" />
                    ¿Cómo obtener VIP?
                  </h3>
                </div>
                <div className="p-6 text-center">
                  <p className="mb-4 max-w-2xl mx-auto">Únete a nuestro programa VIP y disfruta de todas estas ventajas exclusivas. Puedes adquirir tu membresía VIP desde nuestra tienda.</p>
                  <a
                    href="https://cubusfera.tebex.io/category/1704918"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium text-base transition-colors duration-200"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Obtener VIP
                  </a>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}