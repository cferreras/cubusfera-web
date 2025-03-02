import CubusferaIconDark from "@/components/icon/cubusfera-icon-dark"
import CubusferaIconLight from "@/components/icon/cubusfera-icon-light"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"
import { Suspense } from 'react';
import Container from "@/components/Container";

function LoginContent() {
  return (
    <Container>
      <div className="flex min-h-[80vh] items-center justify-center">
        <div className="w-full max-w-md rounded-3xl bg-white dark:bg-neutral-950 p-8 border border-neutral-200 dark:border-neutral-800">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <Link href="/" className="flex justify-center mb-4">
                <CubusferaIconDark className="hidden h-12 w-auto dark:block" />
                <CubusferaIconLight className="block h-12 w-auto dark:hidden" />
              </Link>
              <h1 className="text-2xl font-semibold mb-1 text-neutral-900 dark:text-white">Bienvenido de nuevo</h1>
              <p className="text-neutral-600 dark:text-neutral-400">Inicia sesión con tu cuenta de Discord</p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </Container>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
