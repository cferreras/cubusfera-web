import { ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export default function AdminBadge() {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <div className="inline-flex items-center justify-center w-5 h-5 text-green-500 ml-1">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p className="text-sm">Administrador</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}