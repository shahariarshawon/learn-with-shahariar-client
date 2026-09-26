"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

interface Module {
  id: number;
  title: string;
  duration: string;
  chapters: string[];
}

interface WeekCurriculum {
  week: number;
  title: string;
  modules: Module[];
}

export default function CourseOutlinePage() {
  const curriculum: WeekCurriculum[] = [
    {
      week: 1,
      title: "Orientation & Web Basics",
      modules: [
        {
          id: 1,
          title: "Setup & Developer Environment",
          duration: "2 hours",
          chapters: [
            "Course Overview & Roadmap",
            "Install VS Code, Node.js, Git",
            "GitHub Setup & Workflow",
            "Developer Mindset & Routine",
            "Quiz",
          ],
        },
        {
          id: 2,
          title: "How the Web Works",
          duration: "2 hours",
          chapters: [
            "Client-Server Model",
            "HTTP/HTTPS Basics",
            "DNS & Hosting",
            "Browser Rendering Flow",
            "Quiz",
          ],
        },
        {
          id: 3,
          title: "HTML Fundamentals",
          duration: "2 hours",
          chapters: [
            "HTML Structure & Tags",
            "Forms & Inputs",
            "Media & Semantic Tags",
            "SEO Basics",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 2,
      title: "CSS & Responsive Design",
      modules: [
        {
          id: 4,
          title: "CSS Basics",
          duration: "2 hours",
          chapters: [
            "Selectors & Box Model",
            "Display & Positioning",
            "Flexbox Basics",
            "Grid Intro",
            "Quiz",
          ],
        },
        {
          id: 5,
          title: "Responsive Design",
          duration: "2 hours",
          chapters: [
            "Media Queries",
            "Mobile First Design",
            "Responsive Layout",
            "Debugging UI",
            "Quiz",
          ],
        },
        {
          id: 6,
          title: "Portfolio Project",
          duration: "2 hours",
          chapters: [
            "Build Portfolio UI",
            "Flex/Grid Practice",
            "Responsive Fixes",
            "Deploy on GitHub Pages",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 3,
      title: "JavaScript Basics",
      modules: [
        {
          id: 7,
          title: "JS Fundamentals",
          duration: "2 hours",
          chapters: [
            "Variables & Data Types",
            "Operators",
            "Functions",
            "Arrays & Objects",
            "Quiz",
          ],
        },
        {
          id: 8,
          title: "Control Flow",
          duration: "2 hours",
          chapters: [
            "If-Else",
            "Loops",
            "Array Methods",
            "Problem Solving",
            "Quiz",
          ],
        },
        {
          id: 9,
          title: "Mini Projects",
          duration: "2 hours",
          chapters: [
            "Todo App",
            "Calculator",
            "DOM Basics",
            "Debugging",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 4,
      title: "Advanced JavaScript",
      modules: [
        {
          id: 10,
          title: "ES6+ Features",
          duration: "2 hours",
          chapters: [
            "Arrow Functions",
            "Destructuring",
            "Spread/Rest",
            "Modules",
            "Quiz",
          ],
        },
        {
          id: 11,
          title: "Async JavaScript",
          duration: "2 hours",
          chapters: [
            "Promises",
            "Async/Await",
            "Fetch API",
            "Error Handling",
            "Quiz",
          ],
        },
        {
          id: 12,
          title: "JS Project",
          duration: "2 hours",
          chapters: [
            "Weather App",
            "API Integration",
            "Loading/Error UI",
            "Optimization",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 5,
      title: "React Fundamentals",
      modules: [
        {
          id: 13,
          title: "React Basics",
          duration: "2 hours",
          chapters: [
            "Why React & Vite",
            "JSX & Components",
            "Props & Rendering",
            "Project Structure",
            "Quiz",
          ],
        },
        {
          id: 14,
          title: "State & Events",
          duration: "2 hours",
          chapters: [
            "useState Hook",
            "Handling Events",
            "Conditional Render",
            "Forms in React",
            "Quiz",
          ],
        },
        {
          id: 15,
          title: "Effects & Lifecycle",
          duration: "2 hours",
          chapters: [
            "useEffect Hook",
            "API Fetching",
            "Dependencies",
            "Cleanup",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 6,
      title: "Intermediate React",
      modules: [
        {
          id: 16,
          title: "React Router",
          duration: "2 hours",
          chapters: [
            "Routing Basics",
            "Dynamic Routes",
            "Navigation Hooks",
            "404 Page",
            "Quiz",
          ],
        },
        {
          id: 17,
          title: "Context API",
          duration: "2 hours",
          chapters: [
            "Global State",
            "Create Context",
            "Custom Hook",
            "Performance",
            "Quiz",
          ],
        },
        {
          id: 18,
          title: "React Project",
          duration: "2 hours",
          chapters: [
            "Movie App",
            "Search & Filter",
            "Routing + Context",
            "Deploy on Vercel",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 7,
      title: "Tailwind & UI Libraries",
      modules: [
        {
          id: 19,
          title: "Tailwind CSS",
          duration: "2 hours",
          chapters: [
            "Utility First CSS",
            "Responsive UI",
            "Dark Mode",
            "Custom Config",
            "Quiz",
          ],
        },
        {
          id: 20,
          title: "UI Components",
          duration: "2 hours",
          chapters: [
            "Lucide Icons",
            "Toast Notifications",
            "Framer Motion",
            "Modals",
            "Quiz",
          ],
        },
        {
          id: 21,
          title: "Frontend Capstone",
          duration: "2 hours",
          chapters: [
            "E-Commerce UI",
            "Cart System",
            "Filter System",
            "Polish UI",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 8,
      title: "Node.js & Express Basics",
      modules: [
        {
          id: 22,
          title: "Node.js Intro",
          duration: "2 hours",
          chapters: [
            "Node Runtime",
            "NPM & Packages",
            "File System",
            "Modules",
            "Quiz",
          ],
        },
        {
          id: 23,
          title: "Express Basics",
          duration: "2 hours",
          chapters: [
            "Express Setup",
            "Routing",
            "Middleware",
            "Postman Testing",
            "Quiz",
          ],
        },
        {
          id: 24,
          title: "REST APIs",
          duration: "2 hours",
          chapters: [
            "CRUD Operations",
            "Status Codes",
            "Request/Response",
            "Error Handling",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 9,
      title: "MongoDB & Mongoose",
      modules: [
        {
          id: 25,
          title: "Database Basics",
          duration: "2 hours",
          chapters: [
            "SQL vs NoSQL",
            "MongoDB Atlas",
            "Compass Tool",
            "Collections",
            "Quiz",
          ],
        },
        {
          id: 26,
          title: "Mongoose Intro",
          duration: "2 hours",
          chapters: [
            "Connect DB",
            "Schema & Models",
            "CRUD with DB",
            "Validation",
            "Quiz",
          ],
        },
        {
          id: 27,
          title: "Backend Project",
          duration: "2 hours",
          chapters: [
            "Todo Backend",
            "CRUD Endpoints",
            "Error Middleware",
            "Deploy on Render",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 10,
      title: "Authentication & Security",
      modules: [
        {
          id: 28,
          title: "Auth Basics",
          duration: "2 hours",
          chapters: [
            "Password Hashing",
            "JWT Tokens",
            "Auth Middleware",
            "Cookies vs Header",
            "Quiz",
          ],
        },
        {
          id: 29,
          title: "User System",
          duration: "2 hours",
          chapters: [
            "Register/Login",
            "Role Based Access",
            "Profile API",
            "Refresh Token",
            "Quiz",
          ],
        },
        {
          id: 30,
          title: "Auth Integration",
          duration: "2 hours",
          chapters: [
            "React Auth Context",
            "Protected Routes",
            "Axios Interceptors",
            "Logout Flow",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 11,
      title: "Fullstack Integration",
      modules: [
        {
          id: 31,
          title: "Connect FE + BE",
          duration: "2 hours",
          chapters: [
            "CORS Setup",
            "Env Variables",
            "API Calls in React",
            "Loading States",
            "Quiz",
          ],
        },
        {
          id: 32,
          title: "Image Upload",
          duration: "2 hours",
          chapters: [
            "Multer Setup",
            "Cloudinary",
            "Upload API",
            "Image Preview",
            "Quiz",
          ],
        },
        {
          id: 33,
          title: "Payment Gateway",
          duration: "2 hours",
          chapters: [
            "Stripe Setup",
            "Checkout API",
            "Payment Flow",
            "Webhook Basics",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 12,
      title: "Fullstack Real Project",
      modules: [
        {
          id: 34,
          title: "LMS Project Setup",
          duration: "2 hours",
          chapters: [
            "Project Architecture",
            "Database Design",
            "Course Models",
            "Educator Flow",
            "Quiz",
          ],
        },
        {
          id: 35,
          title: "Student Flow",
          duration: "2 hours",
          chapters: [
            "Browse Courses",
            "Course Details",
            "Enrollment System",
            "Video Player UI",
            "Quiz",
          ],
        },
        {
          id: 36,
          title: "Educator Dashboard",
          duration: "2 hours",
          chapters: [
            "Add Course Form",
            "Manage Content",
            "Earnings Analytics",
            "Student List",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 13,
      title: "Advanced Features",
      modules: [
        {
          id: 37,
          title: "Quiz System",
          duration: "2 hours",
          chapters: [
            "Quiz Models",
            "Create Quiz API",
            "Take Quiz UI",
            "Score Calculation",
            "Quiz",
          ],
        },
        {
          id: 38,
          title: "Progress Tracking",
          duration: "2 hours",
          chapters: [
            "Lecture Complete API",
            "Progress Bar",
            "Chapter Lock",
            "Quiz Trigger",
            "Quiz",
          ],
        },
        {
          id: 39,
          title: "Review & Rating",
          duration: "2 hours",
          chapters: [
            "Rating API",
            "Star Component",
            "Average Rating",
            "Review List",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 14,
      title: "Deployment & Career",
      modules: [
        {
          id: 40,
          title: "Deployment",
          duration: "2 hours",
          chapters: [
            "Deploy Backend (Vercel/Render)",
            "Deploy Frontend (Vercel)",
            "Custom Domain",
            "SSL & Performance",
            "Quiz",
          ],
        },
        {
          id: 41,
          title: "Portfolio & GitHub",
          duration: "2 hours",
          chapters: [
            "GitHub Profile",
            "README Writing",
            "Project Showcase",
            "Live Links",
            "Quiz",
          ],
        },
        {
          id: 42,
          title: "Job Readiness",
          duration: "2 hours",
          chapters: [
            "Resume Preparation",
            "Interview Questions",
            "Freelancing Basics",
            "Next Steps",
            "Quiz",
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden px-6 pb-20 pt-24 text-center md:pt-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[#7F265B]/20 blur-[130px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-[#d89aba] backdrop-blur-md">
            <span>✨</span> Complete 100 Days Curriculum
          </div>

          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl">
            100 Days of <span className="text-[#d89aba]">MERN Stack</span> Mastery
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-zinc-400 md:text-lg">
            A comprehensive, industry-aligned roadmap taking you step by step
            from fundamental web concepts to building and deploying complex,
            production-grade full-stack applications.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-2xl font-bold text-white">14</p>
              <p className="text-xs text-zinc-400">Weeks</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-2xl font-bold text-white">42</p>
              <p className="text-xs text-zinc-400">Modules</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-2xl font-bold text-white">100+</p>
              <p className="text-xs text-zinc-400">Hours of Learning</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-center backdrop-blur-md">
              <p className="text-2xl font-bold text-white">5+</p>
              <p className="text-xs text-zinc-400">Projects</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Curriculum Weeks */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-12">
          {curriculum.map((week) => (
            <motion.div
              key={week.week}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={fadeUp}
              className="rounded-[32px] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-xl md:p-8"
            >
              {/* Week Header */}
              <div className="mb-8 flex flex-col gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#d89aba]">
                    Week {week.week.toString().padStart(2, "0")}
                  </span>
                  <h3 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                    {week.title}
                  </h3>
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-400">
                  3 Modules • 6 hours
                </span>
              </div>

              {/* Modules Grid */}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {week.modules.map((module) => (
                  <div
                    key={module.id}
                    className="group rounded-3xl border border-white/8 bg-[#12121b] p-6 transition-all duration-300 hover:-translate-y-2 hover:border-[#7F265B]/35 hover:shadow-[0_24px_60px_rgba(127,38,91,0.18)]"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="text-4xl font-black tracking-tight text-white/15 transition-colors duration-300 group-hover:text-[#7F265B]/40">
                        {module.id.toString().padStart(2, "0")}
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-[#d9a8c3]">
                        {module.duration}
                      </span>
                    </div>

                    <h4 className="min-h-[56px] text-xl font-semibold leading-tight text-white">
                      {module.title}
                    </h4>

                    <details className="group/details mt-4 rounded-2xl border border-white/8 bg-white/[0.02] px-4 py-3 transition-all duration-300">
                      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-zinc-300">
                        <span className="flex items-center gap-2">
                          📚 {module.chapters.length} Chapters
                        </span>
                        <span className="text-[#d89aba] transition-transform duration-300 group-open/details:rotate-180">
                          ▼
                        </span>
                      </summary>

                      <ul className="mt-4 space-y-3 border-t border-white/8 pt-4 text-sm text-zinc-400">
                        {module.chapters.map((chapter, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="mt-1 text-emerald-400">•</span>
                            <span>{chapter}</span>
                          </li>
                        ))}
                      </ul>
                    </details>

                    <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-5 text-[11px] uppercase tracking-wide text-white/40">
                      <span>Module {module.id}</span>
                      <span className="text-emerald-300">
                        Hands-on + Assignments
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="border-t border-white/10 bg-gradient-to-br from-[#16121b] to-[#0d0d14] px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto max-w-3xl rounded-[32px] border border-white/10 bg-white/[0.03] p-10 text-center shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
        >
          <div className="mb-5 text-4xl">💬</div>
          <h2 className="text-3xl font-bold">Join the Private Discord Community</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-7 text-zinc-400">
            Get support, submit assignments, receive feedback, track progress,
            and stay connected with mentors and fellow learners throughout the
            bootcamp.
          </p>

          <button
            onClick={() =>
              window.open("https://discord.gg/PFQvSaHwwy", "_blank")
            }
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#7F265B] px-8 py-4 font-semibold text-white shadow-[0_16px_36px_rgba(127,38,91,0.26)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_22px_44px_rgba(127,38,91,0.35)] cursor-pointer"
          >
            <span>Join Discord Now</span>
            <span className="text-xl">→</span>
          </button>

          <p className="mt-6 text-sm text-zinc-500">
            Your journey starts here. 100 days. Zero to MERN Master.
          </p>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
