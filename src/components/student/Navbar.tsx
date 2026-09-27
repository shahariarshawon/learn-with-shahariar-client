"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";
import { ExternalLinkIcon, Menu, X, BookOpen, Compass, LayoutDashboard } from "lucide-react";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { educatorService } from "@/services";
import { useAuthRole } from "@/features/auth/use-auth-role";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const isCourseListPage = pathname?.includes("/course-list");

  const { isEducator, setIsEducator, getToken } = useAppContext();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { isAdmin, isEducator: roleIsEducator } = useAuthRole();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const canAccessStudio = isEducator || roleIsEducator || isAdmin;

  const becomeEducator = async () => {
    try {
      if (canAccessStudio) {
        router.push("/instructor/dashboard");
        return;
      }

      const token = await getToken();
      const response = await educatorService.updateEducatorRole(token);

      if (response.success) {
        setIsEducator(true);
        toast.success(response.message || "You are now an educator!");
      } else {
        toast.error(response.message || "Failed to update role");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to promote to educator");
    }
  };

  const navLinks = [
    { label: "Courses", href: "/course-list" },
    ...(user ? [{ label: "Dashboard", href: "/dashboard" }, { label: "My Enrollments", href: "/my-enrollments" }] : []),
    ...(canAccessStudio ? [{ label: "Instructor Studio", href: "/instructor/dashboard" }] : []),
    ...(isAdmin ? [{ label: "Admin Portal", href: "/admin/dashboard" }] : []),
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-all duration-300 ${
        isCourseListPage
          ? "bg-white/95 border-slate-200/90 shadow-2xs"
          : "bg-white/90 border-[#7F265B]/10 shadow-[0_4px_20px_rgba(127,38,91,0.04)]"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo - Preserved Exactly */}
        <div className="flex items-center gap-8">
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
              alt="Learn With Shahariar"
              className="w-32 cursor-pointer object-contain transition-all duration-300 hover:scale-[1.03] sm:w-36 lg:w-44"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors duration-200 hover:text-[#7F265B] ${
                    isActive ? "text-[#7F265B] font-bold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right CTA / Auth controls */}
        <div className="hidden md:flex items-center gap-4 text-sm font-medium">
          {user ? (
            <div className="flex items-center gap-3">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-[#7F265B]/15 transition duration-300 hover:ring-[#7F265B]/40",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Go Projects"
                    labelIcon={<ExternalLinkIcon size={16} />}
                    onClick={() =>
                      window.open("https://go-projects-gps.vercel.app", "_blank")
                    }
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => openSignIn()}
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-xs sm:text-sm font-bold text-slate-700 transition hover:border-[#7F265B] hover:text-[#7F265B] cursor-pointer"
              >
                Sign In
              </button>

              <button
                onClick={() => openSignIn()}
                className="rounded-full bg-[#7F265B] px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-[#7F265B]/20 transition hover:bg-[#6d214f] active:translate-y-0 cursor-pointer"
              >
                Get Started
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          {user && (
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 ring-1 ring-slate-200",
                },
              }}
            />
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-[#7F265B]"
            >
              {link.label}
            </Link>
          ))}

          {!user && (
            <div className="pt-3 border-t border-slate-100 flex gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSignIn();
                }}
                className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSignIn();
                }}
                className="flex-1 rounded-xl bg-[#7F265B] py-2.5 text-xs font-bold text-white shadow-md"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
