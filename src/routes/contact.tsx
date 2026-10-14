import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { images, pageTitle, siteConfig } from "@/config/siteConfig";
import { IconBadge, Reveal, SectionHeading } from "@/components/site/Reveal";
import { MapEmbed, PageBanner } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: pageTitle("Contact Us") },
      { name: "description", content: "Contact Sadiq Associates at Sabzazar Plaza, Lahore. Call 0315-4603790 or email info@sadiqassociates.com to book a consultation." },
      { property: "og:title", content: pageTitle("Contact Us") },
      { property: "og:description", content: "Book a consultation with Sadiq Associates, Chartered Firm in Lahore." },
      { property: "og:url", content: "https://sadiqassociates.com/contact" },
    ],
    links: [{ rel: "canonical", href: "https://sadiqassociates.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const cards = [
    { icon: MapPin, title: "Address", body: <>{siteConfig.address.line1}<br />{siteConfig.address.line2}</> },
    { icon: Phone, title: "Phone", body: <>{siteConfig.phones.map((p) => <a key={p.tel} href={`tel:${p.tel}`} className="block hover:text-gold">{p.label}</a>)}</> },
    { icon: Mail, title: "Email", body: <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a> },
    { icon: Clock, title: "Office Hours", body: siteConfig.officeHours },
  ];
  return (
    <>
      <PageBanner title="Contact Us" crumbs={[{ label: "Contact Us" }]} image={images.hero2} />
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Get in Touch" title="Contact Our Team or Schedule a Consultation" text="Share your audit, accounting, tax, compliance, company formation or advisory requirements and our team will get back to you." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div className="group h-full rounded-2xl bg-card p-7 shadow-soft transition-all hover:-translate-y-1.5 hover:shadow-lift">
                  <IconBadge icon={c.icon} />
                  <h3 className="mt-5 text-2xl font-semibold text-navy">{c.title}</h3>
                  <div className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <Reveal className="rounded-3xl bg-card p-8 shadow-soft md:p-10">
              <h2 className="text-4xl font-semibold text-navy">Send us a message</h2>
              <div className="mt-4 mb-8 h-px w-20 bg-gold" />
              <ContactForm />
            </Reveal>
            <Reveal delay={0.1} className="overflow-hidden rounded-3xl shadow-lift"><MapEmbed className="h-full min-h-[480px]" /></Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
