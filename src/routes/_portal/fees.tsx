import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/PortalLayout";
import { fees as initialFees } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Wallet, CheckCircle2, Clock, Receipt, X } from "lucide-react";

export const Route = createFileRoute("/_portal/fees")({
  head: () => ({ meta: [{ title: "Fees Payment — LCU Portal" }] }),
  component: Fees,
});

function Fees() {
  const [fees, setFees] = useState(initialFees);
  const [pay, setPay] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const total = fees.reduce((a, f) => a + f.amount, 0);
  const paid = fees.filter((f) => f.status === "Paid").reduce((a, f) => a + f.amount, 0);
  const outstanding = total - paid;

  const target = fees.find((f) => f.id === pay);

  const completePay = () => {
    if (!pay) return;
    setFees((fs) => fs.map((f) => (f.id === pay ? { ...f, status: "Paid" } : f)));
    setSuccess(pay);
    setPay(null);
    setTimeout(() => setSuccess(null), 4000);
  };

  return (
    <>
      <PageHeader title="Fees & Payments" subtitle="2024/2025 Academic Session" />

      {success && (
        <div className="mb-6 rounded-xl bg-success/10 border border-success/30 p-4 flex items-center gap-3">
          <CheckCircle2 className="text-success" />
          <div className="flex-1">
            <div className="font-semibold text-sm">Payment successful</div>
            <div className="text-xs text-muted-foreground">A receipt has been sent to your email.</div>
          </div>
          <Button variant="outline" size="sm"><Receipt size={14} className="mr-1" /> Receipt</Button>
        </div>
      )}

      {/* Summary */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl p-6 text-primary-foreground shadow-[var(--shadow-elegant)]" style={{ background: "var(--gradient-hero)" }}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary-foreground/70"><Wallet size={14} /> Outstanding Balance</div>
          <div className="font-display text-4xl font-bold mt-3">₦{outstanding.toLocaleString()}</div>
          <div className="text-sm text-primary-foreground/80 mt-2">Pay before registration deadline</div>
        </div>
        <div className="rounded-xl p-6 bg-card border shadow-[var(--shadow-card)]">
          <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-2"><CheckCircle2 size={14} /> Total Paid</div>
          <div className="font-display text-3xl font-bold mt-3 text-success">₦{paid.toLocaleString()}</div>
          <div className="h-1.5 rounded-full bg-muted mt-4 overflow-hidden">
            <div className="h-full bg-success" style={{ width: `${(paid / total) * 100}%` }} />
          </div>
          <div className="text-xs text-muted-foreground mt-2">{Math.round((paid / total) * 100)}% of total fees</div>
        </div>
        <div className="rounded-xl p-6 bg-card border shadow-[var(--shadow-card)]">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Total Fees</div>
          <div className="font-display text-3xl font-bold mt-3 text-primary">₦{total.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-2">{fees.length} line items</div>
        </div>
      </div>

      {/* Fee table */}
      <div className="bg-card border rounded-xl overflow-hidden shadow-[var(--shadow-card)] mb-8">
        <div className="p-5 border-b">
          <h3 className="font-display text-lg font-bold">Fee Schedule</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-5 py-3">Description</th>
                <th className="px-5 py-3">Due Date</th>
                <th className="px-5 py-3 text-right">Amount</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {fees.map((f) => (
                <tr key={f.id} className="hover:bg-muted/30">
                  <td className="px-5 py-4">
                    <div className="font-medium">{f.title}</div>
                    <div className="text-xs text-muted-foreground">{f.semester}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{new Date(f.due).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="px-5 py-4 text-right font-display font-bold">₦{f.amount.toLocaleString()}</td>
                  <td className="px-5 py-4 text-center">
                    {f.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-success/10 text-success text-xs font-medium">
                        <CheckCircle2 size={12} /> Paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-medium">
                        <Clock size={12} /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {f.status === "Paid" ? (
                      <Button size="sm" variant="outline"><Receipt size={14} className="mr-1" /> Receipt</Button>
                    ) : (
                      <Button size="sm" onClick={() => setPay(f.id)} className="bg-primary hover:bg-primary-glow">Pay Now</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment methods */}
      <div className="bg-card border rounded-xl p-6 shadow-[var(--shadow-card)]">
        <h3 className="font-display text-lg font-bold mb-4">Accepted Payment Methods</h3>
        <div className="grid sm:grid-cols-3 gap-3">
          {["Remita", "Paystack", "Bank Transfer"].map((m) => (
            <div key={m} className="flex items-center gap-3 p-4 border rounded-lg">
              <CreditCard className="text-primary" />
              <div className="font-medium text-sm">{m}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pay modal */}
      {target && (
        <div className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4">
          <div className="bg-card rounded-xl shadow-[var(--shadow-elegant)] w-full max-w-md">
            <div className="p-5 border-b flex items-center justify-between">
              <h3 className="font-display text-lg font-bold">Confirm Payment</h3>
              <button onClick={() => setPay(null)} className="text-muted-foreground hover:text-foreground"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <div className="text-xs text-muted-foreground">Paying for</div>
                <div className="font-medium">{target.title}</div>
                <div className="font-display text-3xl font-bold text-primary mt-2">₦{target.amount.toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <Label>Card Number</Label>
                <Input defaultValue="4111 1111 1111 1111" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Expiry</Label>
                  <Input defaultValue="12/27" />
                </div>
                <div className="space-y-2">
                  <Label>CVV</Label>
                  <Input defaultValue="123" />
                </div>
              </div>
            </div>
            <div className="p-5 border-t flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setPay(null)}>Cancel</Button>
              <Button className="flex-1 bg-primary hover:bg-primary-glow" onClick={completePay}>Pay ₦{target.amount.toLocaleString()}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
