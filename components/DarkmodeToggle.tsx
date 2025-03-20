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
            <button className="flex items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none">
                <div className="relative w-[1.2rem] h-[1.2rem]"></div>
                <div></div>
                <span className="sr-only">Cambiar tema</span>
            </button>
        )
    }

    return (
        <button onClick={() => cycleTheme()} className="flex items-center gap-4 px-4 py-5 bg-neutral-100 dark:hover:bg-neutral-700 dark:focus-visible:bg-neutral-700 hover:bg-neutral-200 focus-visible:bg-neutral-300 border border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 rounded-2xl outline-none">
            <div className="relative w-[1.2rem] h-[1.2rem]">
                {theme === 'dark' && <MoonIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
                {theme === 'light' && <SunIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
                {theme === 'system' && <ComputerIcon className="w-4 h-4 flex items-center justify-center text-sm dark:text-neutral-300 text-neutral-700" />}
            </div>
            <div>
                {theme === 'dark' && 'Oscuro'}
                {theme === 'light' && 'Claro'}
                {theme === 'system' && 'Sistema'}
            </div>
            <span className="sr-only">Cambiar tema</span>
        </button>
    )
}