"use client";

import React, { use } from "react";
import Link from "next/link";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";
import CertificateDocument from "@/components/monetization/CertificateDocument";
import { useCertificateByIdQuery } from "@/services/certificate.service";
import Loading from "@/components/student/Loading";

interface CertificateViewPageProps {
  params: Promise<{ id: string }>;
}

export default function CertificateViewPage({ params }: CertificateViewPageProps) {
  const resolvedParams = use(params);
  const certificateId = resolvedParams.id;

  const { data: certificate, isLoading } = useCertificateByIdQuery(certificateId);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading || !certificate) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white print:p-0">
      <div className="print:hidden">
        <Navbar />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:py-12">
        {/* Print / Action Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link
            href="/dashboard/certificates"
            className="text-xs font-bold text-slate-600 hover:text-slate-900"
          >
            ← Back to Certificates Library
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="rounded-full bg-[#7F265B] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition cursor-pointer"
            >
              Print / Save as PDF 🖨️
            </button>
          </div>
        </div>

        {/* Certificate Rendering */}
        <CertificateDocument certificate={certificate} />
      </div>

      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}
