import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Check, Loader2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — RiskyDigitals" },
      { name: "description", content: "Tell us about your brand. We'll come back within 24 hours." },
      { property: "og:title", content: "Contact — RiskyDigitals" },
      { property: "og:description", content: "Start a conversation." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(2000),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setSending(false);
    if (error) {
      toast.error("Couldn't send. Try again.");
      return;
    }
    setDone(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    toast.success("Message sent. We'll reply within 24h.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Contact</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">Let's talk.</h1>
          <p className="mt-4 text-muted-foreground">
            Share the basics and we'll come back within 24 hours with next steps.
          </p>

          {done ? (
            <div className="mt-10 rounded-lg border border-border bg-muted/40 p-8 text-center">
              <Check className="mx-auto h-10 w-10 text-success mb-3" />
              <h2 className="font-display text-xl font-bold">Thanks — we got it.</h2>
              <p className="mt-2 text-sm text-muted-foreground">A real person will respond within 24 hours.</p>
              <button
                onClick={() => setDone(false)}
                className="mt-6 text-sm underline underline-offset-4"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-10 space-y-5">
              <Field label="Name" required>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={100}
                />
              </Field>
              <Field label="Email" required>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={255}
                />
              </Field>
              <Field label="Phone (optional)">
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  maxLength={40}
                />
              </Field>
              <Field label="Message" required>
                <textarea
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={2000}
                  placeholder="Tell us about your brand, goals, and timeline."
                />
              </Field>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 disabled:opacity-60"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                {sending ? "Sending..." : "Send message"}
              </button>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1.5 block">
        {label} {required && <span className="text-muted-foreground">*</span>}
      </span>
      {children}
    </label>
  );
}
