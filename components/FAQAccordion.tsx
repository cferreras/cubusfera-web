"use client";

import { Accordion, AccordionContent, AccordionItem as BaseAccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Link from "next/link";
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

// Componente personalizado que extiende AccordionItem pero sin el borde inferior predeterminado
const AccordionItem = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof BaseAccordionItem>) => (
  <BaseAccordionItem className={cn("border-0", className)} {...props} />
);

// Componente personalizado para AccordionTrigger con icono más grande
const CustomAccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionTrigger>,
  React.ComponentPropsWithoutRef<typeof AccordionTrigger>
>(({ className, children, ...props }, ref) => (
  <AccordionTrigger 
    ref={ref} 
    className={cn("text-md font-normal text-[#1F2937] dark:text-white hover:no-underline [&>svg]:h-6 [&>svg]:w-6 [&>svg]:text-[#3B82F6] dark:[&>svg]:text-white", className)} 
    {...props}
  >
    {children}
  </AccordionTrigger>
));
CustomAccordionTrigger.displayName = "CustomAccordionTrigger";

type FAQItem = {
  id: string;
  question: string;
  answer: ReactNode;
};

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  return (
    <div className="">
      <Accordion 
        type="single" 
        collapsible 
        className="space-y-4 divide-none md:space-y-6"
        defaultValue={items.length > 0 ? items[0].id : undefined}
      >
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border border-[#E5E7EB] dark:border-[#304D69] rounded-lg p-4 md:p-6 bg-white dark:bg-[#172633]"
          >
            <CustomAccordionTrigger>{item.question}</CustomAccordionTrigger>
            <AccordionContent className="text-[#4B5563] dark:text-[#8FADCC] pt-2">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}