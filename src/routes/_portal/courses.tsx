import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PortalLayout";
import { availableCourses } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Check, Clock, User2, BookMarked, AlertCircle, Trash2, Printer } from "lucide-react";

export const Route = createFileRoute("/_portal/courses")({
  head: () => ({ meta: [{ title: "Course Registration — LCU Portal" }] }),
  component: Courses,
});

const MIN = 15;
const MAX = 24;

function Courses() {
  const [selected, setSelected] = useState<string[]>(["CSC301", "CSC305", "CSC311", "CSC321", "MTH301"]);
  const [submitted, setSubmitted] = useState(false);

  const totalUnits = availableCourses.filter((c) => selected.includes(c.code)).reduce((a, c) => a + c.units, 0);
  const toggle = (code: string) => {
    setSubmitted(false);
    setSelected((s) => (s.includes(code) ? s.filter((x) => x !== code) : [...s, code]));
  };

  const valid = totalUnits >= MIN && totalUnits <= MAX;

  return (
    <>
      <PageHeader
        title="Course Registration"
        subtitle="2024/2025 Academic Session · First Semester"
        actions={
          <Button variant="outline" disabled={!submitted}>
            <Printer size={16} className="mr-2" /> Print Course Form
          </Button>
        }
      />

      {/* Status banner */}
      <div className={`rounded-xl border p-4 mb-6 flex items-center gap-4 ${
        valid ? "bg-success/10 border-success/30" : "bg-destructive/10 border-destructive/30"
      }`}>
        <div className={`h-10 w-10 rounded-md grid place-items-center ${valid ? "bg-success text-success-foreground" : "bg-destructive text-destructive-foreground"}`}>
          {valid ? <Check size={20} /> : <AlertCircle size={20} />}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-sm">
            {valid ? "Unit load is valid." : `Unit load must be between ${MIN} and ${MAX}.`}
          </div>
          <div className="text-xs text-muted-foreground">
            Selected: <strong>{selected.length} courses</strong> · <strong>{totalUnits} units</strong>
          </div>
        </div>
        <div className="font-display text-2xl font-bold text-primary">{totalUnits}<span className="text-sm text-muted-foreground">/{MAX}</span></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Available courses */}
        <div className="lg:col-span-2 bg-card border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
          <div className="p-5 border-b flex items-center justify-between">
            <div>
              <h3 className="font-display text-lg font-bold">Available Courses</h3>
              <p className="text-xs text-muted-foreground mt-0.5">Tick courses to add them to your registration</p>
            </div>
            <BookMarked className="text-primary" />
          </div>
          <div className="divide-y">
            {availableCourses.map((c) => {
              const checked = selected.includes(c.code);
              return (
                <label key={c.code} className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${checked ? "bg-primary/5" : "hover:bg-muted/40"}`}>
                  <input type="checkbox" checked={checked} onChange={() => toggle(c.code)} className="h-4 w-4 accent-primary" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-primary text-primary-foreground">{c.code}</span>
                      <span className="font-medium text-sm">{c.title}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1"><User2 size={12} /> {c.lecturer}</span>
                      <span className="inline-flex items-center gap-1"><Clock size={12} /> {c.schedule}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-lg font-bold text-primary">{c.units}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground">units</div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Cart */}
        <div className="bg-card border rounded-xl shadow-[var(--shadow-card)] h-fit sticky top-20">
          <div className="p-5 border-b">
            <h3 className="font-display text-lg font-bold">Your Selection</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{selected.length} courses · {totalUnits} units</p>
          </div>
          <div className="p-5 space-y-2 max-h-96 overflow-auto">
            {selected.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No courses selected yet.</p>}
            {availableCourses.filter((c) => selected.includes(c.code)).map((c) => (
              <div key={c.code} className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                <div className="flex-1 min-w-0">
                  <div className="font-mono text-xs font-semibold">{c.code}</div>
                  <div className="text-xs text-muted-foreground truncate">{c.title}</div>
                </div>
                <div className="text-xs font-medium">{c.units}u</div>
                <button onClick={() => toggle(c.code)} className="text-muted-foreground hover:text-destructive"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
          <div className="p-5 border-t space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Units</span>
              <span className="font-display font-bold text-lg text-primary">{totalUnits}</span>
            </div>
            <Button
              onClick={() => valid && setSubmitted(true)}
              disabled={!valid}
              className="w-full bg-primary hover:bg-primary-glow"
            >
              {submitted ? "✓ Registration Submitted" : "Submit Registration"}
            </Button>
            {submitted && <p className="text-xs text-success text-center">Awaiting Level Adviser approval.</p>}
          </div>
        </div>
      </div>
    </>
  );
}
