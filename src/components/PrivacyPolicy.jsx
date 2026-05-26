import React from "react";
import Footer from "./student/Footer";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const PrivacyPolicy = () => {
  return (
    <>
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-20 md:px-12">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-40 h-36 w-36 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-44 w-44 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto w-full max-w-5xl rounded-[28px] border border-[#7F265B]/10 bg-white/85 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.06)] backdrop-blur-xl md:p-12"
        >
          {/* Header */}
          <motion.header
            custom={1}
            variants={fadeUp}
            className="flex flex-col gap-6 border-b border-slate-100 pb-8 md:flex-row md:items-center md:justify-between"
          >
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B]">
                Privacy & Data Protection
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Privacy Policy
              </h1>

              <p className="mt-3 text-sm text-slate-500 md:text-base">
                Effective date:{" "}
                <span className="font-semibold text-slate-700">
                  November 10, 2025
                </span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:gps.96169@gmail.com"
                className="inline-flex items-center rounded-full bg-[#7F265B] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_14px_32px_rgba(127,38,91,0.30)]"
              >
                Contact
              </a>

              <button className="rounded-full border border-[#7F265B]/15 bg-white px-5 py-3 text-sm font-semibold text-[#7F265B] transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/30 hover:bg-[#7F265B]/5">
                Manage Cookies
              </button>
            </div>
          </motion.header>

          {/* Intro */}
          <motion.div custom={2} variants={fadeUp} className="mt-8">
            <p className="text-base leading-8 text-slate-600">
              Learn with Shahariar (
              <span className="font-semibold">"we"</span>,{" "}
              <span className="font-semibold">"us"</span>, or{" "}
              <span className="font-semibold">"our"</span>) cares about your
              privacy. This policy explains what information we collect, why we
              collect it, and how you can manage it.
            </p>
          </motion.div>

          {/* Grid cards */}
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <motion.div
              custom={3}
              variants={fadeUp}
              className="rounded-3xl border border-[#7F265B]/10 bg-gradient-to-br from-[#7F265B]/5 to-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(127,38,91,0.08)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                Information We Collect
              </h3>

              <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
                <li>
                  <strong>Account:</strong> name, email, password, and profile
                  details
                </li>
                <li>
                  <strong>Payments:</strong> billing handled by third-party
                  processors
                </li>
                <li>
                  <strong>Course Data:</strong> progress, quiz results, and
                  uploads
                </li>
                <li>
                  <strong>Device & Analytics:</strong> IP address, device info,
                  and cookies
                </li>
              </ul>
            </motion.div>

            <motion.div
              custom={4}
              variants={fadeUp}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/15 hover:shadow-[0_16px_40px_rgba(127,38,91,0.08)]"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                How We Use Data
              </h3>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                We use your data to operate the platform, process enrollments
                and payments, personalize learning experiences, provide support,
                secure accounts, and improve our services. Marketing messages
                are only sent when consent is given, and you can opt out at any
                time.
              </p>
            </motion.div>
          </div>

          {/* Sections */}
          <div className="mt-8 space-y-6">
            {[
              {
                title: "Sharing & Third Parties",
                text: "We work with trusted service providers for hosting, payments, analytics, and communication. These providers are required to protect your information. We do not sell personal data. Information may be disclosed when necessary to comply with legal obligations or protect rights and security.",
              },
              {
                title: "Cookies & Tracking",
                text: "We use cookies and similar technologies to improve functionality, remember preferences, and understand how the platform is used. You can control cookies through your browser settings, though some features may work less effectively if disabled.",
              },
              {
                title: "Security",
                text: "We use reasonable administrative, technical, and physical safeguards to protect your data. However, no online system can guarantee complete security, so we encourage you to protect your login credentials and report any suspicious activity promptly.",
              },
              {
                title: "Your Rights",
                text: "Depending on your location, you may have rights to access, correct, export, or delete your personal data. Contact us if you want to make a request, and we will respond according to applicable laws.",
              },
              {
                title: "Children",
                text: "Our services are not intended for children under 13. We do not knowingly collect personal data from children under 13. If we discover such data has been collected, we will take steps to delete it promptly.",
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                custom={index + 5}
                variants={fadeUp}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/15 hover:shadow-[0_16px_40px_rgba(127,38,91,0.08)]"
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {section.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {section.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Footer row */}
          <motion.div
            custom={11}
            variants={fadeUp}
            className="mt-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-[#faf5f8] p-6 md:flex-row md:items-center md:justify-between"
          >
            <p className="text-sm text-slate-600">
              Last updated:{" "}
              <span className="font-semibold text-slate-700">
                May 26, 2026
              </span>
            </p>

            <div className="text-sm text-slate-600">
              For privacy requests, email{" "}
              <a
                href="mailto:shahariarshawon.dev@gmail.com"
                className="font-semibold text-[#7F265B] hover:underline"
              >
                shahariarshawon.dev@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.section>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;