import React from "react";
import Footer from "./student/Footer";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
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

const About = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const features = [
    {
      title: "Quality Courses",
      icon: "📚",
      desc: "Learn from expert educators through well-structured, engaging, and practical courses designed for real growth.",
    },
    {
      title: "Interactive Learning",
      icon: "🚀",
      desc: "Track progress, explore projects, and stay engaged with a learning experience built for modern students.",
    },
    {
      title: "Global Access",
      icon: "🌍",
      desc: "Learn anytime, anywhere, on any device with a smooth, accessible, and responsive platform experience.",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#faf5f8] via-white to-white px-6 py-20 sm:px-10 lg:px-20">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-60 w-60 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl" />
          <div className="absolute left-10 top-40 h-32 w-32 rounded-full bg-fuchsia-200/20 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-[#7F265B]/8 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-6xl">
          {/* Hero */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] shadow-sm">
              About Learn with Shahariar
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Empowering modern learners with practical education
            </h1>

            <p className="mt-6 text-base leading-8 text-slate-600 md:text-lg">
              Learn with Shahariar is built to make learning accessible,
              engaging, and career-focused. We help students and educators
              connect through quality courses, practical skills, and a seamless
              learning experience.
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16 rounded-3xl border border-[#7F265B]/10 bg-white/80 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl md:p-10"
          >
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <span className="inline-block rounded-full bg-[#7F265B]/8 px-3 py-1 text-sm font-medium text-[#7F265B]">
                  Our Mission
                </span>
                <h2 className="mt-4 text-3xl font-bold text-slate-900">
                  Learning that is clear, engaging, and impactful
                </h2>
                <p className="mt-5 leading-8 text-slate-600">
                  At Learn with Shahariar, our mission is to make education more
                  accessible and meaningful for everyone. We bridge the gap
                  between students and educators by delivering high-quality
                  courses, intuitive experiences, and practical learning paths
                  that help learners build real confidence.
                </p>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#faf5f8] p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(127,38,91,0.08)]">
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-xl">
                      🎯
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Purpose-Driven
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Every course is designed to create meaningful progress.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-xl">
                      💡
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Skill Focused
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        Learn practical knowledge you can apply with confidence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-xl">
                      🤝
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Learner First
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-slate-600">
                        We build with clarity, accessibility, and usability in mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Why choose us */}
          <motion.div
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-16"
          >
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Why choose us
              </h2>
              <p className="mt-4 text-slate-600">
                A learning platform built to help students grow with confidence
                and help educators share knowledge more effectively.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  custom={index + 4}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="group rounded-3xl border border-slate-200 bg-white/85 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#7F265B]/20 hover:shadow-[0_20px_50px_rgba(127,38,91,0.10)]"
                >
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7F265B]/10 text-3xl transition-transform duration-300 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#7F265B]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            custom={7}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="mt-20 rounded-3xl border border-[#7F265B]/10 bg-gradient-to-br from-white to-[#faf5f8] px-8 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
          >
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
              Join Learn with Shahariar today
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600 leading-7">
              Whether you're a student looking to strengthen your skills or an
              educator ready to share knowledge, this platform is designed to
              support your journey with clarity and impact.
            </p>

            <div className="mt-8 flex justify-center">
              {user ? (
                <Link
                  to="/course-list"
                  className="inline-flex items-center justify-center rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_16px_36px_rgba(127,38,91,0.30)] active:translate-y-0"
                >
                  Get Started
                </Link>
              ) : (
                <button
                  onClick={() => openSignIn()}
                  className="inline-flex items-center justify-center rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_16px_36px_rgba(127,38,91,0.30)] active:translate-y-0"
                >
                  Get Started
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;