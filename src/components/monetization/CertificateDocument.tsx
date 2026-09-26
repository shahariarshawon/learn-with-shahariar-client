"use client";

import React from "react";
import { Certificate } from "@/types";

interface CertificateDocumentProps {
  certificate: Certificate;
}

export const CertificateDocument: React.FC<CertificateDocumentProps> = ({ certificate }) => {
  return (
    <div className="relative mx-auto max-w-4xl aspect-[1.414/1] overflow-hidden rounded-3xl border-8 border-amber-600/30 bg-white p-8 md:p-14 shadow-2xl text-center text-slate-800 font-serif print:border-8 print:shadow-none">
      {/* Gold Inner Border */}
      <div className="absolute inset-4 rounded-2xl border-2 border-amber-500/40 p-6 pointer-events-none flex flex-col justify-between" />

      {/* Header */}
      <div className="relative z-10 space-y-3 pt-4">
        <div className="flex justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#7F265B] text-2xl font-bold text-white shadow-md font-sans">
            LWS
          </span>
        </div>
        <h1 className="text-3xl font-extrabold uppercase tracking-widest text-[#7F265B] font-sans">
          Certificate of Completion
        </h1>
        <p className="text-xs uppercase tracking-widest text-amber-700 font-sans font-bold">
          Learn With Shahariar • Software Engineering Academy
        </p>
      </div>

      {/* Body Content */}
      <div className="relative z-10 my-8 space-y-4">
        <p className="text-sm italic text-slate-500 font-sans">This is to certify that</p>
        <h2 className="text-4xl font-extrabold text-slate-900 underline decoration-amber-500/50 underline-offset-8">
          {certificate.studentName}
        </h2>
        <p className="text-sm text-slate-600 font-sans leading-relaxed max-w-xl mx-auto pt-2">
          has successfully completed all modules, practical projects, and requirements for the professional course
        </p>
        <h3 className="text-2xl font-extrabold text-[#7F265B] font-sans">
          {certificate.courseTitle}
        </h3>
      </div>

      {/* Footer Signatures & Verification */}
      <div className="relative z-10 mt-10 grid grid-cols-3 items-end gap-6 text-xs font-sans">
        {/* Date */}
        <div className="text-left space-y-1">
          <p className="font-bold text-slate-900">{certificate.issueDate}</p>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block border-t border-slate-200 pt-1">
            Date Granted
          </span>
        </div>

        {/* Gold Seal */}
        <div className="flex flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-amber-500 text-white shadow-lg ring-4 ring-amber-200 font-bold text-xs uppercase">
            Official Seal
          </div>
        </div>

        {/* Signature */}
        <div className="text-right space-y-1">
          <p className="font-extrabold text-[#7F265B] text-sm font-serif italic">{certificate.instructorName}</p>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider block border-t border-slate-200 pt-1">
            Lead Instructor & Founder
          </span>
        </div>
      </div>

      {/* Verification ID Footer */}
      <div className="relative z-10 mt-6 border-t border-slate-100 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span>Verification ID: {certificate.certificateId}</span>
        <span>Verify at: learnwithshahariar.com/certificate</span>
      </div>
    </div>
  );
};

export default CertificateDocument;
