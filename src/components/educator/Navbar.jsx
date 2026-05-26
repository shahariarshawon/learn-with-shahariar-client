import React from "react";
import { assets } from "../../assets/assets";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import Logger from "../Logger";

const Navbar = () => {
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-[#7F265B]/10 bg-white/85 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#7F265B]/25 to-transparent" />

      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-3 md:px-8 lg:px-12">
        <Link to="/" className="group flex items-center">
          <img
            src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
            alt="logo"
            className="w-32 object-contain transition-all duration-500 group-hover:scale-105 lg:w-40"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-5 text-slate-600">
          <div className="hidden md:block">
            <Logger />
          </div>

          <div className="hidden sm:flex flex-col text-right leading-tight">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#7F265B]/70">
              Dashboard
            </span>
            <p className="text-sm font-semibold text-slate-800">
              Hi, {user ? user.fullName : "Developers"}
            </p>
          </div>

          <div className="flex items-center justify-center rounded-full border border-[#7F265B]/10 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            {user ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-10 h-10 ring-2 ring-[#7F265B]/15 transition duration-300 hover:scale-105 hover:ring-[#7F265B]/30",
                  },
                }}
              />
            ) : (
              <img
                className="h-10 w-10 rounded-full object-cover"
                src={assets.profile_img}
                alt="profile_img"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;