"use client";

import React from "react";
import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { Sparkles, CheckCircle2, Star, ShieldCheck, ArrowLeft, Trophy } from "lucide-react";

export default function SignUpPage() {
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
              <Trophy className="h-3.5 w-3.5 text-amber-300" />
              Join 35,000+ Software Engineers Worldwide
            </div>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Start building production systems today.
            </h2>

            <p className="text-sm leading-relaxed text-fuchsia-100/90">
              Create your free account to access foundational modules, preview lectures, explore career roadmaps, and interact with fellow learners.
            </p>

            {/* Platform Highlights */}
            <div className="space-y-3 pt-4 border-t border-white/15">
              {[
                "100% project-based full-stack & AI engineering curricula",
                "Self-paced learning with lifetime updates and access",
                "Automated chapter quizzes and peer code reviews",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-fuchsia-50">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Banner */}
          <div className="relative z-10 rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between text-xs font-bold">
              <span>Alumni Hired At:</span>
              <span className="text-amber-300">Top Tier Tech</span>
            </div>
            <p className="mt-2 text-xs text-fuchsia-100 leading-relaxed">
              Google • Amazon • Microsoft • Stripe • Remote Startups
            </p>
          </div>
        </div>

        {/* RIGHT / CLERK SIGN-UP FORM */}
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
                Already registered?{" "}
                <Link href="/sign-in" className="font-bold text-[#7F265B] hover:underline">
                  Sign in
                </Link>
              </span>
            </div>

            {/* Clerk Sign Up component */}
            <div className="flex justify-center">
              <SignUp
                routing="path"
                path="/sign-up"
                signInUrl="/sign-in"
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
