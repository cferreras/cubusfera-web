import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default async function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-amber-100 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
        <img className="block h-9 w-auto" src="/cubusfera-logo.png" alt="Cubusfera" />
          Cubusfera
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
