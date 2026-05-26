import React from "react";
import { assets } from "../../assets/assets";
import { useClerk, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <section className="relative overflow-hidden px-6 py-20 sm:px-10 md:px-16 lg:px-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 animate-[pulse_6s_ease-in-out_infinite] rounded-full bg-[#7F265B]/15 blur-3xl" />
        <div className="absolute bottom-0 left-10 h-32 w-32 animate-[pulse_7s_ease-in-out_infinite] rounded-full bg-[#7F265B]/10 blur-2xl" />
        <div className="absolute right-10 top-10 h-40 w-40 animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-fuchsia-200/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl rounded-3xl border border-[#7F265B]/10 bg-white/85 px-8 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_25px_70px_rgba(127,38,91,0.10)] sm:px-12 md:py-16">
        <div className="mb-5 inline-flex items-center rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] transition-all duration-300 hover:scale-105">
          Start your learning journey
        </div>

        <h1 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
          Learn anything, anytime, anywhere
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Whether you're a student looking to enhance your skills or an educator
          wanting to share knowledge, Learn with Shahariar gives you a modern,
          engaging platform to grow, teach, and succeed.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
          {user ? (
            <Link
              to="/course-list"
              className="inline-flex items-center justify-center rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_16px_36px_rgba(127,38,91,0.30)] active:translate-y-0"
            >
              Explore Courses
            </Link>
          ) : (
            <button
              onClick={() => openSignIn()}
              className="inline-flex items-center justify-center rounded-full bg-[#7F265B] px-8 py-3.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(127,38,91,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_16px_36px_rgba(127,38,91,0.30)] active:translate-y-0"
            >
              Get Started
            </button>
          )}

          <Link
            to="/about"
            className="group inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/30 hover:text-[#7F265B] hover:shadow-md active:translate-y-0"
          >
            Learn More
            <img
              src={assets.arrow_icon}
              alt="arrow_icon"
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;