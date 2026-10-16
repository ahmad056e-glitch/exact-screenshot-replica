import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, y = 16, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  align = "center",
  light = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "left";
  light?: boolean;
}) {
  const center = align === "center";
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold leading-tight md:text-4xl ${light ? "text-navy-foreground" : "text-navy"}`}>
        {title}
      </h2>
            {text && (
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-navy-foreground/75" : "text-muted-foreground"}`}>{text}</p>
      )}
    </Reveal>
  );
}

export function IconBadge({ icon: Icon, tone = "light" }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; size?: "sm" | "md" | "lg"; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "bg-gold/15 text-gold" : "bg-gold/10 text-gold";
  return (
    <span className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-[14px] ${base} transition-colors duration-300 group-hover:bg-gold group-hover:text-primary-foreground`}>
      <Icon className="h-6 w-6" strokeWidth={1.5} />
    </span>
  );
}
