"use client";

import { Accordion, AccordionContent, AccordionItem as BaseAccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
      {items.map((item, index) => (
        <Accordion 
          key={item.id}
          type="single" 
          collapsible 
          className="space-y-0"
          defaultValue={index === 0 ? item.id : undefined}
        >
          <AccordionItem
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
        </Accordion>
      ))}
    </div>
  );
}