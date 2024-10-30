
import { Column } from "@tanstack/react-table"

import { cn } from "@/lib/utils"

import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>
    title: string
    icon: React.ReactNode
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    icon,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>
    }

    return (
        <div className={cn("flex items-center space-x-2 group text-gray-700", className)}>

            {title !== "Registrado" ?
                <Button
                    variant="ghost"
                    className="px-0 hover:bg-trasparent "
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {icon} {title}
                    <ArrowUpDown className="ml-2 h-4 w-4 group-hover:bg-none group-hover:text-black rounded-sm" />
                </Button>
                :
                <Button
                    variant="ghost"
                    className="px-0 hover:bg-trasparent "

                >
                    {icon} {title}
                    
                </Button>}
        </div>
    )
}
