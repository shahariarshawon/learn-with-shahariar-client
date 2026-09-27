"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Are the courses self-paced or cohort-based?",
      a: "All courses are completely self-paced with lifetime access. You can watch lectures, build projects, and review source code whenever your schedule allows. You also gain permanent access to community discussions and future course updates.",
    },
    {
      q: "Do I receive an official certificate upon course completion?",
      a: "Yes! Once you complete 100% of the lessons and pass the final module evaluation, a cryptographically verifiable digital certificate is generated directly in your student dashboard, which you can showcase on LinkedIn and in your portfolio.",
    },
    {
      q: "How does the hands-on project review work?",
      a: "Each course includes real-world capstone repositories. You submit your GitHub pull request link, and our automated quality checklist plus instructor mentors provide actionable feedback on software design, testing, and performance.",
    },
    {
      q: "What if I am a beginner with limited programming experience?",
      a: "We have dedicated beginner-to-intermediate pathways with structured prerequisite guides. Each course clearly marks its entry level (Beginner, Intermediate, or Advanced) so you always know where to start.",
    },
    {
      q: "What payment methods are supported, and is there a refund policy?",
      a: "We accept all major international credit and debit cards, Google Pay, Apple Pay, and Stripe-supported regional payment options. All courses are backed by our 14-day money-back satisfaction guarantee.",
    },
    {
      q: "Can I access courses on mobile and tablet devices?",
      a: "Yes, the Learn With Shahariar platform is 100% responsive and optimized for mobile phones, tablets, laptops, and ultra-wide desktops with smooth video playback and note-taking.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8 bg-slate-50/60 border-t border-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B] mb-3">
            <HelpCircle className="h-3.5 w-3.5" />
            Clear Answers
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600">
            Everything you need to know about our learning platform, curriculum, and certificates.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="flex w-full items-center justify-between p-5 text-left transition hover:bg-slate-50/50 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#7F265B]/10 text-[#7F265B]" : ""
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
