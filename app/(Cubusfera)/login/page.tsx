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
        <div className="w-full max-w-md rounded-3xl bg-neutral-950 p-8 border border-neutral-800">
          <div className="flex flex-col items-center gap-6">
            <div className="text-center">
              <Link href="/" className="flex justify-center mb-4">
                <CubusferaIconDark className="h-12 w-auto" />
              </Link>
              <h1 className="text-2xl font-semibold mb-1">Bienvenido de nuevo</h1>
              <p className="text-neutral-400">Inicia sesión con tu cuenta de Discord</p>
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
