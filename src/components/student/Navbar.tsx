"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChevronDown,
  Menu,
  X,
  Code2,
  Cpu,
  Database,
  Cloud,
  Shield,
  Palette,
  ExternalLinkIcon,
  Sparkles,
  Compass,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { useAuthRole } from "@/features/auth/use-auth-role";

const CATEGORIES = [
  {
    name: "Web Development",
    href: "/course-list?category=Web%20Development",
    desc: "Next.js, React, Node, Full Stack",
    icon: Code2,
    badge: "Hot",
  },
  {
    name: "AI & Machine Learning",
    href: "/course-list?category=Artificial%20Intelligence",
    desc: "LLMs, Agents, Vector DBs, PyTorch",
    icon: Cpu,
    badge: "Trending",
  },
  {
    name: "Data Science",
    href: "/course-list?category=Data%20Engineering",
    desc: "Python, SQL, Analytics, ETL",
    icon: Database,
  },
  {
    name: "Cloud & DevOps",
    href: "/course-list?category=Cloud%20Computing",
    desc: "Docker, Kubernetes, AWS, CI/CD",
    icon: Cloud,
  },
  {
    name: "Cybersecurity",
    href: "/course-list?category=Cybersecurity",
    desc: "Ethical Hacking, Network Security",
    icon: Shield,
  },
  {
    name: "UI/UX Engineering",
    href: "/course-list?category=UI%2FUX%20Design",
    desc: "Figma, Design Systems, Tailwind",
    icon: Palette,
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const { isAdmin, isEducator: roleIsEducator } = useAuthRole();
  const { isEducator } = useAppContext();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const canAccessStudio = isEducator || roleIsEducator || isAdmin;

  // Close categories dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoriesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/course-list?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { label: "Explore Courses", href: "/course-list" },
    { label: "Roadmap", href: "/roadmap" },
    ...(user
      ? [
          { label: "Dashboard", href: "/dashboard" },
          { label: "My Enrollments", href: "/my-enrollments" },
        ]
      : []),
    ...(canAccessStudio ? [{ label: "Instructor Studio", href: "/instructor/dashboard" }] : []),
    ...(isAdmin ? [{ label: "Admin Portal", href: "/admin/dashboard" }] : []),
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#7F265B]/10 bg-white/90 backdrop-blur-xl shadow-[0_4px_24px_rgba(127,38,91,0.04)] transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left Section: Logo & Categories */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link href="/" className="shrink-0 flex items-center">
            <img
              src="https://i.postimg.cc/TP17v5Ks/navlogo.png"
              alt="Learn With Shahariar"
              className="w-32 cursor-pointer object-contain transition-all duration-300 hover:scale-[1.03] sm:w-36 lg:w-44"
            />
          </Link>

          {/* Categories Dropdown Trigger */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setCategoriesOpen(!categoriesOpen)}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                categoriesOpen
                  ? "bg-[#7F265B] text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200/80"
              }`}
            >
              <Compass className="h-3.5 w-3.5" />
              <span>Categories</span>
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {categoriesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute left-0 top-full mt-2 w-80 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5 backdrop-blur-xl"
                >
                  <div className="mb-2 px-2 py-1 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                    Popular Learning Tracks
                  </div>

                  <div className="space-y-1">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setCategoriesOpen(false)}
                          className="group flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#7F265B]/5"
                        >
                          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-[#7F265B] group-hover:bg-[#7F265B] group-hover:text-white transition-colors">
                            <Icon className="h-4 w-4" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 group-hover:text-[#7F265B]">
                                {cat.name}
                              </span>
                              {cat.badge && (
                                <span className="rounded-full bg-[#7F265B]/10 px-1.5 py-0.5 text-[9px] font-bold text-[#7F265B]">
                                  {cat.badge}
                                </span>
                              )}
                            </div>
                            <p className="truncate text-[11px] text-slate-500">{cat.desc}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>

                  <div className="mt-2 border-t border-slate-100 pt-2 text-center">
                    <Link
                      href="/course-list"
                      onClick={() => setCategoriesOpen(false)}
                      className="text-xs font-bold text-[#7F265B] hover:underline"
                    >
                      View All Course Categories →
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center Search Bar */}
        <div className="hidden lg:flex flex-1 max-w-sm mx-6">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search 12+ premium masterclasses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-slate-50/70 pl-10 pr-12 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:border-[#7F265B] focus:bg-white focus:outline-none transition shadow-2xs"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              ↵
            </span>
          </form>
        </div>

        {/* Right Navigation & User Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-bold text-slate-700">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[#7F265B] relative py-1 ${
                    isActive ? "text-[#7F265B]" : "text-slate-600"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7F265B] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* User Auth Buttons */}
          {user ? (
            <div className="flex items-center gap-2 pl-2">
              <UserButton
                appearance={{
                  elements: {
                    avatarBox:
                      "w-9 h-9 ring-2 ring-[#7F265B]/20 transition duration-300 hover:ring-[#7F265B]/60",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Go Projects"
                    labelIcon={<ExternalLinkIcon size={16} />}
                    onClick={() => window.open("https://go-projects-gps.vercel.app", "_blank")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => openSignIn()}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-[#7F265B] hover:text-[#7F265B] cursor-pointer"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => openSignIn()}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B] px-4.5 py-2 text-xs font-bold text-white shadow-md shadow-[#7F265B]/20 transition hover:bg-[#6d214f] active:scale-95 cursor-pointer"
              >
                <Sparkles className="h-3 w-3" />
                <span>Get Started</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 transition"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden md:hidden border-t border-slate-100 bg-white px-4 py-5 shadow-xl"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearchSubmit} className="relative mb-4">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
              />
            </form>

            {/* Mobile Nav Links */}
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-bold text-slate-700 hover:bg-[#7F265B]/5 hover:text-[#7F265B]"
                >
                  <span>{link.label}</span>
                  <span className="text-slate-400 text-xs">→</span>
                </Link>
              ))}
            </div>

            {/* Categories in mobile */}
            <div className="mt-4 border-t border-slate-100 pt-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Browse Categories
              </span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {CATEGORIES.slice(0, 4).map((c) => (
                  <Link
                    key={c.name}
                    href={c.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-lg bg-slate-50 p-2 text-[11px] font-bold text-slate-700 hover:bg-[#7F265B]/10 hover:text-[#7F265B]"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>

            {!user && (
              <div className="mt-5 flex gap-2 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openSignIn();
                  }}
                  className="flex-1 rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-700"
                >
                  Sign In
                </button>
                <button
                  type="button"
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
