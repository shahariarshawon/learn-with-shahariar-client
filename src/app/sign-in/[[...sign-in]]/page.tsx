"use client";

import React from "react";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";
import { Sparkles, CheckCircle2, Star, ShieldCheck, ArrowLeft } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT / BRAND SHOWCASE PANEL */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7F265B] via-[#6d214f] to-[#4a1435] p-12 text-white overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-400/10 blur-3xl" />
          </div>

          {/* Top Logo & Home Link */}
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <img
                src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
                alt="Learn With Shahariar"
                className="h-9 w-auto brightness-0 invert"
              />
              <span className="text-lg font-black tracking-tight text-white group-hover:text-fuchsia-200 transition">
                Learn With Shahariar
              </span>
            </Link>
          </div>

          {/* Central Hero Message */}
          <div className="relative z-10 max-w-lg space-y-6 my-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300" />
              Welcome Back to Your Career Growth
            </div>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Build skills that transform your career.
            </h2>

            <p className="text-sm leading-relaxed text-fuchsia-100/90">
              Continue your structured journey through modern software architecture, hands-on production microservices, and AI engineering.
            </p>

            {/* Platform Highlights */}
            <div className="space-y-3 pt-4 border-t border-white/15">
              {[
                "Access to 12+ industry-grade courses & real capstones",
                "Cryptographically verifiable completion certificates",
                "Direct code reviews & Q&A from senior staff engineers",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-fuchsia-50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Student Testimonial Snippet */}
          <div className="relative z-10 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
            <div className="flex items-center gap-1 text-amber-300 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" />
              ))}
              <span className="text-xs font-bold text-white ml-2">5.0 / 5.0</span>
            </div>
            <p className="text-xs text-fuchsia-100 italic leading-relaxed">
              “The Next.js 15 and Distributed Systems courses gave me the exact portfolio evidence I needed to land a remote senior engineering position.”
            </p>
            <div className="mt-3 flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Student avatar"
                className="h-7 w-7 rounded-full object-cover ring-1 ring-white/30"
              />
              <div>
                <p className="text-xs font-bold text-white">Alex Rivera</p>
                <p className="text-[10px] text-fuchsia-200">Full Stack Engineer at CloudScale</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT / CLERK SIGN-IN FORM */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16 relative">
          <div className="w-full max-w-md space-y-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#7F265B] transition"
              >
                <ArrowLeft className="h-4 w-4" />
                Return to Home
              </Link>

              <span className="text-xs text-slate-400">
                Need an account?{" "}
                <Link href="/sign-up" className="font-bold text-[#7F265B] hover:underline">
                  Sign up
                </Link>
              </span>
            </div>

            {/* Clerk Sign In component */}
            <div className="flex justify-center">
              <SignIn
                routing="path"
                path="/sign-in"
                signUpUrl="/sign-up"
                appearance={{
                  elements: {
                    rootBox: "w-full shadow-none",
                    card: "border border-slate-200/90 shadow-lg shadow-slate-200/50 rounded-3xl w-full",
                    primaryButton: "bg-[#7F265B] hover:bg-[#6d214f] text-white text-xs font-bold rounded-xl",
                    formButtonPrimary: "bg-[#7F265B] hover:bg-[#6d214f] text-white text-xs font-bold rounded-xl",
                    headerTitle: "text-slate-900 font-extrabold",
                    headerSubtitle: "text-slate-500 text-xs",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
