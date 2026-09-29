"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface EventsSidebarItem {
  id: string;
  href: string;
  title: string;
  day: string;
  month: string;
  societyNames: (string | undefined)[];
}

export function EventsSidebar({ items }: { items: EventsSidebarItem[] }) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-3 m-0 p-0 list-none">
      {items.map((item) => {
        const isActive = pathname === item.href;
        
        return (
          <li key={item.id} className="m-0">
            <Link
              href={item.href}
              className={cn(
                "group flex items-center gap-4 rounded-card p-4 transition-all duration-fast ease-standard border",
                isActive 
                  ? "bg-surface-brand border-transparent shadow-glow" 
                  : "bg-surface-elevated border-line shadow-rest hover:border-brand-blue/30 hover:bg-surface-brand/5"
              )}
            >
              <div className={cn(
                "flex flex-col items-center justify-center shrink-0 w-12 h-14 rounded-tag",
                isActive ? "bg-white text-brand-blue shadow-sm" : "bg-surface-muted text-content-primary"
              )}>
                <span className="font-bold text-lg leading-none">{item.day}</span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-widest mt-1">{item.month}</span>
              </div>
              
              <div className="flex flex-col min-w-0">
                <span className={cn(
                  "font-semibold text-base truncate",
                  isActive ? "text-content-brand" : "text-content-primary"
                )}>
                  {item.title}
                </span>
                <span className={cn(
                  "text-sm truncate mt-0.5",
                  isActive ? "text-content-brand/80" : "text-content-secondary"
                )}>
                  {item.societyNames.filter(Boolean).join(", ")}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
