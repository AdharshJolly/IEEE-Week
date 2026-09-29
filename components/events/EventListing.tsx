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

  return (
    <div className="flex flex-col gap-10">
      {/* Filtering Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-none">
        {CATEGORIES.map((tab) => {
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
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                "group relative overflow-hidden rounded-[2rem] border border-line bg-surface-elevated p-1 transition-all hover:border-brand-blue/30 hover:shadow-glow",
                // Make the first item span two columns on desktop if it's the "All" view
                i === 0 && activeCategory === "all" ? "md:col-span-2" : ""
              )}
            >
              <Link href={item.href} className="flex h-full flex-col outline-none">
                <div className="relative h-48 sm:h-56 w-full overflow-hidden rounded-[1.75rem]">
                  <Photo
                    tone={i % 2 === 0 ? "blue" : "cyan"}
                    treatment="brand"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    placeholderLabel={PHOTO_LABELS[i % PHOTO_LABELS.length]}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-brand/90 via-surface-brand/20 to-transparent" />
                  
                  {/* Badges Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    {item.category && (
                      <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-brand/60 border border-white/10 text-white text-xs font-medium backdrop-blur-md capitalize">
                        {item.category}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative flex flex-1 flex-col p-6 -mt-16 z-10">
                  <div className="mb-4">
                    <RegistrationBadge state={item.registrationState} />
                  </div>
                  
                  <h3 className="type-h3 text-balance mb-2 group-hover:text-content-brand transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-content-secondary text-sm font-medium mt-auto pt-6">
                    <span>{item.dateLabel}</span>
                    <span className="w-1 h-1 rounded-full bg-line" />
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
