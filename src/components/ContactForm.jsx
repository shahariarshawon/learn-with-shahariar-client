import React, { useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Footer from "./student/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xyzkbwqk");
  const navigate = useNavigate();

  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, navigate]);

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
              Let’s start a conversation
            </h1>

            <p className="mt-5 text-base leading-8 text-slate-600 md:text-lg">
              Have a question, suggestion, or need support? Send us a message
              and our team will get back to you as soon as possible.
            </p>
          </motion.div>

          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto mt-14 max-w-2xl"
          >
            {state.succeeded ? (
              <div className="rounded-3xl border border-green-200 bg-white/85 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                  ✅
                </div>
                <h2 className="mt-5 text-2xl font-bold text-slate-900">
                  Message sent successfully
                </h2>
                <p className="mt-3 text-slate-600 leading-7">
                  You will receive a response from the team soon. Redirecting
                  you to the homepage...
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                method="POST"
                action="https://formspree.io/f/xyzkbwqk"
                className="rounded-3xl border border-[#7F265B]/10 bg-white/85 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-10"
              >
                <div className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Enter your email address"
                      className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                      required
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="6"
                      placeholder="Write your message here..."
                      className="w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-[#7F265B]/40 focus:ring-4 focus:ring-[#7F265B]/10"
                      required
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#7F265B] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_16px_36px_rgba(127,38,91,0.30)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactForm;