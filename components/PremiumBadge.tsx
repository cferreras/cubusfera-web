import { ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function PremiumBadge() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="text-green-500 ml-1">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </TooltipTrigger>
                <TooltipContent className="text-center">
                    <p className="text-sm font-medium">Cuenta Premium</p>
                    <p className="text-xs text-muted-foreground">(Según lo indicado por el usuario)</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}