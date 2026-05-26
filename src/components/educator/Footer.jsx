import React from "react";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  return (
    <footer className="relative mt-10 overflow-hidden bg-white/85 backdrop-blur-xl">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7F265B]/30 to-transparent" />

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-12 top-2 h-24 w-24 rounded-full bg-[#7F265B]/8 blur-2xl" />
        <div className="absolute right-12 bottom-2 h-28 w-28 rounded-full bg-fuchsia-200/20 blur-2xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-6 px-6 py-6 md:flex-row md:px-10 lg:px-16">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <img
            className="hidden w-24 object-contain opacity-90 transition-all duration-500 hover:scale-105 hover:opacity-100 md:block"
            src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
            alt="logo"
          />

          <div className="hidden h-8 w-px bg-slate-200 md:block" />

          <p className="text-center text-xs text-slate-500 md:text-left md:text-sm">
            Copyright 2025 © Learn with Shahariar. All Rights Reserved.
          </p>
        </div>

        <div className="transition-all duration-300 hover:-translate-y-0.5">
          <SocialIcons />
        </div>
      </div>
    </footer>
  );
};

export default Footer;