"use client"

import * as React from "react"
import { ComputerIcon, MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import Image from "next/image"
import { Button } from "./ui/button"

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
            <button className="hidden md:flex rounded-xl border-[#E5E7EB] dark:border-neutral-800 bg-[#F9FAFB] dark:bg-[#21364A]">
                <div className="relative w-[1.2rem] h-[1.2rem]"></div>
                <span className="sr-only">Cambiar tema</span>
            </button>
        )
    }

    return (
        <Button onClick={() => cycleTheme()} className="aspect-square items-center border-none dark:bg-[#21364A] bg-[#F9FAFB] hover:bg-[#F3F4F6] dark:hover:saturate-150 rounded-xl z-[1] backdrop-blur-md">
            <div className="relative w-[1rem] h-[1rem] mx-auto">
                {theme === 'dark' && (
                    <MoonIcon className="w-4 h-4 flex items-center justify-center text-sm text-[#3B82F6] dark:text-neutral-300" />
                )}
                {theme === 'light' && <SunIcon className="w-4 h-4 flex items-center justify-center text-sm text-[#3B82F6] dark:text-neutral-300" />}
                {theme === 'system' && <ComputerIcon className="w-4 h-4 flex items-center justify-center text-sm text-[#3B82F6] dark:text-neutral-300" />}
            </div>
            <span className="sr-only">Cambiar tema</span>
        </Button>
    )
}