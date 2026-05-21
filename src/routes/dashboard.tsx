import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, signOut } from "@/lib/auth";
import { Logo } from "@/components/Logo";
import { toast } from "sonner";
import { Loader2, LogOut, Users, Inbox, Briefcase, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Admin Dashboard — RiskyDigitals" }] }),
  component: DashboardPage,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "NEW" | "CONTACTED" | "CLOSED";
  created_at: string;
};

type Campaign = {
  id: string;
  business_name: string;
  contact_email: string;
  budget: number;
  goal: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  created_at: string;
};

function DashboardPage() {
  const { user, role, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [loading, user, navigate]);

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (role && !isAdmin) {
    return <NotAdmin email={user.email ?? ""} />;
  }

  return <AdminConsole />;
}

function NotAdmin({ email }: { email: string }) {
  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Topbar email={email} />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <ShieldAlert className="mx-auto h-10 w-10 text-muted-foreground mb-4" />
          <h1 className="font-display text-2xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account doesn't have admin privileges. Ask a workspace admin to grant you the <code className="px-1 rounded bg-muted">admin</code> role.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{email}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function AdminConsole() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const [l, c] = await Promise.all([
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
      supabase.from("campaign_requests").select("*").order("created_at", { ascending: false }),
    ]);
    if (l.error) toast.error("Couldn't load leads");
    if (c.error) toast.error("Couldn't load campaigns");
    setLeads((l.data as Lead[]) ?? []);
    setCampaigns((c.data as Campaign[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { refresh(); }, []);

  const updateLead = async (id: string, status: Lead["status"]) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    setLeads((ls) => ls.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Lead updated");
  };

  const updateCampaign = async (id: string, status: Campaign["status"]) => {
    const { error } = await supabase.from("campaign_requests").update({ status }).eq("id", id);
    if (error) return toast.error("Update failed");
    setCampaigns((cs) => cs.map((x) => (x.id === id ? { ...x, status } : x)));
    toast.success("Campaign updated");
  };

  const stats = {
    total: leads.length,
    newCount: leads.filter((l) => l.status === "NEW").length,
    contacted: leads.filter((l) => l.status === "CONTACTED").length,
    campaigns: campaigns.length,
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Topbar email={user?.email ?? ""} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <div className="flex items-end justify-between flex-wrap gap-3 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-1">Manage leads, requests, and pipeline.</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Stat icon={Inbox} label="Total leads" value={stats.total} />
          <Stat icon={Users} label="New leads" value={stats.newCount} accent />
          <Stat icon={Users} label="Contacted" value={stats.contacted} />
          <Stat icon={Briefcase} label="Campaign requests" value={stats.campaigns} />
        </div>

        <Section title="Leads" desc="From the public contact form.">
          {loading ? (
            <Skeleton />
          ) : leads.length === 0 ? (
            <Empty msg="No leads yet." />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-background">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Name</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Phone</th>
                    <th className="px-4 py-3 font-medium">Message</th>
                    <th className="px-4 py-3 font-medium">Received</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((l) => (
                    <tr key={l.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium">{l.name}</td>
                      <td className="px-4 py-3"><a href={`mailto:${l.email}`} className="underline underline-offset-2">{l.email}</a></td>
                      <td className="px-4 py-3 text-muted-foreground">{l.phone ?? "—"}</td>
                      <td className="px-4 py-3 max-w-xs truncate text-muted-foreground" title={l.message}>{l.message}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(l.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <select
                          value={l.status}
                          onChange={(e) => updateLead(l.id, e.target.value as Lead["status"])}
                          className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                        >
                          <option value="NEW">NEW</option>
                          <option value="CONTACTED">CONTACTED</option>
                          <option value="CLOSED">CLOSED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>

        <Section title="Campaign Requests" desc="Brands looking to launch with us.">
          {loading ? (
            <Skeleton />
          ) : campaigns.length === 0 ? (
            <Empty msg="No campaign requests yet." />
          ) : (
            <div className="overflow-x-auto rounded-lg border border-border bg-background">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-xs text-muted-foreground">
                    <th className="px-4 py-3 font-medium">Business</th>
                    <th className="px-4 py-3 font-medium">Email</th>
                    <th className="px-4 py-3 font-medium">Budget</th>
                    <th className="px-4 py-3 font-medium">Goal</th>
                    <th className="px-4 py-3 font-medium">Received</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium">{c.business_name}</td>
                      <td className="px-4 py-3">{c.contact_email}</td>
                      <td className="px-4 py-3">${Number(c.budget).toLocaleString()}</td>
                      <td className="px-4 py-3 max-w-xs truncate text-muted-foreground" title={c.goal}>{c.goal}</td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{new Date(c.created_at).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <select
                          value={c.status}
                          onChange={(e) => updateCampaign(c.id, e.target.value as Campaign["status"])}
                          className="rounded-md border border-input bg-background px-2 py-1 text-xs"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="APPROVED">APPROVED</option>
                          <option value="REJECTED">REJECTED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      </main>
    </div>
  );
}

function Topbar({ email }: { email: string }) {
  const navigate = useNavigate();
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo />
          <span className="hidden sm:inline text-xs uppercase tracking-widest text-muted-foreground">Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground hidden sm:inline">View site</Link>
          <span className="text-sm text-muted-foreground hidden md:inline">{email}</span>
          <button
            onClick={async () => { await signOut(); navigate({ to: "/" }); }}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </div>
    </header>
  );
}

function Stat({ icon: Icon, label, value, accent }: { icon: any; label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-lg border border-border p-5 ${accent ? "bg-foreground text-background" : "bg-background"}`}>
      <div className="flex items-center justify-between">
        <span className={`text-xs uppercase tracking-widest ${accent ? "text-background/70" : "text-muted-foreground"}`}>{label}</span>
        <Icon className="h-4 w-4 opacity-60" />
      </div>
      <div className="mt-3 text-3xl font-display font-bold">{value}</div>
    </div>
  );
}

function Section({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-4">
        <h2 className="font-display text-xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      {children}
    </section>
  );
}

function Skeleton() {
  return <div className="h-32 rounded-lg border border-border bg-background animate-pulse" />;
}

function Empty({ msg }: { msg: string }) {
  return <div className="rounded-lg border border-dashed border-border bg-background p-10 text-center text-sm text-muted-foreground">{msg}</div>;
}
