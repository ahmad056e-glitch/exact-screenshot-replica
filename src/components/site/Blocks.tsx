import { Link } from "@tanstack/react-router";
import { motion, useInView, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { images, services, siteConfig, type Service } from "@/config/siteConfig";
import { IconBadge, Reveal } from "./Reveal";

export function PageBanner({ title, crumbs, image = images.hero3 }: { title: string; crumbs: { label: string; to?: string }[]; image?: string }) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover animate-kenburns" width={1920} height={1088} />
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative py-24 md:py-32">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl font-semibold text-navy-foreground md:text-6xl">
          {title}
        </motion.h1>
        <nav aria-label="Breadcrumb" className="mt-5 flex flex-wrap items-center gap-2 text-sm text-navy-foreground/80">
          <Link to="/" className="hover:text-gold">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-2">
              <ChevronRight className="h-4 w-4 text-gold" />
              {c.to ? <Link to={c.to} className="hover:text-gold">{c.label}</Link> : <span className="text-gold">{c.label}</span>}
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}

export function ServiceCard({ s, i = 0 }: { s: Service; i?: number }) {
  return (
    <Reveal delay={(i % 3) * 0.1} className="h-full">
      <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col overflow-hidden card-premium card-hover">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={s.image} alt={`${s.title} at Sadiq Associates`} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" width={1024} height={768} />
                  </div>
        <div className="relative flex flex-1 flex-col px-7 pb-7 pt-11">
          <div className="absolute -top-7 left-7"><IconBadge icon={s.icon} /></div>
          <h3 className="text-2xl font-semibold text-navy">{s.title}</h3>
          <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy">
            Learn more <ArrowRight className="h-4 w-4 text-gold transition-transform transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid() {
  return (
    <div className="mt-14 grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => <ServiceCard key={s.slug} s={s} i={i} />)}
    </div>
  );
}

export function CheckItem({ children, i = 0, light = false }: { children: React.ReactNode; i?: number; light?: boolean }) {
  return (
    <Reveal delay={i * 0.06} y={12} className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
          <motion.path d="M5 12l5 5L20 7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 + i * 0.06 }} />
        </svg>
      </span>
      <span className={light ? "text-navy-foreground/85" : "text-foreground/85"}>{children}</span>
    </Reveal>
  );
}
export { Check };

export function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease: "easeOut", onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

export function SkillBar({ label, value, i }: { label: string; value: number; i: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm font-semibold text-navy"><span>{label}</span><span>{value}%</span></div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
        <motion.div className="h-full rounded-full bg-gold-gradient" initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }} transition={{ duration: 1.4, delay: i * 0.15, ease: "easeOut" }} />
      </div>
    </div>
  );
}

export function CtaBanner() {
  return (
    <section className="relative overflow-hidden">
      <img src={images.hero1} alt="Advisors reviewing financial reports" loading="lazy" className="absolute inset-0 h-full w-full object-cover" width={1920} height={1088} />
      <div className="absolute inset-0 bg-navy-deep/85" />
      <div className="container-x relative py-24 text-center">
        <Reveal>
          <p className="eyebrow">Chartered Firm</p>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold text-navy-foreground md:text-6xl">Ready to speak with a professional?</h2>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild variant="gold" size="xl"><Link to="/contact">Book a Consultation <ArrowRight /></Link></Button>
            <Button asChild variant="outlineLight" size="xl"><a href={`tel:${siteConfig.phones[0]!.tel}`}><Phone /> Call Now</a></Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <iframe
      title="Sadiq Associates office location – Sabzazar Plaza, Lahore"
      src={siteConfig.mapEmbed}
      className={`w-full border-0 ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}
