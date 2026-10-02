import type { Metadata } from "next";
import { type CSSProperties } from "react";
import { Mail, MapPin, User, GraduationCap, Phone } from "lucide-react";
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
import { SERIES_NAME } from "@/lib/site/config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the IEEE CHRIST University Student Branch Chapter.",
};

export default async function ContactPage() {
  const content = await getHomepageContent();
  const links = getNavLinks("/contact");

  const coordinators = [
    {
      role: "Faculty Coordinator",
      name: "Dr. Smith",
      description: "Faculty Sponsor & Advisor",
      icon: (
        <GraduationCap
          className="text-content-brand size-6"
          strokeWidth={1.5}
        />
      ),
      email: "faculty@ieeechrist.com",
      phone: "+91 98765 43210",
    },
    {
      role: "Student Coordinator",
      name: "Alice",
      description: "Chairperson, IEEE SB",
      icon: <User className="text-content-brand size-6" strokeWidth={1.5} />,
      email: "alice@ieeechrist.com",
      phone: "+91 98765 43211",
    },
    {
      role: "Student Coordinator",
      name: "Bob",
      description: "Vice-Chairperson, IEEE SB",
      icon: <User className="text-content-brand size-6" strokeWidth={1.5} />,
      email: "bob@ieeechrist.com",
      phone: "+91 98765 43212",
    },
  ];

  return (
    <>
      <NavBar
        links={links}
        year={content.year}
        cta={{ label: "Explore Events", href: "/events" }}
      />
      <main id="main-content" className="flex-1">
        {/* Hero & Coordinators Section */}
        <Section
          spacing="md"
          className="pt-10 lg:pt-16"
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
          <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center gap-6 text-center">
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
              Have a question about {SERIES_NAME}? We are here to help. Reach
              out to our teams below or visit us on campus.
            </Text>
          </div>

          <div className="mx-auto flex max-w-5xl flex-col gap-10">
            <SectionHeading
              id="coordinators-title"
              eyebrow="Leadership"
              title="Our Coordinators"
              className="mx-auto text-center"
            />

            {/* Coordinators Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {coordinators.map((person, i) => (
                <Card
                  key={person.name}
                  as="article"
                  className="group rise-in flex flex-col gap-4 p-8"
                  style={{ "--i": i + 1 } as CSSProperties}
                >
                  <div className="bg-surface-brand/10 mb-2 flex size-12 items-center justify-center rounded-full">
                    {person.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="type-eyebrow text-content-brand mb-2">
                      {person.role}
                    </span>
                    <h3 className="type-title">{person.name}</h3>
                  </div>
                  <p className="type-body text-content-secondary flex-1">
                    {person.description}
                  </p>

                  <div className="mt-2 flex flex-col gap-3">
                    {person.email && (
                      <a
                        href={`mailto:${person.email}`}
                        className="text-content-primary hover:text-content-brand flex w-fit items-center gap-2 font-medium transition-colors"
                      >
                        <Mail className="size-4 opacity-70" />
                        <span className="text-sm">{person.email}</span>
                      </a>
                    )}
                    {person.phone && (
                      <a
                        href={`tel:${person.phone.replace(/\s+/g, "")}`}
                        className="text-content-primary hover:text-content-brand flex w-fit items-center gap-2 font-medium transition-colors"
                      >
                        <Phone className="size-4 opacity-70" />
                        <span className="text-sm">{person.phone}</span>
                      </a>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Venue Section */}
        <Section
          spacing="lg"
          id="venue"
          aria-labelledby="venue-title"
          className="bg-surface-elevated"
        >
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="venue-title"
                eyebrow="Location"
                title="Where to find us."
              />
              <div className="mt-2 flex gap-4">
                <MapPin className="text-content-brand mt-1 size-6 shrink-0" />
                <div className="flex flex-col">
                  <span className="text-lg font-semibold">
                    CHRIST (Deemed to be University)
                  </span>
                  <span className="text-content-secondary type-body mt-1">
                    Kengeri Campus
                    <br />
                    Kanminike, Kumbalgodu, Mysore Road
                    <br />
                    Bengaluru, Karnataka 560074
                    <br />
                    India
                  </span>
                </div>
              </div>
            </div>

            {/* Google Maps iframe */}
            <div className="shadow-raised border-line bg-surface-muted relative h-[400px] w-full overflow-hidden rounded-2xl border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.693920558558!2d77.43321429678957!3d12.863035199999988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae472f365fe219%3A0xcae219b3b46324db!2sCHRIST%20(Deemed%20to%20be%20University)%20Bangaluru%20Kengeri%20Campus!5e0!3m2!1sen!2sin!4v1728245889176!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
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
