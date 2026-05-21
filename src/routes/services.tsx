import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { ArrowRight, Megaphone, Target, Sparkles, BarChart3, Users } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — RiskyDigitals" },
      { name: "description", content: "Social media, paid ads, brand strategy, content, and lead generation systems." },
      { property: "og:title", content: "Services — RiskyDigitals" },
      { property: "og:description", content: "Everything we do, in detail." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Megaphone,
    title: "Social Media Management",
    desc: "Daily content production, community management, and weekly reporting across Instagram, TikTok, LinkedIn, and X. We handle strategy, creative, scheduling, and engagement end-to-end.",
    bullets: ["Editorial calendars", "Native short-form video", "Community DMs & comments", "Monthly performance reviews"],
  },
  {
    icon: Target,
    title: "Paid Ads — Meta + Google",
    desc: "Performance media buying with full-funnel creative testing. We obsess over ROAS, CAC, and creative iteration velocity.",
    bullets: ["Meta Ads (Facebook + Instagram)", "Google Ads (Search, PMax, YouTube)", "Creative testing frameworks", "Weekly experimentation"],
  },
  {
    icon: Sparkles,
    title: "Brand Strategy",
    desc: "Positioning, messaging architecture, and visual identity work that gives your marketing something worth amplifying.",
    bullets: ["Brand positioning workshops", "Messaging hierarchy", "Visual identity systems", "Tone-of-voice guidelines"],
  },
  {
    icon: BarChart3,
    title: "Content Creation",
    desc: "In-house production of short-form video, photography, and copy. We staff the shoot, edit the cuts, and ship to your channels.",
    bullets: ["UGC-style short-form video", "Product & lifestyle photography", "Long-form copy & email", "On-demand creative sprints"],
  },
  {
    icon: Users,
    title: "Lead Generation Systems",
    desc: "Landing pages, funnels, lifecycle email, and CRM automation that turn paid traffic into qualified pipeline.",
    bullets: ["High-intent landing pages", "Lead magnets & gated assets", "Email + SMS sequences", "CRM pipeline build-out"],
  },
];

function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <section className="px-4 sm:px-6 py-20">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Services</p>
          <h1 className="font-display text-4xl sm:text-6xl font-bold tracking-tight">Everything we do.</h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Pick one service or bundle the system. Every engagement starts with a paid discovery sprint.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 pb-20">
        <div className="mx-auto max-w-4xl space-y-px bg-border border border-border rounded-lg overflow-hidden">
          {services.map((s) => (
            <div key={s.title} className="bg-background p-8 grid md:grid-cols-[1fr_2fr] gap-6">
              <div>
                <s.icon className="h-6 w-6 mb-3" />
                <h2 className="font-display text-xl font-bold">{s.title}</h2>
              </div>
              <div>
                <p className="text-muted-foreground">{s.desc}</p>
                <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-foreground shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-4xl mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90"
          >
            Start a Campaign <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
