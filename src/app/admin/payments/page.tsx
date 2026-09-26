"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  RoleGuard,
} from "@/components/dashboard";
import { useAdminTransactionsQuery } from "@/services/admin.service";

export default function AdminPaymentsPage() {
  const { data: transactions = [] } = useAdminTransactionsQuery();

  return (
    <RoleGuard allowedRoles={["admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="admin" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="admin" title="Payments & Transactions" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Payment Transactions</h1>
              <p className="text-sm text-slate-500">Monitor Stripe checkout volume, student payments, and refunds.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <DashboardCard title="Total Transactions" value="1,248" trend="+18%" icon="💳" />
              <DashboardCard title="Gross Volume" value="$142,500" trend="+24%" icon="💰" />
              <DashboardCard title="Successful Payments" value="99.2%" trend="0.8% failure" icon="✅" />
            </div>

            {/* Transactions Table */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900">Recent Transactions</h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Stripe Charge ID</th>
                      <th className="px-6 py-3.5">Student</th>
                      <th className="px-6 py-3.5">Course</th>
                      <th className="px-6 py-3.5">Amount</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {transactions.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/60 transition">
                        <td className="px-6 py-4 font-bold text-slate-900 font-mono text-xs">{t.transactionId}</td>
                        <td className="px-6 py-4">
                          <div>
                            <h5 className="font-bold text-slate-900">{t.userName}</h5>
                            <span className="text-xs text-slate-400">{t.userEmail}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-slate-800">{t.courseTitle}</td>
                        <td className="px-6 py-4 font-extrabold text-slate-900">${t.amount}</td>
                        <td className="px-6 py-4 text-xs text-slate-500">{t.date}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                            {t.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </RoleGuard>
  );
}
