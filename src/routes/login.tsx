import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Lock, User, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth";
import { BrandLockup } from "@/components/Brand";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Lil Champ University Portal" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!matric || !password) {
      setErr("Please enter your matric number and password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      login(matric, password);
      navigate({ to: "/dashboard" });
    }, 600);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left visual */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "radial-gradient(circle at 30% 20%, white 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }} />
        <div className="relative">
          <BrandLockup />
        </div>
        <div className="relative">
          <h2 className="font-display text-5xl font-bold leading-tight">Welcome back, <span className="text-gold">Champion.</span></h2>
          <p className="mt-4 text-primary-foreground/80 max-w-md">Access your courses, results, fees and academic records — all in one secure portal.</p>
          <div className="mt-10 flex items-center gap-3 text-sm text-primary-foreground/70">
            <ShieldCheck className="h-5 w-5 text-gold" />
            Protected by LCU SecureAuth · ISO 27001
          </div>
        </div>
        <div className="relative text-xs text-primary-foreground/60">© {new Date().getFullYear()} Lil Champ University</div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center p-6 lg:p-12 bg-background">
        <div className="w-full max-w-md">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8">
            <ArrowLeft size={16} /> Back to homepage
          </Link>
          <div className="lg:hidden mb-8"><BrandLockup /></div>

          <h1 className="font-display text-3xl font-bold text-primary">Student Sign In</h1>
          <p className="text-muted-foreground text-sm mt-2">Enter your matriculation number and password to continue.</p>

          <form onSubmit={submit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="matric">Matriculation Number</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="matric" placeholder="LCU/CSC/2022/0451" value={matric} onChange={(e) => setMatric(e.target.value)} className="pl-10 h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-11" />
              </div>
            </div>

            {err && <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">{err}</div>}

            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary hover:bg-primary-glow font-semibold">
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-xs text-center text-muted-foreground bg-muted/50 rounded-md p-3">
              <strong className="text-foreground">Demo mode:</strong> any matric number + password works.
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            New to LCU? <a href="#" className="text-primary font-medium hover:underline">Apply for admission</a>
          </p>
        </div>
      </div>
    </div>
  );
}
