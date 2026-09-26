"use client";

import React, { useEffect } from "react";
import { useForm as useFormspree, ValidationError } from "@formspree/react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Footer from "./student/Footer";
import { toast } from "react-toastify";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useFormspree("xyzkbwqk");
  const router = useRouter();

  useEffect(() => {
    if (state.succeeded) {
      toast.success("Message sent successfully! Thank you.");
      const timer = setTimeout(() => {
        router.push("/");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, router]);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-20 sm:px-10 lg:px-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-40 h-32 w-32 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-5xl">
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] shadow-sm">
              Contact Us
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Let&apos;s start a conversation
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Have questions about a course, need support, or want to explore
              collaboration opportunities? Reach out to us and we&apos;ll get back to
              you shortly.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-8 md:grid-cols-5">
            {/* Contact info */}
            <motion.div
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white/85 p-8 shadow-[0_12px_35px_rgba(0,0,0,0.05)] backdrop-blur-xl md:col-span-2"
            >
              <div>
                <h2 className="text-2xl font-bold text-slate-900">
                  Get in touch
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  We are here to help you make the most of your learning journey.
                </p>

                <div className="mt-8 space-y-6 text-sm text-slate-600">
                  <div className="flex items-start gap-4">
                    <span className="text-xl">📍</span>
                    <div>
                      <p className="font-semibold text-slate-800">Location</p>
                      <p className="mt-1">Dhaka, Bangladesh</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-xl">✉️</span>
                    <div>
                      <p className="font-semibold text-slate-800">Email</p>
                      <a
                        href="mailto:shahariarshawon.dev@gmail.com"
                        className="mt-1 block text-[#7F265B] hover:underline"
                      >
                        shahariarshawon.dev@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="text-xl">💬</span>
                    <div>
                      <p className="font-semibold text-slate-800">Discord</p>
                      <p className="mt-1">Join our active community</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-[#7F265B]/10 bg-[#7F265B]/5 p-4 text-center">
                <p className="text-xs font-semibold text-[#7F265B]">
                  Response Time
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  We typically respond within 24 hours.
                </p>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 shadow-[0_15px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl md:col-span-3"
            >
              {state.succeeded ? (
                <div className="py-12 text-center">
                  <span className="text-5xl">🎉</span>
                  <h3 className="mt-4 text-2xl font-bold text-slate-900">
                    Thank you!
                  </h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Your message has been sent. We will get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your full name"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
                    />
                    <ValidationError
                      prefix="Name"
                      field="name"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us what you need help with..."
                      className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-[#7F265B] focus:bg-white focus:ring-2 focus:ring-[#7F265B]/20"
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full rounded-full bg-[#7F265B] py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6d214f] hover:shadow-[0_10px_24px_rgba(127,38,91,0.25)] disabled:opacity-50 cursor-pointer"
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactForm;
