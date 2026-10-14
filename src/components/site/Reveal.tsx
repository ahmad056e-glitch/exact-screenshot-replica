import { motion, type HTMLMotionProps } from "framer-motion";

export function Reveal({ delay = 0, y = 28, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
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
      <h2 className={`mt-3 text-4xl font-semibold leading-tight md:text-5xl ${light ? "text-navy-foreground" : "text-navy"}`}>
        {title}
      </h2>
      <div className={`mt-5 h-px w-20 bg-gold ${center ? "mx-auto" : ""}`} />
      {text && (
        <p className={`mt-5 text-base leading-relaxed ${light ? "text-navy-foreground/75" : "text-muted-foreground"}`}>{text}</p>
      )}
    </Reveal>
  );
}

export function IconBadge({ icon: Icon, size = "md", tone = "light" }: { icon: React.ComponentType<{ className?: string }>; size?: "sm" | "md" | "lg"; tone?: "light" | "dark" }) {
  const dims = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-10 w-10" : "h-14 w-14";
  const ic = size === "lg" ? "h-7 w-7" : size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const base = tone === "dark" ? "bg-navy-foreground/10 text-gold" : "bg-gold-soft text-navy";
  return (
    <span className={`inline-flex ${dims} shrink-0 items-center justify-center rounded-2xl ${base} transition-all duration-500 group-hover:-translate-y-1 group-hover:rotate-6 group-hover:bg-gold group-hover:text-gold-foreground`}>
      <Icon className={ic} />
    </span>
  );
}
