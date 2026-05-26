import React from "react";
import { GraduationCap, BookOpen, Users, Sparkles } from "lucide-react";

const Companies = () => {
  const stats = [
    {
      icon: Users,
      value: "500+",
      label: "Active Learners",
    },
    {
      icon: BookOpen,
      value: "20+",
      label: "Quality Courses",
    },
    {
      icon: GraduationCap,
      value: "100%",
      label: "Skill Focused",
    },
  ];

  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 lg:px-20">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 rounded-full bg-[#7F265B]/10 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-16 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-3xl" />
        <div className="absolute right-12 top-8 h-36 w-36 rounded-full bg-[#7F265B]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl rounded-3xl border border-[#7F265B]/10 bg-white/80 px-6 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.05)] backdrop-blur-xl sm:px-10 md:px-14">
        {/* Badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7F265B]/15 bg-[#7F265B]/5 px-4 py-1.5 text-sm font-medium text-[#7F265B] transition-all duration-300 hover:scale-105">
          <Sparkles size={16} />
          Trusted learning experience
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          Built for modern learners who want real growth
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
          Learn with Shahariar helps students, aspiring developers, and
          professionals build practical skills through engaging lessons,
          structured guidance, and a focused learning experience.
        </p>

        {/* Stats */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="group rounded-2xl border border-slate-200 bg-white/70 px-6 py-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#7F265B]/20 hover:shadow-[0_16px_40px_rgba(127,38,91,0.10)]"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7F265B]/10 text-[#7F265B] transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
              <p className="mt-2 text-sm text-slate-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Companies;