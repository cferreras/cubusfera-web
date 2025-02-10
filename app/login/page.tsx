import CubusferaIconDark from "@/components/icon/cubusfera-icon-dark"
import CubusferaIconLight from "@/components/icon/cubusfera-icon-light"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default async function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
        <CubusferaIconDark className="hidden h-9 w-auto dark:block" />
        <CubusferaIconLight className="block h-9 w-auto dark:hidden" />
          Cubusfera
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
