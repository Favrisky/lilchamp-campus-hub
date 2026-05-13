import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, BookOpen, Award, Users, Building2, Globe2 } from "lucide-react";
import { BrandLockup } from "@/components/Brand";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lil Champ University — Knowledge, Honour, Service" },
      { name: "description", content: "Lil Champ University is a leading Nigerian institution committed to academic excellence, innovation and character development." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 backdrop-blur bg-background/80 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 lg:px-8 h-16">
          <BrandLockup />
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#programs" className="hover:text-primary">Programs</a>
            <a href="#admissions" className="hover:text-primary">Admissions</a>
            <a href="#campus" className="hover:text-primary">Campus Life</a>
          </nav>
          <Link to="/login">
            <Button className="bg-primary hover:bg-primary-glow">Student Portal</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 80% 70%, white 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-24 lg:py-32 text-primary-foreground">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs uppercase tracking-widest mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" /> Established 2008 · Ogun State, Nigeria
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Shaping <span className="text-gold">Champions</span> for Africa & the world.
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-primary-foreground/80 max-w-2xl">
              A community of over 12,000 students across 8 faculties, pursuing world-class research, innovation and ethical leadership.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/login">
                <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold">
                  Access Student Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <a href="#programs">
                <Button size="lg" variant="outline" className="bg-transparent border-white/30 text-primary-foreground hover:bg-white/10">
                  Explore Programs
                </Button>
              </a>
            </div>

            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl">
              {[
                { n: "12k+", l: "Students" },
                { n: "8", l: "Faculties" },
                { n: "450+", l: "Faculty Members" },
                { n: "94%", l: "Graduate Employment" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl lg:text-4xl font-bold text-gold">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">About the University</div>
            <h2 className="font-display text-4xl font-bold text-primary leading-tight">
              A tradition of excellence, rooted in African values.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Lil Champ University (LCU) was founded with a singular mission: to nurture intellectually rigorous, morally upright and socially responsible graduates. Accredited by the National Universities Commission (NUC), we offer programmes that blend international best practice with deep local relevance.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { i: Award, t: "NUC Accredited" },
                { i: Globe2, t: "Global Partnerships" },
                { i: Users, t: "Mentorship Culture" },
                { i: Building2, t: "Modern Campus" },
              ].map(({ i: Icon, t }) => (
                <div key={t} className="flex items-center gap-3 p-4 rounded-lg border bg-card">
                  <div className="h-10 w-10 rounded-md bg-primary/10 grid place-items-center text-primary"><Icon size={20} /></div>
                  <div className="text-sm font-medium">{t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-[var(--gradient-primary)] p-1 shadow-[var(--shadow-elegant)]">
              <div className="h-full w-full rounded-[14px] bg-card p-8 flex flex-col justify-between">
                <GraduationCap className="h-12 w-12 text-gold" />
                <div>
                  <div className="font-display text-2xl font-bold text-primary leading-tight">"Education is the most powerful weapon for transforming our nation."</div>
                  <div className="mt-4 text-sm text-muted-foreground">— Prof. Adekunle Ajayi, Vice-Chancellor</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-gold text-gold-foreground rounded-xl px-6 py-4 shadow-[var(--shadow-elegant)]">
              <div className="font-display text-3xl font-bold">17</div>
              <div className="text-xs uppercase tracking-wider">Years of impact</div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="bg-secondary/50 py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mb-12">
            <div className="text-xs uppercase tracking-widest text-gold font-semibold mb-3">Faculties & Programs</div>
            <h2 className="font-display text-4xl font-bold text-primary">Eight faculties. Endless possibilities.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: "Sciences", c: "24 programmes" },
              { n: "Engineering", c: "11 programmes" },
              { n: "Arts & Humanities", c: "18 programmes" },
              { n: "Social Sciences", c: "16 programmes" },
              { n: "Law", c: "Common & Civil Law" },
              { n: "Medicine & Health", c: "9 programmes" },
              { n: "Management Sciences", c: "12 programmes" },
              { n: "Education", c: "14 programmes" },
            ].map((f) => (
              <div key={f.n} className="group p-6 rounded-xl bg-card border hover:border-primary/40 hover:shadow-[var(--shadow-card)] transition-all cursor-pointer">
                <BookOpen className="h-7 w-7 text-primary mb-4" />
                <div className="font-display text-lg font-bold">Faculty of {f.n}</div>
                <div className="text-sm text-muted-foreground mt-1">{f.c}</div>
                <div className="mt-4 text-sm font-medium text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="admissions" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="rounded-2xl p-10 lg:p-16 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl lg:text-5xl font-bold leading-tight">Ready to begin your journey?</h2>
            <p className="mt-4 text-primary-foreground/80 text-lg">Existing students can sign in to register courses, check results, pay fees and manage their profile.</p>
            <Link to="/login" className="inline-block mt-8">
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-gold-foreground font-semibold">
                Sign in to Portal <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-10 flex flex-wrap justify-between gap-6 text-sm text-muted-foreground">
          <div>
            <BrandLockup />
            <p className="mt-3 max-w-xs">Km 12, Sagamu–Abeokuta Expressway, Ogun State, Nigeria.</p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">Contact</div>
            <p>admissions@lilchamp.edu.ng</p>
            <p>+234 700 LIL CHAMP</p>
          </div>
          <div>
            <div className="font-semibold text-foreground mb-2">Portal</div>
            <Link to="/login" className="block hover:text-primary">Student Login</Link>
            <a href="#" className="block hover:text-primary">Staff Portal</a>
          </div>
        </div>
        <div className="border-t py-4 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Lil Champ University. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
