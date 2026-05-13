import jsPDF from "jspdf";
import type { Student } from "./auth";

export type FeeItem = {
  id: string;
  title: string;
  semester: string;
  amount: number;
  status: string;
  due: string;
};

export function generateReceipt(fee: FeeItem, student: Student) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();

  const NAVY: [number, number, number] = [28, 41, 92];
  const GOLD: [number, number, number] = [196, 156, 60];
  const MUTED: [number, number, number] = [120, 125, 140];
  const BORDER: [number, number, number] = [225, 228, 235];

  const receiptNo = `LCU-${Date.now().toString().slice(-8)}`;
  const issued = new Date();

  // Header band
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, W, 110, "F");

  // Crest
  doc.setFillColor(...GOLD);
  doc.roundedRect(40, 32, 46, 46, 6, 6, "F");
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("LCU", 63, 60, { align: "center" });

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Lil Champ University", 100, 56);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 215, 230);
  doc.text("Knowledge  ·  Honour  ·  Service", 100, 72);
  doc.text("Km 12, Sagamu-Abeokuta Expressway, Ogun State, Nigeria", 100, 86);

  // Receipt label (right)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...GOLD);
  doc.text("PAYMENT RECEIPT", W - 40, 56, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 215, 230);
  doc.text(`Receipt No: ${receiptNo}`, W - 40, 74, { align: "right" });
  doc.text(`Issued: ${issued.toLocaleString("en-GB")}`, W - 40, 88, { align: "right" });

  // Paid stamp
  doc.setDrawColor(34, 160, 90);
  doc.setLineWidth(2);
  doc.roundedRect(W - 150, 130, 110, 44, 6, 6, "S");
  doc.setTextColor(34, 160, 90);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("PAID", W - 95, 160, { align: "center" });

  // Student block
  let y = 150;
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("BILLED TO", 40, y);

  y += 16;
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text(student.name, 40, y);

  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(70, 75, 90);
  doc.text(`Matric No.: ${student.matric}`, 40, y);
  y += 13;
  doc.text(`${student.department}, Faculty of ${student.faculty}`, 40, y);
  y += 13;
  doc.text(`Level: ${student.level}`, 40, y);
  y += 13;
  doc.text(`Email: ${student.email}`, 40, y);

  // Divider
  y += 30;
  doc.setDrawColor(...BORDER);
  doc.setLineWidth(1);
  doc.line(40, y, W - 40, y);

  // Table header
  y += 30;
  doc.setFillColor(245, 247, 251);
  doc.rect(40, y - 18, W - 80, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text("DESCRIPTION", 52, y);
  doc.text("SESSION", 320, y);
  doc.text("AMOUNT (NGN)", W - 52, y, { align: "right" });

  // Row
  y += 30;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text(fee.title, 52, y);
  doc.setFontSize(10);
  doc.setTextColor(70, 75, 90);
  doc.text(fee.semester, 320, y);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...NAVY);
  doc.text(fee.amount.toLocaleString(), W - 52, y, { align: "right" });

  y += 14;
  doc.setDrawColor(...BORDER);
  doc.line(40, y, W - 40, y);

  // Total box
  y += 28;
  doc.setFillColor(...NAVY);
  doc.roundedRect(W - 260, y - 22, 220, 50, 4, 4, "F");
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(210, 215, 230);
  doc.text("TOTAL PAID", W - 250, y - 6);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(...GOLD);
  doc.text(`NGN ${fee.amount.toLocaleString()}.00`, W - 50, y + 18, { align: "right" });

  // Payment info
  y += 70;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(...NAVY);
  doc.text("Payment Information", 40, y);

  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(70, 75, 90);
  const rows: [string, string][] = [
    ["Payment Method", "Card (Paystack)"],
    ["Transaction Ref", `TXN-${receiptNo}`],
    ["Status", "Successful"],
    ["Date Paid", issued.toLocaleString("en-GB")],
  ];
  rows.forEach(([k, v]) => {
    doc.setTextColor(...MUTED);
    doc.text(k, 40, y);
    doc.setTextColor(...NAVY);
    doc.text(v, 200, y);
    y += 16;
  });

  // Footer
  const fy = H - 80;
  doc.setDrawColor(...BORDER);
  doc.line(40, fy, W - 40, fy);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(...MUTED);
  doc.text(
    "This is a computer-generated receipt and does not require a signature.",
    W / 2,
    fy + 20,
    { align: "center" }
  );
  doc.text("For enquiries: bursary@lilchamp.edu.ng  ·  +234 700 LIL CHAMP", W / 2, fy + 36, {
    align: "center",
  });

  // Gold footer band
  doc.setFillColor(...GOLD);
  doc.rect(0, H - 8, W, 8, "F");

  doc.save(`LCU-Receipt-${receiptNo}.pdf`);
}
