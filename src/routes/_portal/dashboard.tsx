import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/PortalLayout";
import { useEffect, useState } from "react";
import { getStudent, defaultStudent, type Student } from "@/lib/auth";
import { announcements, semesters, fees } from "@/lib/data";
import { BookOpen, GraduationCap, Wallet, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_portal/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — LCU Portal" }] }),
  component: Dashboard,
});

function Dashboard() {
  const [student, setStudent] = useState<Student>(defaultStudent);
  useEffect(() => { const s = getStudent(); if (s) setStudent(s); }, []);

  const cgpa = (semesters.reduce((a, s) => a + s.gpa, 0) / semesters.length).toFixed(2);
  const outstanding = fees.filter((f) => f.status === "Pending").reduce((a, f) => a + f.amount, 0);

  const stats = [
    { label: "Current CGPA", value: cgpa, sub: "Out of 5.00", icon: TrendingUp, tone: "primary" },
    { label: "Registered Units", value: "21", sub: "First semester", icon: BookOpen, tone: "gold" },
    { label: "Outstanding Fees", value: `₦${outstanding.toLocaleString()}`, sub: "Due this semester", icon: Wallet, tone: "destructive" },
    { label: "Academic Level", value: student.level, sub: student.department, icon: GraduationCap, tone: "primary" },
  ];

  return (
    <>
      <PageHeader title={`Welcome, ${student.name.split(" ")[0]}.`} subtitle="Here's a snapshot of your academic life today." />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="bg-card rounded-xl p-5 border shadow-[var(--shadow-card)]">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                  <div className="font-display text-2xl lg:text-3xl font-bold mt-2 text-primary">{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.sub}</div>
                </div>
                <div className={`h-10 w-10 rounded-md grid place-items-center ${
                  s.tone === "gold" ? "bg-gold/15 text-gold-foreground" :
                  s.tone === "destructive" ? "bg-destructive/10 text-destructive" :
                  "bg-primary/10 text-primary"
                }`}>
                  <Icon size={18} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Quick actions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-xl border p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display text-lg font-bold">Quick Actions</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { to: "/courses", label: "Register Courses", icon: BookOpen, desc: "Add or drop courses for the semester" },
                { to: "/results", label: "Check Results", icon: GraduationCap, desc: "View grades & GPA breakdown" },
                { to: "/fees", label: "Pay Fees", icon: Wallet, desc: `Outstanding: ₦${outstanding.toLocaleString()}` },
                { to: "/profile", label: "Update Profile", icon: Calendar, desc: "Personal & contact information" },
              ].map((a) => {
                const Icon = a.icon;
                return (
                  <Link key={a.to} to={a.to} className="group flex items-start gap-3 p-4 rounded-lg border hover:border-primary hover:bg-primary/5 transition-all">
                    <div className="h-9 w-9 rounded-md bg-primary text-primary-foreground grid place-items-center shrink-0"><Icon size={16} /></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm flex items-center justify-between">
                        {a.label}
                        <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">{a.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Schedule */}
          <div className="bg-card rounded-xl border p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-lg font-bold mb-4">Today's Schedule</h3>
            <div className="space-y-3">
              {[
                { time: "08:00 — 10:00", course: "CSC311 — Database Management", room: "LT 4", color: "bg-primary" },
                { time: "10:00 — 12:00", course: "CSC301 — Data Structures", room: "LT 2", color: "bg-gold" },
                { time: "14:00 — 16:00", course: "MTH301 — Linear Algebra II", room: "Block C, Rm 18", color: "bg-success" },
              ].map((c) => (
                <div key={c.course} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                  <div className={`w-1 h-12 rounded-full ${c.color}`} />
                  <div className="flex-1">
                    <div className="font-medium text-sm">{c.course}</div>
                    <div className="text-xs text-muted-foreground">{c.room}</div>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">{c.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Announcements */}
        <div className="bg-card rounded-xl border p-6 shadow-[var(--shadow-card)] h-fit">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold">Announcements</h3>
            <span className="text-xs text-muted-foreground">{announcements.length} new</span>
          </div>
          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a.title} className="border-l-2 border-gold pl-4 py-1">
                <div className="text-xs text-muted-foreground">{a.date}</div>
                <div className="font-medium text-sm mt-0.5">{a.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{a.body}</div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-5">View all notices</Button>
        </div>
      </div>
    </>
  );
}
