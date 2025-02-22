"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Cross, MenuIcon } from "lucide-react"
import UserDropdownMenu from "./UserDropdownMenu"
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useState, useEffect, useRef } from "react"

interface UserMenuButtonProps {
    discordUser: string
    discordAvatar: string
    email: string
}

export default function UserMenuButton({ discordUser, discordAvatar, email }: UserMenuButtonProps) {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={dropdownRef} className="h-12 items-center gap-4 border dark:border-neutral-700 backdrop-blur-sm hover:bg-white/5 rounded-xl z-[1]">
            <div className="h-full flex grow items-center">
                <Button 
                    variant="ghost" 
                    className="min-w-20 flex grow items-center justify-center gap-3 px-4 h-full"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <Avatar className="w-6 h-6 flex rounded-full shrink-0">
                        <AvatarImage
                            src={discordAvatar}
                            alt="Avatar del usuario"
                            className="rounded-full object-cover"
                        />
                        <AvatarFallback className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-bold">
                            {discordUser[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    {!isOpen ? <HamburgerMenuIcon className="w-4 h-4 items-center justify-center" /> :
                    <Cross1Icon className="w-4 h-4 items-center justify-center" />}
                </Button>
                <UserDropdownMenu 
                    discordUser={discordUser}
                    discordAvatar={discordAvatar}
                    email={email}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                />
            </div>
        </div>
    )
}