import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";
import mark from "@/assets/logo-mark.png";

export function FloatingActions() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-navy-foreground shadow-soft"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
      <a href={`tel:${siteConfig.phones[0]!.tel}`} aria-label="Call us" className="flex items-center justify-center rounded-full bg-navy p-3.5 text-navy-foreground shadow-soft">
        <Phone className="h-6 w-6" />
      </a>
      <a href={siteConfig.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="flex items-center justify-center rounded-full bg-primary p-3.5 text-primary-foreground shadow-soft">
        <MessageCircle className="h-6 w-6" />
      </a>
    </div>
  );
}

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 900);
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <motion.img src={mark} alt="" className="h-20 w-auto" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} />
          <motion.div className="mt-5 h-0.5 bg-gold" initial={{ width: 0 }} animate={{ width: 120 }} transition={{ duration: 0.8 }} />
          <p className="mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-navy">Chartered Firm</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
