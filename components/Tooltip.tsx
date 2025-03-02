import { ReactNode } from 'react';

interface TooltipProps {
    children: ReactNode;
    text: string;
    position: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({ children, text, position }: TooltipProps) {
    return (
        <div className="relative group h-max">
            {children}

            {position === "bottom" && (<span className=" max-w-[200px] text-pretty text-center 
            z-10 w-max transition-opacity opacity-0 
            absolute shadow-lg  group-hover:opacity-100 
            bg-gray-900 text-white px-3 py-[6px] text-[13px] 
            left-1/2 transform -translate-x-1/2 mx-auto translate-y-4
            rounded before:w-4 before:h-4 before:rotate-45 before:bg-gray-900
            before:absolute before:z-[-1] before:-top-1 before:left-0  before:right-0
            before:mx-auto">{text}</span>)}

            {position === "top" && (<span className=" max-w-[200px] text-pretty text-center 
            z-10 w-max transition-opacity opacity-0 
            absolute shadow-lg  group-hover:opacity-100 
            bg-gray-900 text-white px-3 py-[6px] text-[13px] 
            left-1/2 transform -translate-x-1/2 mx-auto -top-8 -mt-2.5
            rounded before:w-4 before:h-4 before:rotate-45 before:bg-gray-900
            before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0
            before:mx-auto">{text}</span>)}

        </div>
    );
}