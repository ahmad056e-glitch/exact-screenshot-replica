import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Loader2, UploadCloud, X, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { services } from "@/config/siteConfig";

const schema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(40).regex(/^[+\d\s()-]+$/, "Digits only, please"),
  service: z.string().min(1, "Please choose a service"),
  message: z.string().trim().min(10, "Please write a few words about your requirement").max(5000),
  website: z.string().max(0).optional(),
});
type Values = z.infer<typeof schema>;

const ALLOWED = ["pdf", "doc", "docx", "xls", "xlsx", "jpg", "jpeg", "png"];
const MAX = 10 * 1024 * 1024;
const COOLDOWN_KEY = "sa_last_submit";

type FileItem = { file: File; state: "ready" | "uploading" | "done" | "error" };

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [drag, setDrag] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { full_name: "", email: "", phone: "", service: "", message: "", website: "" },
  });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFileError("");
    const next = [...files];
    for (const f of Array.from(list)) {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      if (!ALLOWED.includes(ext)) { setFileError(`${f.name}: file type not allowed`); continue; }
      if (f.size > MAX) { setFileError(`${f.name}: larger than 10 MB`); continue; }
      if (next.length >= 3) { setFileError("You can attach up to 3 files"); break; }
      next.push({ file: f, state: "ready" });
    }
    setFiles(next);
  };

  const onSubmit = async (v: Values) => {
    if (v.website) return; // honeypot
    const last = Number(localStorage.getItem(COOLDOWN_KEY) || 0);
    if (Date.now() - last < 60_000) {
      setStatus("error");
      setErrMsg("Please wait a minute before sending another message.");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    const id = crypto.randomUUID();
    const { error } = await supabase.from("contact_messages").insert({
      id, full_name: v.full_name, email: v.email, phone: v.phone, service: v.service, message: v.message,
    });
    if (error) {
      setStatus("error");
      setErrMsg("We couldn't send your message. Please try again or call us directly.");
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const f = files[i].file;
      setFiles((p) => p.map((x, j) => (j === i ? { ...x, state: "uploading" } : x)));
      const safe = f.name.replace(/[^\w.-]+/g, "_").slice(-100);
      const path = `messages/${id}/${crypto.randomUUID()}-${safe}`;
      const up = await supabase.storage.from("client-uploads").upload(path, f, { contentType: f.type || undefined });
      let ok = !up.error;
      if (ok) {
        const r = await supabase.from("message_files").insert({ message_id: id, file_path: path, file_name: f.name, mime_type: f.type, size_bytes: f.size });
        ok = !r.error;
      }
      setFiles((p) => p.map((x, j) => (j === i ? { ...x, state: ok ? "done" : "error" } : x)));
    }
    localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
    setStatus("success");
    reset();
    setTimeout(() => setFiles([]), 800);
  };

  const field = "h-12 rounded-xl bg-card";
  const err = (m?: string) => m && <p className="mt-1.5 text-xs text-destructive">{m}</p>;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center py-14 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-soft text-gold">
              <CheckCircle2 className="h-11 w-11" />
            </motion.div>
            <h3 className="mt-6 text-3xl font-semibold text-navy">Message sent</h3>
            <p className="mt-2 text-muted-foreground">Thank you. Our team will contact you shortly.</p>
            <Button variant="outlineNavy" size="xl" className="mt-8" onClick={() => setStatus("idle")}>Send another message</Button>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" {...register("website")} />
            <div className={`grid gap-4 ${compact ? "" : "md:grid-cols-2"}`}>
              <div><Input placeholder="Full Name *" aria-label="Full name" className={field} {...register("full_name")} />{err(errors.full_name?.message)}</div>
              <div><Input type="email" placeholder="Email *" aria-label="Email" className={field} {...register("email")} />{err(errors.email?.message)}</div>
              <div><Input type="tel" placeholder="Phone *" aria-label="Phone" className={field} {...register("phone")} />{err(errors.phone?.message)}</div>
              <div>
                <Controller control={control} name="service" render={({ field: f }) => (
                  <Select value={f.value} onValueChange={f.onChange}>
                    <SelectTrigger className={`${field} w-full`} aria-label="I would like to consult"><SelectValue placeholder="I would like to consult: *" /></SelectTrigger>
                    <SelectContent>{services.map((s) => <SelectItem key={s.slug} value={s.title}>{s.title}</SelectItem>)}</SelectContent>
                  </Select>
                )} />
                {err(errors.service?.message)}
              </div>
            </div>
            <div><Textarea placeholder="Your message *" aria-label="Message" rows={5} className="rounded-xl bg-card" {...register("message")} />{err(errors.message?.message)}</div>

            <div
              onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => { e.preventDefault(); setDrag(false); addFiles(e.dataTransfer.files); }}
              onClick={() => inputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
              role="button" tabIndex={0}
              className={`flex cursor-pointer flex-col items-center rounded-xl border-2 border-dashed px-4 py-6 text-center transition-colors ${drag ? "border-gold bg-gold-soft" : "border-border bg-card/60 hover:border-gold"}`}
            >
              <UploadCloud className="h-7 w-7 text-gold" />
              <p className="mt-2 text-sm font-semibold text-navy">Attach files (optional)</p>
              <p className="text-xs text-muted-foreground">Drag & drop or click · PDF, DOC, DOCX, XLS, XLSX, JPG, PNG · max 10 MB · up to 3 files</p>
              <input ref={inputRef} type="file" multiple hidden accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            </div>
            {fileError && <p className="text-xs text-destructive">{fileError}</p>}
            {files.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {files.map((f, i) => (
                  <span key={i} className="flex items-center gap-2 rounded-full bg-gold-soft px-3 py-1.5 text-xs text-navy">
                    {f.state === "uploading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : f.state === "done" ? <CheckCircle2 className="h-3.5 w-3.5 text-gold" /> : <FileText className="h-3.5 w-3.5" />}
                    {f.file.name} · {(f.file.size / 1024 / 1024).toFixed(1)} MB
                    {status !== "sending" && <button type="button" aria-label={`Remove ${f.file.name}`} onClick={() => setFiles(files.filter((_, j) => j !== i))}><X className="h-3.5 w-3.5" /></button>}
                  </span>
                ))}
              </div>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive"><AlertCircle className="h-4 w-4" /> {errMsg}</p>
            )}
            <Button type="submit" variant="gold" size="xl" disabled={status === "sending"} className="w-full md:w-auto">
              {status === "sending" ? <><Loader2 className="animate-spin" /> Sending…</> : <>Send Request <ArrowRight /></>}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
