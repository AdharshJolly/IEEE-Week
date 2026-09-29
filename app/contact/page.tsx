import type { Metadata } from "next";
import { type CSSProperties } from "react";
import { Mail, Handshake, Ticket, MapPin, ExternalLink } from "lucide-react";
import { NavBar } from "@/components/navigation/NavBar";
import { SiteFooter } from "@/components/navigation/SiteFooter";
import { SectionHeading } from "@/components/sections/SectionHeading";
import { Decor } from "@/components/ui/Decor";
import { Heading } from "@/components/ui/Heading";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Text } from "@/components/ui/Text";
import { Card } from "@/components/ui/Card";
import { getHomepageContent } from "@/lib/site/homepage";
import { getNavLinks } from "@/lib/site/navigation";

export const metadata: Metadata = {
  title: "Contact | IEEE Week",
  description: "Get in touch with the IEEE CHRIST University Student Branch Chapter.",
};

export default async function ContactPage() {
  const content = await getHomepageContent();
  const links = getNavLinks("/contact");

  const contactMethods = [
    {
      title: "General Inquiries",
      description: "Have a general question about IEEE Week? Drop us a line.",
      icon: <Mail className="size-6 text-content-brand" strokeWidth={1.5} />,
      action: "hello@ieeechrist.com",
      href: "mailto:hello@ieeechrist.com"
    },
    {
      title: "Sponsorship & Partnerships",
      description: "Interested in sponsoring our events or partnering with us?",
      icon: <Handshake className="size-6 text-content-brand" strokeWidth={1.5} />,
      action: "sponsor@ieeechrist.com",
      href: "mailto:sponsor@ieeechrist.com"
    },
    {
      title: "Registration Support",
      description: "Having trouble registering for a specific track or event?",
      icon: <Ticket className="size-6 text-content-brand" strokeWidth={1.5} />,
      action: "support@ieeechrist.com",
      href: "mailto:support@ieeechrist.com"
    }
  ];

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        
        {/* Hero Section */}
        <Section
          spacing="none"
          className="pb-section-sm pt-10 lg:pt-16"
          aria-labelledby="contact-title"
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
          <div className="flex flex-col gap-6 max-w-4xl text-center mx-auto items-center">
            <Eyebrow className="rise-in">Contact Us</Eyebrow>
            <Heading
              as="h1"
              id="contact-title"
              visualStyle="display"
              className="rise-in"
              style={{ "--i": 1 } as CSSProperties}
            >
              Get in touch.
            </Heading>
            <Text
              visualStyle="body-lg"
              tone="secondary"
              className="rise-in max-w-2xl"
              style={{ "--i": 2 } as CSSProperties}
            >
              Have a question about IEEE Week? We are here to help. Reach out to our 
              teams below or visit us on campus.
            </Text>
          </div>
        </Section>

        {/* Contact Cards Section */}
        <Section spacing="md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, i) => (
              <Card
                key={method.title}
                as="article"
                href={method.href}
                className="flex flex-col gap-4 p-8 group rise-in"
                style={{ "--i": i + 2 } as CSSProperties}
              >
                <div className="size-12 rounded-full bg-surface-brand/10 flex items-center justify-center mb-2">
                  {method.icon}
                </div>
                <h3 className="type-title">{method.title}</h3>
                <p className="type-body text-content-secondary flex-1">{method.description}</p>
                <div className="flex items-center gap-2 mt-4 text-content-brand font-medium group-hover:translate-x-1 transition-transform">
                  <span>{method.action}</span>
                  <ExternalLink className="size-4" />
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* Venue Section */}
        <Section spacing="lg" id="venue" aria-labelledby="venue-title" className="bg-surface-elevated">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="venue-title"
                eyebrow="Location"
                title="Where to find us."
              />
              <div className="flex gap-4 mt-2">
                <MapPin className="size-6 text-content-brand shrink-0 mt-1" />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg">CHRIST (Deemed to be University)</span>
                  <span className="text-content-secondary type-body mt-1">
                    Kengeri Campus<br />
                    Kanminike, Kumbalgodu, Mysore Road<br />
                    Bengaluru, Karnataka 560074<br />
                    India
                  </span>
                </div>
              </div>
            </div>
            
            {/* Google Maps iframe */}
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden shadow-raised border border-line bg-surface-muted">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.33615591244!2d77.43577717616158!3d12.853874387451074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae4a9bd123fdd9%3A0xcb13511195669f65!2sCHRIST%20(Deemed%20to%20be%20University)%20-%20Kengeri%20Campus!5e0!3m2!1sen!2sus!4v1714457731215!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale contrast-125 opacity-90 mix-blend-multiply"
              ></iframe>
            </div>
          </div>
        </Section>
      </main>
      <SiteFooter
        organization={content.organization}
        year={content.year}
        links={links}
      />
    </>
  );
}
