"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EventCategory, RegistrationState } from "@/types/event";
import { cn } from "@/lib/utils";
import { Photo } from "@/components/ui/Photo";

export interface EventListingItem {
  id: string;
  href: string;
  title: string;
  day: string;
  month: string;
  dateLabel: string;
  societyIds: string[];
  societyNames: string[];
  statusLabel: string;
  tentative: boolean;
  category?: EventCategory;
  registrationState?: RegistrationState;
  speakerAvatar?: string;
}

export interface EventListingProps {
  items: EventListingItem[];
}

const CATEGORIES: { label: string; value: EventCategory | "all" }[] = [
  { label: "All Events", value: "all" },
  { label: "Workshops", value: "workshop" },
  { label: "Competitions", value: "competition" },
  { label: "Talks", value: "talk" },
  { label: "Networking", value: "networking" },
  { label: "Social", value: "social" },
];

function RegistrationBadge({ state }: { state?: RegistrationState }) {
  if (!state) return null;
  
  const config = {
    open: { label: "Registration Open", dot: "bg-green-400", bg: "bg-green-500/10 text-green-400 border-green-500/20" },
    limited: { label: "Filling Fast", dot: "bg-amber-400 animate-pulse", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20" },
    closed: { label: "Closed", dot: "bg-red-400", bg: "bg-red-500/10 text-red-400 border-red-500/20" },
    soon: { label: "Opening Soon", dot: "bg-blue-400", bg: "bg-blue-500/10 text-blue-400 border-blue-500/20" },
    registered: { label: "Registered", dot: "bg-purple-400", bg: "bg-purple-500/10 text-purple-400 border-purple-500/20" },
  };
  
  const c = config[state];
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium backdrop-blur-md", c.bg)}>
      <span className={cn("w-1.5 h-1.5 rounded-full", c.dot)} />
      {c.label}
    </div>
  );
}

const PHOTO_LABELS = [
  "Future of Code",
  "Cyber Security",
  "Data Science",
  "Tech Summit",
  "Innovation Forum",
  "IoT Nexus"
];

export function EventListing({ items }: EventListingProps) {
  const [activeCategory, setActiveCategory] = useState<EventCategory | "all">("all");

  const filteredItems = items.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  const activeCategories = new Set(items.map((item) => item.category).filter(Boolean));
  const availableTabs = CATEGORIES.filter(
    (tab) => tab.value === "all" || activeCategories.has(tab.value as EventCategory)
  );

  return (
    <div className="flex flex-col gap-10">
      {/* Filtering Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-none">
        {availableTabs.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={cn(
                "px-5 py-2 rounded-full whitespace-nowrap font-medium text-sm transition-all duration-300",
                isActive 
                  ? "bg-content-brand text-surface-brand shadow-glow" 
                  : "bg-surface-elevated text-content-secondary hover:text-content-primary hover:bg-surface-brand/10 border border-line"
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Bento Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[22rem] gap-4 sm:gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, i) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
              className={cn(
                "group relative overflow-hidden rounded-[2rem] border border-white/10 bg-surface-deep transition-all hover:border-brand-blue/50 hover:shadow-glow",
                // Make the first item span two columns on desktop if it's the "All" view
                i === 0 && activeCategory === "all" ? "md:col-span-2" : "col-span-1"
              )}
            >
              <Link href={item.href} className="absolute inset-0 flex flex-col outline-none">
                {/* Full-bleed Background Image */}
                <div className="absolute inset-0 z-0">
                  <Photo
                    tone={i % 2 === 0 ? "blue" : "cyan"}
                    treatment="brand"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholderLabel={PHOTO_LABELS[i % PHOTO_LABELS.length]}
                  />
                  {/* Heavy gradient to make text readable */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                </div>
                
                {/* Badges Overlay (Top) */}
                <div className="absolute top-5 right-5 z-20 flex gap-2">
                  {item.category && (
                    <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-semibold backdrop-blur-md capitalize shadow-sm">
                      {item.category}
                    </div>
                  )}
                </div>

                {/* Content Overlay (Bottom) */}
                <div className="relative z-10 flex flex-1 flex-col justify-end p-6 sm:p-8">
                  <div className="mb-4">
                    <RegistrationBadge state={item.registrationState} />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white drop-shadow-md text-balance mb-3 group-hover:text-brand-cyan transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-3 text-white/90 drop-shadow-sm text-sm font-medium">
                    <span className="bg-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">{item.dateLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-white/30" />
                    <span className="truncate">{item.societyNames.join(", ")}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredItems.length === 0 && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-surface-muted flex items-center justify-center mb-4">
              <span className="text-2xl">👻</span>
            </div>
            <h3 className="type-title mb-2">No events found</h3>
            <p className="text-content-secondary max-w-sm text-balance">
              We couldn&apos;t find any events matching this category. Check back later or try another filter.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
