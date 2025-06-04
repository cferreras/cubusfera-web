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
    className={cn("text-md font-normal hover:no-underline [&>svg]:h-6 [&>svg]:w-6", className)} 
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
            className={cn(
              "rounded-lg border-[#D4DBE3] dark:border-[#304D69] border p-4",
              "border-b-[#D4DBE3] dark:border-b-[#304D69] !border-b !border-solid"
            )}
          >
            <CustomAccordionTrigger>
              {item.question}
            </CustomAccordionTrigger>
            <AccordionContent className="text-[#5C738A] dark:text-[#8FADCC]">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}