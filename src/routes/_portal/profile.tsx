import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/PortalLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { defaultStudent, getStudent, updateStudent, type Student } from "@/lib/auth";
import { Mail, Phone, MapPin, GraduationCap, Calendar, User2, CheckCircle2, Pencil, Save } from "lucide-react";

export const Route = createFileRoute("/_portal/profile")({
  head: () => ({ meta: [{ title: "My Profile — LCU Portal" }] }),
  component: Profile,
});

function Profile() {
  const [student, setStudent] = useState<Student>(defaultStudent);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState<Student>(defaultStudent);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const s = getStudent() ?? defaultStudent;
    setStudent(s);
    setForm(s);
  }, []);

  const save = () => {
    const next = updateStudent(form);
    setStudent(next);
    setEdit(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const initials = student.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  const field = (k: keyof Student, label: string, icon: any) => {
    const Icon = icon;
    return (
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1.5"><Icon size={12} /> {label}</div>
        {edit ? (
          <Input value={String(form[k] ?? "")} onChange={(e) => setForm({ ...form, [k]: e.target.value })} />
        ) : (
          <div className="font-medium">{String(student[k] ?? "—")}</div>
        )}
      </div>
    );
  };

  return (
    <>
      <PageHeader
        title="My Profile"
        subtitle="Manage your personal information and account details"
        actions={
          edit ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => { setForm(student); setEdit(false); }}>Cancel</Button>
              <Button onClick={save} className="bg-primary hover:bg-primary-glow"><Save size={16} className="mr-2" /> Save Changes</Button>
            </div>
          ) : (
            <Button onClick={() => setEdit(true)} variant="outline"><Pencil size={16} className="mr-2" /> Edit Profile</Button>
          )
        }
      />

      {saved && (
        <div className="mb-6 rounded-xl bg-success/10 border border-success/30 p-4 flex items-center gap-3">
          <CheckCircle2 className="text-success" />
          <div className="text-sm font-medium">Profile updated successfully.</div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Identity card */}
        <div className="bg-card border rounded-xl shadow-[var(--shadow-card)] overflow-hidden">
          <div className="h-28" style={{ background: "var(--gradient-hero)" }} />
          <div className="px-6 pb-6 -mt-12">
            <div className="h-24 w-24 rounded-full bg-gold border-4 border-card grid place-items-center font-display text-3xl font-bold text-gold-foreground shadow-[var(--shadow-card)]">
              {initials}
            </div>
            <h3 className="font-display text-xl font-bold mt-4">{student.name}</h3>
            <p className="text-sm text-muted-foreground">{student.department}</p>

            <div className="mt-5 space-y-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Mail size={14} /> <span className="truncate">{student.email}</span></div>
              <div className="flex items-center gap-2 text-muted-foreground"><Phone size={14} /> {student.phone}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><MapPin size={14} /> {student.state} State</div>
            </div>

            <div className="mt-5 pt-5 border-t space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matric No.</span>
                <span className="font-mono font-medium">{student.matric}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Level</span>
                <span className="font-medium">{student.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="inline-flex items-center gap-1 text-success font-medium"><CheckCircle2 size={12} /> Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border rounded-xl p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-lg font-bold mb-5">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {field("name", "Full Name", User2)}
              {field("email", "Email Address", Mail)}
              {field("phone", "Phone Number", Phone)}
              {field("dob", "Date of Birth", Calendar)}
              {field("gender", "Gender", User2)}
              {field("state", "State of Origin", MapPin)}
              <div className="sm:col-span-2">
                {edit ? (
                  <>
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground">Contact Address</Label>
                    <Input className="mt-1.5" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
                  </>
                ) : (
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1.5"><MapPin size={12} /> Contact Address</div>
                    <div className="font-medium">{student.address}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-[var(--shadow-card)]">
            <h3 className="font-display text-lg font-bold mb-5">Academic Information</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1.5"><GraduationCap size={12} /> Faculty</div>
                <div className="font-medium">{student.faculty}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1.5 mb-1.5"><GraduationCap size={12} /> Department</div>
                <div className="font-medium">{student.department}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Level</div>
                <div className="font-medium">{student.level}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Mode of Entry</div>
                <div className="font-medium">UTME</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Year of Admission</div>
                <div className="font-medium">2022</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1.5">Expected Graduation</div>
                <div className="font-medium">2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
