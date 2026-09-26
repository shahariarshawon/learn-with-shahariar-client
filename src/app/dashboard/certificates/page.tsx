"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import { useUserCertificatesQuery } from "@/services/certificate.service";

export default function StudentCertificatesPage() {
  const { data: certificates = [] } = useUserCertificatesQuery();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-[#faf5f8] via-white to-white px-4 py-12 md:px-10 lg:px-20 xl:px-28">
        <div className="mx-auto max-w-6xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#7F265B]">
              Verified Credentials
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">My Certificates</h1>
            <p className="mt-1 text-sm text-slate-500">
              View, share, and download official certificates of completion for your completed courses.
            </p>
          </div>

          {certificates.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-sm space-y-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600 text-3xl font-bold">
                🎓
              </div>
              <h3 className="text-2xl font-bold text-slate-900">No Certificates Earned Yet</h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                Complete 100% of your course lectures to automatically generate your verified Certificate of Completion!
              </p>
              <Link
                href="/dashboard/learning"
                className="inline-block rounded-full bg-[#7F265B] px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-[#6d214f]"
              >
                Go to My Learning
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-white via-amber-50/10 to-amber-100/20 p-6 shadow-lg space-y-5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-800 border border-amber-300">
                        Official Certificate
                      </span>
                      <span className="text-xs font-mono text-slate-400">{cert.certificateId}</span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900">{cert.courseTitle}</h3>
                    <p className="text-xs text-slate-500">Issued to: <strong className="text-slate-900">{cert.studentName}</strong> • Date: {cert.issueDate}</p>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-amber-200/50">
                    <Link
                      href={`/certificate/${cert.certificateId}`}
                      className="flex-1 rounded-2xl bg-[#7F265B] py-3 text-center text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition"
                    >
                      View Certificate 📜
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
