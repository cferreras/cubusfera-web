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
            <Button className="aspect-square items-center border-none dark:bg-[#21364A] !bg-gray-100 hover:saturate-150 rounded-xl z-[1]">
                <div className="relative w-[1rem] h-[1rem] mx-auto">
                <ComputerIcon className="w-4 h-4 flex items-center justify-center text-sm text-black dark:text-white" />
                </div>
                <span className="sr-only">Cambiar tema</span>
            </Button>
        )
    }

    return (
        <Button onClick={() => cycleTheme()} className="aspect-square items-center border-none bg-gray-100 hover:bg-gray-100 dark:bg-[#21364A] hover:saturate-150 rounded-xl z-[1]">
            <div className="relative w-[1rem] h-[1rem] mx-auto">
                {theme === 'dark' && (
                    <MoonIcon className="w-4 h-4 flex items-center justify-center text-sm text-black dark:text-white" />
                )}
                {theme === 'light' && <SunIcon className="w-4 h-4 flex items-center justify-center text-sm text-black dark:text-white" />}
                {theme === 'system' && <ComputerIcon className="w-4 h-4 flex items-center justify-center text-sm text-black dark:text-white" />}
            </div>
            <span className="sr-only">Cambiar tema</span>
        </Button>
    )
}