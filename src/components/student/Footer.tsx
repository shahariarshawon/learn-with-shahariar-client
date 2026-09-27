"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { Mail, ArrowRight, ShieldCheck, Sparkles, Globe, Heart } from "lucide-react";
import { SocialIcons } from "@/components/common/SocialIcons";

export const Footer: React.FC = () => {
  const [subscribeEmail, setSubscribeEmail] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubmitting(true);
    setTimeout(() => {
      toast.success(`Subscribed successfully with: ${subscribeEmail}`);
      setSubscribeEmail("");
      setSubmitting(false);
    }, 600);
  };

  const learningCategories = [
    { name: "Full-Stack Web Engineering", href: "/course-list?category=Web%20Development" },
    { name: "Generative AI & LLM Agents", href: "/course-list?category=Artificial%20Intelligence" },
    { name: "Cloud Architecture & DevOps", href: "/course-list?category=Cloud%20Computing" },
    { name: "Data Engineering & Analytics", href: "/course-list?category=Data%20Engineering" },
    { name: "Enterprise Cybersecurity", href: "/course-list?category=Cybersecurity" },
    { name: "Design Systems & UI/UX", href: "/course-list?category=UI%2FUX%20Design" },
  ];

  const companyLinks = [
    { name: "Explore Courses", href: "/course-list" },
    { name: "Learning Roadmap", href: "/roadmap" },
    { name: "Student Dashboard", href: "/dashboard" },
    { name: "Pricing & Plans", href: "/pricing" },
    { name: "Instructor Studio", href: "/instructor/dashboard" },
    { name: "About Learn With Shahariar", href: "/about" },
    { name: "Contact & Support", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  return (
    <footer className="relative mt-24 w-full overflow-hidden bg-[#0c0c0e] text-left text-white border-t border-white/10">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-100px] top-[-100px] h-96 w-96 rounded-full bg-[#7F265B]/15 blur-[120px]" />
        <div className="absolute right-[-80px] bottom-[-80px] h-96 w-96 rounded-full bg-fuchsia-900/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-14 border-b border-white/10">
          {/* Brand Info (Cols: 4) */}
          <div className="lg:col-span-4 space-y-6">
            <Link href="/" className="inline-block">
              <img
                src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
                alt="Learn With Shahariar"
                className="w-40 sm:w-48 brightness-110 object-contain"
              />
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Empowering next-generation software engineers, AI researchers, and digital builders with industry-standard curricula, interactive roadmaps, and verified credentials.
            </p>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <ShieldCheck className="h-3.5 w-3.5 text-[#c96aa2]" />
                Industry Verified
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1">
                <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                35k+ Active Alumni
              </span>
            </div>

            <div className="pt-2">
              <SocialIcons />
            </div>
          </div>

          {/* Learning Categories (Cols: 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Learning Tracks
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {learningCategories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="inline-flex items-center transition-colors hover:text-[#c96aa2]"
                  >
                    <span className="mr-2 text-xs text-[#7F265B]">›</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform & Company (Cols: 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              {companyLinks.slice(0, 6).map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section (Cols: 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Stay Ahead in Tech
            </h4>
            <p className="text-xs leading-relaxed text-slate-400">
              Receive weekly engineering articles, course discounts, and industry roadmap updates.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2.5">
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  required
                  placeholder="developer@company.com"
                  value={subscribeEmail}
                  onChange={(e) => setSubscribeEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 outline-none transition focus:border-[#7F265B] focus:bg-white/10"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7F265B] py-2.5 text-xs font-bold text-white shadow-md shadow-[#7F265B]/30 hover:bg-[#6d214f] transition cursor-pointer"
              >
                <span>{submitting ? "Subscribing..." : "Subscribe for Free"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </form>

            <p className="text-[11px] text-slate-500">
              Zero spam. Unsubscribe at any time with one click.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Learn With Shahariar. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-400 transition">
              Privacy Policy
            </Link>
            <Link href="/contact" className="hover:text-slate-400 transition">
              Support Center
            </Link>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
