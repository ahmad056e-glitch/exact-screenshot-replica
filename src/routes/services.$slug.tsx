import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronRight, Mail, MapPin, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { pageTitle, services, siteConfig } from "@/config/siteConfig";
import { IconBadge, Reveal } from "@/components/site/Reveal";
import { CheckItem, CtaBanner, PageBanner } from "@/components/site/Blocks";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    const t = pageTitle(s?.title ?? "Service");
    return {
      meta: [
        { title: t },
        { name: "description", content: s?.description ?? "" },
        { property: "og:title", content: t },
        { property: "og:description", content: s?.description ?? "" },
        { property: "og:url", content: `https://sadiqassociates.com/services/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `https://sadiqassociates.com/services/${params.slug}` }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  const [light, setLight] = useState<string | null>(null);
  return (
    <>
      <PageBanner title={s.title} crumbs={[{ label: "Services", to: "/services" }, { label: s.title }]} image={s.image} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_360px]">
          <div>
            <Reveal className="group flex items-center gap-4">
              <IconBadge icon={s.icon} size="lg" />
              <h2 className="text-4xl font-semibold text-navy md:text-5xl">{s.title}</h2>
            </Reveal>
            <div className="mt-5 h-px w-20 bg-gold" />
            <Reveal><p className="mt-6 text-lg leading-relaxed text-muted-foreground">{s.description}</p></Reveal>
            <h3 className="mt-12 text-3xl font-semibold text-navy">Service Includes</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {s.includes.map((t, i) => <CheckItem key={t} i={i}>{t}</CheckItem>)}
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4">
              {s.gallery.map((g, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <button onClick={() => setLight(g)} className="group block overflow-hidden rounded-2xl" aria-label="Open image">
                    <img src={g} alt={`${s.title} – image ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover saturate-[0.85] transition-transform duration-700 group-hover:scale-110" />
                  </button>
                </Reveal>
              ))}
            </div>
            <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-navy-gradient p-8 md:flex-row md:items-center">
              <div>
                <p className="eyebrow">Get Started</p>
                <h3 className="mt-2 text-3xl font-semibold text-navy-foreground">Need help with this service? Request now</h3>
              </div>
              <Button asChild variant="gold" size="xl"><Link to="/contact">Request Now <ArrowRight /></Link></Button>
            </Reveal>
          </div>
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl bg-card p-6 shadow-soft">
              <h3 className="text-2xl font-semibold text-navy">All Services</h3>
              <div className="mt-4 space-y-1">
                {services.map((x) => (
                  <Link key={x.slug} to="/services/$slug" params={{ slug: x.slug }} className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${x.slug === s.slug ? "bg-navy text-navy-foreground" : "text-foreground/80 hover:bg-gold-soft hover:text-navy"}`}>
                    {x.title} <ChevronRight className="h-4 w-4 text-gold" />
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-3xl bg-navy-gradient p-6 text-navy-foreground/85">
              <h3 className="text-2xl font-semibold text-navy-foreground">Contact Us</h3>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{siteConfig.address.line1}, {siteConfig.address.line2}</li>
                {siteConfig.phones.map((p) => <li key={p.tel} className="flex gap-3"><Phone className="h-4 w-4 text-gold" /><a href={`tel:${p.tel}`} className="hover:text-gold">{p.label}</a></li>)}
                <li className="flex gap-3"><Mail className="h-4 w-4 text-gold" /><a href={`mailto:${siteConfig.email}`} className="hover:text-gold">{siteConfig.email}</a></li>
              </ul>
              <Button asChild variant="gold" size="xl" className="mt-6 w-full"><Link to="/contact">Quick Consultation <ArrowRight /></Link></Button>
            </div>
          </aside>
        </div>
      </section>
      <CtaBanner />
      <AnimatePresence>
        {light && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/90 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLight(null)}>
            <button aria-label="Close" className="absolute right-6 top-6 text-navy-foreground"><X className="h-8 w-8" /></button>
            <motion.img src={light} alt="" className="max-h-[85vh] max-w-full rounded-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
