"use client";

import React from "react";
import {
  DashboardSidebar,
  DashboardNavbar,
  DashboardCard,
  ChartCard,
  RoleGuard,
} from "@/components/dashboard";
import { useInstructorAnalyticsQuery } from "@/services/instructor.service";

export default function InstructorRevenuePage() {
  const { data: analytics = [] } = useInstructorAnalyticsQuery();

  const payouts = [
    { id: "po-1", payoutId: "po_1N8x7F2eZ", date: "2024-05-01", amount: "$4,250.00", status: "Paid", method: "Stripe Direct" },
    { id: "po-2", payoutId: "po_1N8x7F2eY", date: "2024-04-01", amount: "$3,800.00", status: "Paid", method: "Stripe Direct" },
  ];

  return (
    <RoleGuard allowedRoles={["instructor", "admin"]}>
      <div className="flex min-h-screen bg-slate-50">
        <DashboardSidebar role="instructor" />

        <div className="flex-1 flex flex-col min-w-0">
          <DashboardNavbar role="instructor" title="Revenue & Sales" />

          <main className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto w-full">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900">Revenue & Payouts</h1>
              <p className="text-sm text-slate-500">Track gross sales, monthly earnings, and withdrawal history.</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <DashboardCard title="Total Earnings" value="$28,450" trend="+18%" icon="💰" />
              <DashboardCard title="This Month Earnings" value="$4,250" trend="+12%" icon="💵" />
              <DashboardCard title="Avg Price / Sale" value="$59.99" trend="+5%" icon="🏷️" />
            </div>

            <ChartCard
              title="Revenue History"
              subtitle="Earnings generated per month"
              data={analytics}
              dataKey="revenue"
              type="area"
              color="#10b981"
            />

            {/* Payout History Table */}
            <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
              <div className="p-5 border-b border-slate-100">
                <h4 className="text-base font-bold text-slate-900">Recent Payouts</h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                    <tr>
                      <th className="px-6 py-3.5">Payout Reference</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Amount</th>
                      <th className="px-6 py-3.5">Method</th>
                      <th className="px-6 py-3.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {payouts.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/60 transition">
                        <td className="px-6 py-4 font-bold text-slate-900">{p.payoutId}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-500">{p.date}</td>
                        <td className="px-6 py-4 font-extrabold text-emerald-600">{p.amount}</td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{p.method}</td>
                        <td className="px-6 py-4">
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                            {p.status}
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
