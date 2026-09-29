import type { Metadata } from "next";
import Image from "next/image";
import { type CSSProperties } from "react";
import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { FinalCta } from "@/components/sections/FinalCta";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { SocietiesSection } from "@/components/sections/SocietiesSection";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Photo } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";
import { getSocieties } from "@/lib/events";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";
import { SERIES_NAME } from "@/lib/site/config";

export const metadata: Metadata = {
  title: `About | ${SERIES_NAME}`,
  description:
    `Learn about CHRIST University and the IEEE societies organizing ${SERIES_NAME}.`,
};

export default async function AboutPage() {
  const [content, societies] = await Promise.all([
    getHomepageContent(),
    getSocieties(),
  ]);

  const links = getNavLinks("/about");

  const societyItems = societies.map((society) => ({
    id: society.id,
    name: society.name,
    short: society.short,
    logo: society.logo,
    description: society.description,
  }));

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        
        <Section
          spacing="none"
          className="pb-section-sm pt-10 lg:pt-16"
          aria-labelledby="about-title"
          decor={
            <>
              <Decor variant="grid" className="inset-0" />
              <Decor
                variant="rings"
                at="100% 0%"
                className="top-0 right-0 h-[36rem] w-[36rem]"
              />
            </>
          }
        >
          <div className="flex flex-col gap-6 max-w-4xl">
            <Eyebrow className="rise-in">About</Eyebrow>
            <Heading
              as="h1"
              id="about-title"
              visualStyle="display"
              className="rise-in"
              style={{ "--i": 1 } as CSSProperties}
            >
              The community behind <em>{SERIES_NAME}</em>
            </Heading>
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-2xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              We are driven by the pursuit of technological excellence and community 
              collaboration. Discover the university and the societies that make this 
              flagship event possible.
            </Text>
          </div>
        </Section>

        <Section spacing="md" id="university" aria-labelledby="university-title">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="flex flex-col gap-6 lg:order-1">
              <div className="relative h-20 w-48 -mb-4">
                <Image 
                  src="/images/CHRIST Uni.png" 
                  alt="CHRIST University Logo" 
                  fill 
                  className="object-contain object-left brightness-0" 
                  unoptimized
                />
              </div>
              <SectionHeading
                id="university-title"
                eyebrow="Our Institution"
                title="CHRIST (Deemed to be University)"
              />
              <Text visualStyle="body-lg" tone="secondary">
                Founded in 1969, CHRIST (Deemed to be University) is a premier 
                educational institution in Bengaluru, India. Recognized for its 
                academic excellence and vibrant campus life, it nurtures students 
                to become visionary leaders and global citizens.
              </Text>
              <Text visualStyle="body" tone="secondary">
                The School of Engineering and Technology provides a dynamic ecosystem 
                for innovation, research, and practical application, empowering the 
                next generation of technologists. It is the proud home to our active 
                IEEE Student Branch.
              </Text>
            </div>
            
            <div className="lg:order-2 relative isolate">
              <Decor
                variant="rings-cyan"
                at="50% 50%"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[130%] w-[130%] max-w-none pointer-events-none -z-10"
              />
              <Photo 
                src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1200"
                alt="CHRIST University Campus"
                aspect="4/3" 
                shape="card" 
                tone="blue"
                treatment="brand"
                className="relative z-10 w-full shadow-float" 
              />
            </div>
          </div>
        </Section>

        <SocietiesSection societies={societyItems} layout="list" />

        <FinalCta
          year={content.year}
          primary={{ label: "View Schedule", href: "/events" }}
          secondary={{ label: "Back to home", href: "/" }}
        />
      </main>
      <SiteFooter
        organization={content.organization}
        year={content.year}
        links={links}
      />
    </>
  );
}
