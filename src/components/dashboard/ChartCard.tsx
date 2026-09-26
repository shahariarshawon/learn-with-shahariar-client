"use client";

import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { AnalyticsTimeSeries } from "@/types/dashboard.types";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  data: AnalyticsTimeSeries[];
  type?: "area" | "bar";
  dataKey?: string;
  color?: string;
}

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  subtitle = "Monthly progression overview",
  data,
  type = "area",
  dataKey = "revenue",
  color = "#7F265B",
}) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
      <div>
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500">{subtitle}</p>
      </div>

      <div className="h-64 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {type === "area" ? (
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontSize: "12px",
                  border: "none",
                }}
              />
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={color}
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorGrad)"
              />
            </AreaChart>
          ) : (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0f172a",
                  color: "#ffffff",
                  borderRadius: "12px",
                  fontSize: "12px",
                  border: "none",
                }}
              />
              <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;
