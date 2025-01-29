"use client";

import type * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import { es } from "date-fns/locale"; // Importa la localización en español

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={es} // Aplica la localización en español
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xl font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 text-white hover:bg-white/10"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between w-full",
        head_cell: "w-9 font-normal text-[0.8rem] text-white",
        row: "flex w-full mt-2",
        cell: "h-12 w-12 text-center text-sm p-0",
        day: "h-12 w-12 text-center font-normal text-white hover:bg-white/10",
        day_selected:
          "bg-white/20 text-white hover:bg-white/30 hover:text-white focus:bg-white/30",
        day_today: "bg-white/10 text-white",
        day_outside: "text-white/50",
        day_disabled: "text-white/20",
        day_range_middle: "rounded-none",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-4 w-4" style={{ color: "white" }} {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-4 w-4" style={{ color: "white" }} {...props} />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };