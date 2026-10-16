import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight, Award, Briefcase, ChevronLeft, ChevronRight, Facebook, HeartHandshake, Layers, Linkedin, Phone, Play, Receipt, Scale, Smile, Sparkles, Target, Users, UserRound, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, pageTitle, services, siteConfig } from "@/config/siteConfig";
import { IconBadge, Reveal, SectionHeading } from "@/components/site/Reveal";
import { CheckItem, Counter, CtaBanner, MapEmbed, ServicesGrid } from "@/components/site/Blocks";
import { ContactForm } from "@/components/site/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: pageTitle("Home") },
      { name: "description", content: "Sadiq Associates, a Chartered Firm in Sabzazar, Lahore: audit & assurance, accounting, tax consultancy, company formation and business advisory." },
      { property: "og:title", content: pageTitle("Home") },
      { property: "og:description", content: "Audit, accounting, tax and business advisory from a Chartered Firm in Lahore." },
      { property: "og:url", content: "https://sadiqassociates.com/" },
    ],
    links: [{ rel: "canonical", href: "https://sadiqassociates.com/" }],
  }),
  component: Home,
});

const slides = [
  { img: images.hero1, title: "Trusted Financial Guidance for Growing Businesses", text: "Audit, accounting, tax and advisory support from a Chartered Firm that treats your business like its own.", cta: { label: "Book a Consultation", to: "/contact" } },
  { img: images.hero2, title: "Accurate Accounts. Confident Decisions.", text: "Clear, up-to-date financial reporting that shows exactly how your business is performing.", cta: { label: "Explore Services", to: "/services" } },
  { img: images.hero3, title: "Compliance and Tax, Handled with Care", text: "Practical income tax, sales tax and compliance support for individuals and organisations across Pakistan.", cta: { label: "About Sadiq Associates", to: "/about" } },
] as const;

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [i]);
  const s = slides[i]!;
  return (
    <section className="relative h-[86vh] min-h-[560px] overflow-hidden bg-navy-deep">
      <AnimatePresence mode="sync">
        <motion.div key={i} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <img src={s.img} alt="" className="h-full w-full object-cover animate-kenburns" width={1920} height={1088} />
          <div className="absolute inset-0 bg-hero-overlay" />
        </motion.div>
      </AnimatePresence>
      <div className="container-x relative flex h-full items-center pb-16">
        <AnimatePresence mode="wait">
          <motion.div key={i} className="max-w-2xl" initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.12 } } }}>
            {[
              <span key="b" className="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-navy-foreground/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-gold backdrop-blur-md"><Award className="h-4 w-4" /> Chartered Firm</span>,
              <h1 key="t" className="mt-6 text-5xl font-semibold leading-[1.05] text-navy-foreground md:text-7xl">{s.title}</h1>,
              <p key="p" className="mt-6 max-w-xl text-lg text-navy-foreground/80">{s.text}</p>,
              <div key="c" className="mt-9"><Button asChild variant="gold" size="xl"><Link to={s.cta.to}>{s.cta.label} <ArrowRight /></Link></Button></div>,
            ].map((el, k) => (
              <motion.div key={k} variants={{ h: { opacity: 0, y: 30 }, s: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>{el}</motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-24 right-6 flex gap-2 md:right-10">
        <button aria-label="Previous slide" onClick={() => setI((i - 1 + slides.length) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-foreground/30 text-navy-foreground backdrop-blur-md hover:bg-gold hover:text-gold-foreground"><ChevronLeft className="h-5 w-5" /></button>
        <button aria-label="Next slide" onClick={() => setI((i + 1) % slides.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-foreground/30 text-navy-foreground backdrop-blur-md hover:bg-gold hover:text-gold-foreground"><ChevronRight className="h-5 w-5" /></button>
      </div>
      <div className="absolute bottom-28 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, k) => (
          <button key={k} aria-label={`Go to slide ${k + 1}`} onClick={() => setI(k)} className={`h-1.5 rounded-full transition-all ${k === i ? "w-10 bg-gold" : "w-4 bg-navy-foreground/40"}`} />
        ))}
      </div>
    </section>
  );
}

function QuickStrip() {
  return (
    <section className="relative z-10 -mt-20">
      <div className="container-x">
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-9 lg:overflow-visible">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.05} className="min-w-[200px] snap-start lg:min-w-0">
              <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col items-center card-premium card-hover p-6 text-center">
                <IconBadge icon={s.icon} size="sm" />
                <h3 className="mt-3 font-sans text-[0.8rem] font-bold leading-snug text-navy">{s.title}</h3>
                <p className="mt-1.5 text-[0.72rem] leading-snug text-muted-foreground">{s.short}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [video, setVideo] = useState(false);
  return (
    <section className="py-24">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <SectionHeading align="left" eyebrow="About Us" title="We Help You Manage Finance with Confidence" text="Sadiq Associates is a Chartered Firm offering audit, accounting, taxation, compliance and business advisory support to organisations and individuals across Pakistan. We combine technical knowledge with a practical, personal approach so you always know where your finances stand." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Accurate Financial Reporting", "Professional Tax Guidance", "Audit & Compliance", "Business-Focused Advice"].map((t, i) => <CheckItem key={t} i={i}>{t}</CheckItem>)}
          </div>
          <Reveal delay={0.2} className="mt-10 flex items-center gap-5 rounded-2xl bg-navy-gradient p-6 shadow-lift">
            <span className="animate-pulse-ring flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground"><Phone className="h-6 w-6" /></span>
            <div>
              <p className="text-sm text-navy-foreground/75">Need professional financial guidance?</p>
              <a href={`tel:${siteConfig.phones[0]!.tel}`} className="font-serif text-3xl font-semibold text-navy-foreground hover:text-gold">{siteConfig.phones[0]!.label}</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="relative">
          <div className="absolute -bottom-5 -right-5 h-full w-full rounded-3xl border-2 border-gold" />
          <div className="relative overflow-hidden rounded-3xl shadow-lift">
            <img src={images.advisory} alt="A Sadiq Associates advisor meeting a client" loading="lazy" className="aspect-[4/5] w-full object-cover md:aspect-[5/5]" width={1024} height={768} />
            <button onClick={() => setVideo(true)} aria-label="Play introduction video" className="absolute bottom-6 left-6 flex items-center gap-3 rounded-full bg-card/90 py-2 pl-2 pr-5 text-sm font-semibold text-navy backdrop-blur">
              <span className="animate-pulse-ring flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground"><Play className="h-4 w-4 fill-current" /></span>
              Watch introduction
            </button>
          </div>
          <div className="absolute -left-4 top-8 rounded-2xl bg-card px-5 py-4 shadow-lift md:-left-8">
            <p className="eyebrow">Sadiq Associates</p>
            <p className="mt-1 font-serif text-2xl font-semibold text-navy">Chartered Firm</p>
          </div>
        </Reveal>
      </div>
      <AnimatePresence>
        {video && (
          <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy-deep/85 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setVideo(false)}>
            <div className="relative w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setVideo(false)} aria-label="Close video" className="absolute -top-12 right-0 text-navy-foreground"><X className="h-8 w-8" /></button>
              {/* TODO(owner): replace with the firm's own video */}
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-navy text-center text-navy-foreground/80">
                <p className="px-6">Introduction video coming soon.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Stats() {
  const icons = [Award, Smile, Layers];
  return (
    <section className="relative overflow-hidden bg-navy-gradient py-20">
      <div className="container-x grid gap-10 text-center md:grid-cols-3">
        {siteConfig.stats.map((s, i) => {
          const Icon = icons[i]!;
          return (
            <Reveal key={s.key} delay={i * 0.1} className="group flex flex-col items-center">
              <IconBadge icon={Icon} size="lg" tone="dark" />
              <p className="mt-5 font-serif text-6xl font-semibold text-navy-foreground"><Counter to={s.value} suffix={s.suffix} /></p>
              <p className="mt-2 text-sm uppercase tracking-[0.2em] text-gold">{s.label}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Featured() {
  const items = [
    { icon: Scale, title: "Corporate & Business Advisory", text: "Advice on agreements, company law and regulation so you can act with certainty.", slug: "corporate-business-advisory" },
    { icon: Briefcase, title: "Management Consultancy", text: "Stronger systems, policies and controls that make your organisation run better.", slug: "management-consultancy" },
    { icon: Receipt, title: "Tax Consultancy", text: "Income and sales tax planning, filing and representation handled properly.", slug: "tax-consultancy" },
  ];
  return (
    <section className="pb-8">
      <div className="container-x grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <Reveal key={it.slug} delay={i * 0.1}>
            <Link to="/services/$slug" params={{ slug: it.slug }} className={`group block h-full rounded-3xl p-9 transition-all duration-500 hover:-translate-y-2 hover:shadow-lift ${i === 1 ? "bg-navy-gradient" : "bg-card shadow-soft"}`}>
              <IconBadge icon={it.icon} size="lg" tone={i === 1 ? "dark" : "light"} />
              <h3 className={`mt-6 text-3xl font-semibold ${i === 1 ? "text-navy-foreground" : "text-navy"}`}>{it.title}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${i === 1 ? "text-navy-foreground/75" : "text-muted-foreground"}`}>{it.text}</p>
              <span className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold ${i === 1 ? "text-gold" : "text-navy"}`}>Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" /></span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function WhyChoose({ items }: { items: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }[] }) {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.1}>
          <div className="group h-full rounded-2xl border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-gold hover:shadow-lift">
            <IconBadge icon={w.icon} />
            <h3 className="mt-5 text-2xl font-semibold text-navy">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{w.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Team() {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-3">
      {siteConfig.team.map((m, i) => (
        <Reveal key={i} delay={i * 0.1}>
          <div className={`group overflow-hidden card-premium card-hover ${m.placeholder ? "opacity-80" : ""}`}>
            {/* TODO(owner): replace with a real portrait photo */}
            <div className="relative flex aspect-[4/5] items-center justify-center bg-navy-gradient">
              <UserRound className="h-28 w-28 text-navy-foreground/25" />
              <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 pb-5 opacity-0 transition-all duration-500 group-hover:opacity-100">
                {[Linkedin, Facebook].map((I, k) => <span key={k} className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-gold-foreground"><I className="h-4 w-4" /></span>)}
              </div>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-semibold text-navy">{m.name}</h3>
              <p className="mt-1 text-sm text-gold">{m.role}</p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <QuickStrip />
      <About />
      <Stats />
      <section className="pt-24"><div className="container-x"><SectionHeading eyebrow="What We Do Best" title="Featured Services" /></div></section>
      <div className="mt-14"><Featured /></div>
      <section className="bg-secondary/60 py-24 mt-16">
        <div className="container-x">
          <SectionHeading eyebrow="Services" title="Professional Expertise for Every Business Need" text="Nine focused services covering every stage of your business, from formation and bookkeeping to audit, tax and strategic advice." />
          <ServicesGrid />
        </div>
      </section>
      <section className="py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Why Choose Us" title="A Firm You Can Rely On" />
          <WhyChoose items={[
            { icon: Users, title: "Experienced Team", text: "Qualified professionals who understand local regulation and real business needs." },
            { icon: HeartHandshake, title: "Client-Focused Service", text: "Clear communication and responsive support at every step." },
            { icon: Sparkles, title: "Complete Business Support", text: "Audit, accounting, tax, compliance and advisory in one place." },
            { icon: Target, title: "Personalised Approach", text: "Advice shaped around your goals, size and industry." },
          ]} />
        </div>
      </section>
      <section className="bg-secondary/60 py-24">
        <div className="container-x">
          <SectionHeading eyebrow="Our Team" title="The People Behind Sadiq Associates" />
          <Team />
        </div>
      </section>
      <section className="py-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-3xl shadow-lift"><MapEmbed className="h-full min-h-[420px]" /></Reveal>
          <Reveal delay={0.1} className="rounded-3xl bg-card p-8 shadow-soft md:p-10">
            <p className="eyebrow">Consultation</p>
            <h2 className="mt-3 text-4xl font-semibold text-navy">Request a Consultation</h2>
            <div className="mt-4 mb-8 h-px w-20 bg-gold" />
            <ContactForm compact />
          </Reveal>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
