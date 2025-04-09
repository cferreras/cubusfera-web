"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface VipBadgeProps {
    size?: "sm" | "md";
}

export default function VipBadge({ size = "md" }: VipBadgeProps) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className={`text-xs px-2 py-0.5 rounded-full bg-yellow-200 dark:bg-yellow-500 dark:[filter:drop-shadow(0_0_0.5rem_currentColor)] [filter:drop-shadow(0_0_0.5rem_theme(colors.yellow.400))] text-yellow-800 font-medium ${size === "sm" ? "text-[10px]" : "text-xs"}`}>
                        VIP
                    </span>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Usuario VIP</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}