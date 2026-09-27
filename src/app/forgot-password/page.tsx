"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, CheckCircle2, ShieldCheck, KeyRound } from "lucide-react";
import { toast } from "react-toastify";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your registered email address.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success("Password reset instructions sent to your email!");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* LEFT / BRAND SHOWCASE */}
        <div className="relative hidden lg:flex flex-col justify-between bg-gradient-to-br from-[#7F265B] via-[#6d214f] to-[#4a1435] p-12 text-white overflow-hidden">
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

          <div className="relative z-10 max-w-lg space-y-6 my-auto">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold backdrop-blur-md">
              <KeyRound className="h-3.5 w-3.5 text-amber-300" />
              Account Security & Access
            </div>

            <h2 className="text-4xl font-extrabold leading-tight tracking-tight">
              Reset your credentials securely.
            </h2>

            <p className="text-sm leading-relaxed text-fuchsia-100/90">
              We take account safety seriously. If you have lost access to your password, enter your email to receive a secure authentication link.
            </p>

            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md border border-white/15 space-y-2 text-xs text-fuchsia-100">
              <div className="flex items-center gap-2 font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Multi-Factor Security</span>
              </div>
              <p>Password recovery tokens expire in 15 minutes for your protection.</p>
            </div>
          </div>

          <div className="relative z-10 text-xs text-fuchsia-200">
            © {new Date().getFullYear()} Learn With Shahariar. All rights reserved.
          </div>
        </div>

        {/* RIGHT / RESET FORM */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 lg:p-16">
          <div className="w-full max-w-md space-y-6">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#7F265B] transition"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-8 shadow-lg shadow-slate-200/50 space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Forgot Password?</h1>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your account email address and we'll send you a recovery link.
                </p>
              </div>

              {submitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-bold text-emerald-900">Check your inbox</h3>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    We sent password reset instructions to <strong className="font-semibold">{email}</strong>. Please check your spam folder if you do not receive it in a few minutes.
                  </p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-[#7F265B] hover:underline"
                    >
                      Try another email
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:bg-white focus:border-[#7F265B] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-xl bg-[#7F265B] py-3 text-xs font-bold text-white shadow-md hover:bg-[#6d214f] transition disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? "Sending link..." : "Send Reset Link"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
