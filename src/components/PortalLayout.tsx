import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, BookOpen, GraduationCap, Wallet, UserRound, LogOut, Menu, X, Bell } from "lucide-react";
import { BrandLockup } from "./Brand";
import { getStudent, logout, type Student } from "@/lib/auth";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/courses", label: "Course Registration", icon: BookOpen },
  { to: "/results", label: "Results & Grades", icon: GraduationCap },
  { to: "/fees", label: "Fees Payment", icon: Wallet },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function PortalLayout() {
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [student, setStudent] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const s = getStudent();
    if (!s) navigate({ to: "/login" });
    else setStudent(s);
  }, [navigate]);

  if (!student) return null;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-muted/40">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gold grid place-items-center text-gold-foreground font-display font-bold">L</div>
            <div>
              <div className="font-display font-bold">Lil Champ</div>
              <div className="text-[10px] uppercase tracking-widest text-primary-foreground/60">Student Portal</div>
            </div>
          </div>
          <button className="lg:hidden text-primary-foreground/80" onClick={() => setOpen(false)}><X size={20} /></button>
        </div>

        <div className="p-4">
          <div className="rounded-lg bg-white/5 p-3 mb-4">
            <div className="text-xs text-primary-foreground/60">Signed in as</div>
            <div className="font-medium text-sm truncate">{student.name}</div>
            <div className="text-xs text-primary-foreground/70 mt-0.5">{student.matric}</div>
          </div>

          <nav className="space-y-1">
            {nav.map((item) => {
              const active = path === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                    active ? "bg-gold text-gold-foreground font-medium" : "text-primary-foreground/80 hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-primary-foreground/80 hover:bg-destructive/80 hover:text-destructive-foreground transition-colors"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:pl-72">
        <header className="h-16 bg-card border-b flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setOpen(true)}><Menu /></button>
            <div className="hidden md:block">
              <div className="text-xs text-muted-foreground">2024/2025 Academic Session</div>
              <div className="font-medium text-sm">First Semester · Week 8</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <div className="h-9 w-9 rounded-full bg-[var(--gradient-primary)] grid place-items-center text-primary-foreground text-sm font-medium">
              {student.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}
    </div>
  );
}

export function PageHeader({ title, subtitle, actions }: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-primary">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {actions}
    </div>
  );
}

export { Button };
