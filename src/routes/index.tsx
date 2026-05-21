import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { ArrowRight, BarChart3, Target, Megaphone, Sparkles, Users, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RiskyDigitals — Digital Marketing That Compounds" },
      { name: "description", content: "RiskyDigitals builds growth systems for ambitious brands: paid ads, social, content, and lead generation that compound." },
      { property: "og:title", content: "RiskyDigitals — Digital Marketing That Compounds" },
      { property: "og:description", content: "Growth systems for ambitious brands." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Megaphone, title: "Social Media Management", desc: "Daily content, community, and reporting across every channel." },
  { icon: Target, title: "Paid Ads (Meta + Google)", desc: "ROAS-obsessed media buying with full-funnel creative testing." },
  { icon: Sparkles, title: "Brand Strategy", desc: "Positioning, messaging, and visual identity that actually converts." },
  { icon: BarChart3, title: "Content Creation", desc: "Short-form video, photography, copy — produced in-house." },
  { icon: Users, title: "Lead Generation Systems", desc: "Funnels, automations, and CRM pipelines that fill your calendar." },
  { icon: Zap, title: "Growth Sprints", desc: "90-day engagements with weekly experiments and clear KPIs." },
];

const testimonials = [
  { quote: "Doubled our qualified leads in 60 days. They actually understand performance.", name: "Adaeze O.", role: "Founder, Lumen Studio" },
  { quote: "Tight team, sharp creative, brutal honesty. Exactly what we needed.", name: "Marcus B.", role: "Head of Marketing, Stride" },
  { quote: "Our paid ROAS went from 1.4x to 4.8x in one quarter.", name: "Lena K.", role: "CEO, NorthRoot" },
];

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />

      {/* Hero */}
      <section className="px-4 sm:px-6 pt-20 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
            Now booking Q3 engagements
          </div>
          <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight leading-[1.05]">
            Digital marketing<br />that <span className="italic">compounds</span>.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            We build paid, organic, and lifecycle systems for ambitious brands. Every dollar is measured. Every experiment is documented.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90"
            >
              Start a Campaign <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-md border border-border px-6 py-3 text-sm font-medium hover:bg-accent"
            >
              See what we do
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 sm:px-6 py-20 border-t border-border">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Services</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold">What we do</h2>
            </div>
            <Link to="/services" className="text-sm underline underline-offset-4">All services →</Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {services.map((s) => (
              <div key={s.title} className="bg-background p-6">
                <s.icon className="h-5 w-5 mb-4" />
                <h3 className="font-semibold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-4 sm:px-6 py-20 border-t border-border bg-muted/30">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Clients</p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-12">Don't take our word for it</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-lg border border-border bg-background p-6">
                <blockquote className="text-sm leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-4 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-24 border-t border-border">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold">Ready to grow?</h2>
          <p className="mt-4 text-muted-foreground">Tell us about your brand. We'll come back within 24 hours.</p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Start a Campaign <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
