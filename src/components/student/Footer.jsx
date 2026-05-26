import React, { useState } from "react";
import { Link } from "react-router-dom";
import SocialIcons from "../SocialIcons";

const Footer = () => {
  const [subscribeEmail, setSubscribeEmail] = useState("");

  const handleSubscribe = () => {
    alert(`Subscribed with: ${subscribeEmail}`);
    setSubscribeEmail("");
  };

  return (
    <footer className="relative mt-16 w-full overflow-hidden bg-[#111111] text-left text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-80px] top-[-80px] h-60 w-60 rounded-full bg-[#7F265B]/20 blur-3xl" />
        <div className="absolute bottom-[-100px] right-[-80px] h-72 w-72 rounded-full bg-[#7F265B]/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 py-14 sm:px-10 lg:px-20 xl:px-28">
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-10 md:grid-cols-3 md:gap-10">
          {/* Brand */}
          <div className="group flex flex-col items-center md:items-start">
            <div className="transition-all duration-500 hover:-translate-y-1">
              <h2 className="mb-4 text-center text-2xl font-bold tracking-tight text-white md:text-left">
                Learn with{" "}
                <span className="text-[#c96aa2] transition-colors duration-300 group-hover:text-[#e08bbb]">
                  Shahariar
                </span>
              </h2>
            </div>

            <p className="max-w-md text-center text-sm leading-7 text-white/70 md:text-left">
              Learn with Shahariar makes education accessible and engaging,
              connecting students with educators through quality courses,
              interactive tools, and intuitive design.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="mb-5 text-lg font-semibold text-white">Company</h2>

            <ul className="grid w-full grid-cols-2 gap-x-6 gap-y-3 text-sm text-white/75 sm:max-w-md md:grid-cols-1 md:gap-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Course List", path: "/course-list" },
                { name: "My Enrollments", path: "/my-enrollments" },
                { name: "Contact Us", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="group inline-flex items-center transition-all duration-300 hover:translate-x-1 hover:text-[#d987b4]"
                  >
                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#7F265B] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Subscribe to our newsletter
            </h2>

            <p className="max-w-md text-center text-sm leading-6 text-white/70 md:text-left">
              Get the latest news, articles, and learning resources delivered
              straight to your inbox.
            </p>

            <div className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-white/40 focus:border-[#7F265B] focus:bg-white/10 focus:ring-2 focus:ring-[#7F265B]/30"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
              />
              <button
                onClick={handleSubscribe}
                className="h-11 rounded-xl bg-[#7F265B] px-6 text-sm font-semibold text-white shadow-lg shadow-[#7F265B]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#6b1f4c] hover:shadow-[#7F265B]/30 active:translate-y-0"
              >
                Subscribe
              </button>
            </div>

            <div className="mt-6 transition-all duration-300 hover:translate-y-[-2px]">
              <SocialIcons />
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-3 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-white/50 sm:text-sm">
            Copyright 2026 © Learn with Shahariar. All Rights Reserved.
          </p>

          <p className="text-xs text-white/40">
            Built for modern learning experiences.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;