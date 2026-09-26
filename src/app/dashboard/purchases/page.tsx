"use client";

import React from "react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { usePurchaseHistoryQuery } from "@/services/payment.service";
import { useAuth } from "@clerk/nextjs";

export default function StudentPurchasesPage() {
  const { getToken } = useAuth();
  const { data: purchases = [] } = usePurchaseHistoryQuery();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-12 md:px-10 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F265B]">
              Billing & Transaction History
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">Purchase History</h1>
            <p className="mt-1 text-sm text-slate-500">
              View your course purchases, Stripe payment receipts, and invoices.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Your Orders ({purchases.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Course Item</th>
                    <th className="px-6 py-4">Transaction Reference</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Invoice</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {purchases.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.courseThumbnail}
                            alt={p.courseTitle}
                            className="h-12 w-20 rounded-xl object-cover ring-1 ring-slate-200"
                          />
                          <span className="font-bold text-slate-900 max-w-[240px] truncate">
                            {p.courseTitle}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-xs font-mono text-slate-500">{p.transactionId}</td>
                      <td className="px-6 py-4 text-xs text-slate-500">{p.date}</td>
                      <td className="px-6 py-4 font-extrabold text-slate-900">${p.amountPaid.toFixed(2)}</td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          {p.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <a
                          href={p.invoiceUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          Receipt 📄
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
