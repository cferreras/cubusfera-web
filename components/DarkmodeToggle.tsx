"use client"

import * as React from "react"
import { ComputerIcon, Moon, MoonIcon, Sun, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DarkmodeToggle() {
    const { setTheme } = useTheme()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => setTheme("light")}>
                    <SunIcon className="h-4 w-4"/>
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => setTheme("dark")}>
                    <MoonIcon className="h-4 w-4"/>
                    Oscuro
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-x-2" onClick={() => setTheme("system")}>
                    <ComputerIcon className="h-4 w-4"/>
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}