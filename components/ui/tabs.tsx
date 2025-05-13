"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-14 items-center justify-center rounded-xl bg-muted p-2 text-foreground/70",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-lg px-4 py-2.5 text-base font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm",
      // Clases para temas VIP
      "data-[vip-theme=theme-gold][state=active]:bg-yellow-50 data-[vip-theme=theme-gold][state=active]:text-yellow-900 dark:data-[vip-theme=theme-gold][state=active]:bg-yellow-400/20 dark:data-[vip-theme=theme-gold][state=active]:text-yellow-200",
      "data-[vip-theme=theme-diamond][state=active]:bg-blue-50 data-[vip-theme=theme-diamond][state=active]:text-blue-900 dark:data-[vip-theme=theme-diamond][state=active]:bg-blue-400/20 dark:data-[vip-theme=theme-diamond][state=active]:text-blue-200",
      "data-[vip-theme=theme-emerald][state=active]:bg-emerald-50 data-[vip-theme=theme-emerald][state=active]:text-emerald-900 dark:data-[vip-theme=theme-emerald][state=active]:bg-emerald-400/20 dark:data-[vip-theme=theme-emerald][state=active]:text-emerald-200",
      "data-[vip-theme=theme-ruby][state=active]:bg-red-50 data-[vip-theme=theme-ruby][state=active]:text-red-900 dark:data-[vip-theme=theme-ruby][state=active]:bg-red-400/20 dark:data-[vip-theme=theme-ruby][state=active]:text-red-200",
      "data-[vip-theme=theme-amethyst][state=active]:bg-purple-50 data-[vip-theme=theme-amethyst][state=active]:text-purple-900 dark:data-[vip-theme=theme-amethyst][state=active]:bg-purple-400/20 dark:data-[vip-theme=theme-amethyst][state=active]:text-purple-200",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-3 rounded-xl ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
