import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/PortalLayout";
import { semesters } from "@/lib/data";
import { Download, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_portal/results")({
  head: () => ({ meta: [{ title: "Results & Grades — LCU Portal" }] }),
  component: Results,
});

const gradeColor = (g: string) =>
  g === "A" ? "bg-success text-success-foreground" :
  g === "B" ? "bg-primary text-primary-foreground" :
  g === "C" ? "bg-gold text-gold-foreground" :
  g === "D" ? "bg-orange-500 text-white" :
  "bg-destructive text-destructive-foreground";

function Results() {
  const cgpa = (semesters.reduce((a, s) => a + s.gpa, 0) / semesters.length).toFixed(2);
  const totalUnits = semesters.flatMap((s) => s.results).reduce((a, r) => a + r.units, 0);
  const totalPoints = semesters.flatMap((s) => s.results).reduce((a, r) => a + r.point * r.units, 0);
  const classOfDegree = Number(cgpa) >= 4.5 ? "First Class" : Number(cgpa) >= 3.5 ? "Second Class Upper" : "Second Class Lower";

  return (
    <>
      <PageHeader
        title="Results & Grades"
        subtitle="View your academic performance across all semesters"
        actions={<Button variant="outline"><Download size={16} className="mr-2" /> Download Transcript</Button>}
      />

      {/* CGPA card */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-1 rounded-xl p-6 text-primary-foreground shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-hero)" }}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/70">
            <Award size={14} /> Cumulative GPA
          </div>
          <div className="font-display text-6xl font-bold mt-3">{cgpa}</div>
          <div className="text-sm text-primary-foreground/80 mt-1">out of 5.00</div>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold text-gold-foreground text-xs font-semibold">
            {classOfDegree}
          </div>
        </div>
        <div className="rounded-xl p-6 bg-card border shadow-[var(--shadow-card)]">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Credit Units</div>
          <div className="font-display text-4xl font-bold mt-3 text-primary">{totalUnits}</div>
          <div className="text-sm text-muted-foreground mt-2">Across {semesters.length} semesters</div>
        </div>
        <div className="rounded-xl p-6 bg-card border shadow-[var(--shadow-card)]">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Quality Points Earned</div>
          <div className="font-display text-4xl font-bold mt-3 text-primary">{totalPoints}</div>
          <div className="text-sm text-success mt-2 flex items-center gap-1">
            <TrendingUp size={14} /> Strong upward trend
          </div>
        </div>
      </div>

      {/* Semester results */}
      <div className="space-y-6">
        {semesters.map((sem) => (
          <div key={sem.name} className="bg-card border rounded-xl overflow-hidden shadow-[var(--shadow-card)]">
            <div className="p-5 border-b bg-secondary/30 flex items-center justify-between flex-wrap gap-3">
              <div>
                <h3 className="font-display text-lg font-bold text-primary">{sem.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{sem.results.length} courses · {sem.results.reduce((a, r) => a + r.units, 0)} units</p>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Semester GPA</div>
                <div className="font-display text-2xl font-bold text-primary">{sem.gpa.toFixed(2)}</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted/40">
                  <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3">Course</th>
                    <th className="px-5 py-3">Title</th>
                    <th className="px-5 py-3 text-center">Units</th>
                    <th className="px-5 py-3 text-center">CA</th>
                    <th className="px-5 py-3 text-center">Exam</th>
                    <th className="px-5 py-3 text-center">Total</th>
                    <th className="px-5 py-3 text-center">Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {sem.results.map((r) => (
                    <tr key={r.code} className="hover:bg-muted/30">
                      <td className="px-5 py-3 font-mono text-xs font-semibold">{r.code}</td>
                      <td className="px-5 py-3">{r.title}</td>
                      <td className="px-5 py-3 text-center">{r.units}</td>
                      <td className="px-5 py-3 text-center text-muted-foreground">{r.ca}</td>
                      <td className="px-5 py-3 text-center text-muted-foreground">{r.exam}</td>
                      <td className="px-5 py-3 text-center font-medium">{r.total}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`inline-block w-7 h-7 leading-7 rounded-full font-bold text-xs ${gradeColor(r.grade)}`}>{r.grade}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Grade key */}
      <div className="mt-8 p-5 bg-card border rounded-xl">
        <h4 className="font-semibold text-sm mb-3">Grading Scale</h4>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          {[
            { g: "A", r: "70 - 100", p: "5.0" },
            { g: "B", r: "60 - 69", p: "4.0" },
            { g: "C", r: "50 - 59", p: "3.0" },
            { g: "D", r: "45 - 49", p: "2.0" },
            { g: "F", r: "0 - 44", p: "0.0" },
          ].map((x) => (
            <div key={x.g} className="flex items-center gap-2">
              <span className={`inline-block w-7 h-7 leading-7 rounded-full text-center font-bold ${gradeColor(x.g)}`}>{x.g}</span>
              <div>
                <div className="font-medium">{x.r}</div>
                <div className="text-muted-foreground">{x.p} pts</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
