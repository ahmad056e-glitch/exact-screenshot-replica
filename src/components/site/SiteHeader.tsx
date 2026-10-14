import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services, siteConfig } from "@/config/siteConfig";
import mark from "@/assets/logo-mark.png";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Sadiq Associates home">
      <span className="flex h-12 w-14 items-center justify-center rounded-xl bg-card p-1.5 shadow-soft">
        <img src={mark} alt="Sadiq Associates logo" className="h-full w-full object-contain" width={300} height={202} />
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-xl font-bold tracking-wide ${light ? "text-navy-foreground" : "text-navy"}`}>
          Sadiq Associates
        </span>
        <span className="mt-1 block text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-gold">Chartered Firm</span>
      </span>
    </Link>
  );
}

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact Us" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);

  const isActive = (to: string) => (to === "/" ? path === "/" : path.startsWith(to));

  return (
    <>
      <div className="bg-navy-deep text-navy-foreground/85">
        <div className="container-x flex h-10 items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-5">
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-gold">
              <Mail className="h-3.5 w-3.5 text-gold" /> {siteConfig.email}
            </a>
            {siteConfig.phones.map((p, i) => (
              <a key={p.tel} href={`tel:${p.tel}`} className={`items-center gap-1.5 hover:text-gold ${i === 0 ? "flex" : "hidden md:flex"}`}>
                <Phone className="h-3.5 w-3.5 text-gold" /> {p.label}
              </a>
            ))}
          </div>
          <span className="hidden items-center gap-1.5 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-gold" /> Sabzazar, Lahore
          </span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/85 shadow-soft backdrop-blur-lg" : "bg-card"}`}
      >
        <div className={`container-x flex items-center justify-between transition-all ${scrolled ? "h-16" : "h-20"}`}>
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
            {nav.map((n) =>
              n.to === "/services" ? (
                <div key={n.to} className="group relative">
                  <Link to="/services" className={`relative flex items-center gap-1 py-2 text-sm font-semibold ${isActive(n.to) ? "text-navy" : "text-foreground/75 hover:text-navy"}`}>
                    {n.label} <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-gold transition-all ${isActive(n.to) ? "w-full" : "w-0 group-hover:w-full"}`} />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full w-80 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    <div className="rounded-2xl border bg-card p-2 shadow-lift">
                      {services.map((s) => (
                        <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground/80 transition-colors hover:bg-gold-soft hover:text-navy">
                          <s.icon className="h-4 w-4 text-gold" /> {s.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link key={n.to} to={n.to} className={`group relative py-2 text-sm font-semibold ${isActive(n.to) ? "text-navy" : "text-foreground/75 hover:text-navy"}`}>
                  {n.label}
                  <span className={`absolute -bottom-0.5 left-0 h-0.5 bg-gold transition-all ${isActive(n.to) ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              ),
            )}
          </nav>
          <div className="flex items-center gap-3">
            <Button asChild variant="gold" size="xl" className="hidden md:inline-flex">
              <Link to="/contact">Book a Consultation <ArrowRight /></Link>
            </Button>
            <button onClick={() => setOpen(true)} className="rounded-xl p-2 text-navy lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[60] bg-navy-deep/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col overflow-y-auto bg-card p-6"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 260 }}
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 text-navy"><X className="h-6 w-6" /></button>
              </div>
              <nav className="mt-8 flex flex-col gap-1">
                {nav.map((n) => (
                  <Link key={n.to} to={n.to} className={`rounded-xl px-4 py-3 font-semibold ${isActive(n.to) ? "bg-gold-soft text-navy" : "text-foreground/80"}`}>{n.label}</Link>
                ))}
                <div className="mt-2 border-l-2 border-gold/40 pl-3">
                  {services.map((s) => (
                    <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="block py-1.5 text-sm text-muted-foreground hover:text-navy">{s.title}</Link>
                  ))}
                </div>
              </nav>
              <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/contact">Book a Consultation <ArrowRight /></Link></Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
