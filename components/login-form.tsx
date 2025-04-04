"use client"
import { useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { signInWithDiscord } from '@/app/actions';
import { cn } from '@/lib/utils';

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const searchParams = useSearchParams();
  const next = searchParams?.get('next');
  
  return (
    <div className={cn("w-full", className)} {...props}>
      <form>
        <Button
          variant="outline"
          className="w-full gap-2 bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-600 py-6 text-neutral-900 dark:text-white"
          formAction={() => signInWithDiscord(next || undefined)}
        >
          <svg className="-ml-0.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="currentColor" d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.1.1 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.1 16.1 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02M8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12m6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12" />
          </svg>
          Iniciar sesión con Discord
        </Button>
      </form>
      <div className="mt-6 text-center text-xs text-neutral-600 dark:text-neutral-400">
        Al continuar, aceptas nuestros{" "}
        <a href="legal/privacidad" className="underline hover:text-neutral-900 dark:hover:text-neutral-200">Términos de Servicio</a>{" "}
        y{" "}
        <a href="legal/terminos" className="underline hover:text-neutral-900 dark:hover:text-neutral-200">Política de Privacidad</a>.
      </div>
    </div>
  );
}