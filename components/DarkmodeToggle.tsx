"use client"

import * as React from "react"
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

export default function DarkmodeToggle() {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    const cycleTheme = () => {
        if (theme === 'system') {
            setTheme('dark')
        } else if (theme === 'dark') {
            setTheme('light')
        } else {
            setTheme('system')
        }
    }

    if (!mounted) {
        return (
            <button className="hidden md:flex rounded-xl border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
                <div className="relative w-[1.2rem] h-[1.2rem]"></div>

                <span className="sr-only">Cambiar tema</span>
            </button>
        )
    }

    return (
        <button onClick={() => cycleTheme()} className="flex h-12 items-center border dark:border-neutral-700 backdrop-blur-sm hover:bg-white/5 rounded-xl z-[1] w-12">
            <div className="relative w-[1rem] h-[1rem] mx-auto">
                {theme === 'dark' && <MoonIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
                {theme === 'light' && <SunIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
                {theme === 'system' && <ComputerIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
            </div>
            <span className="sr-only">Cambiar tema</span>
        </button>
    )
}