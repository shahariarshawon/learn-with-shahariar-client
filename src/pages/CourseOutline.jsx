import React from "react";
import { motion } from "framer-motion";

const CourseOutline = () => {
  const curriculum = [
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
          chapters: ["JSX & Components", "Props", "State", "Events", "Quiz"],
        },
        {
          id: 14,
          title: "Hooks",
          duration: "2 hours",
          chapters: [
            "useState",
            "useEffect",
            "useRef",
            "Custom Hooks",
            "Quiz",
          ],
        },
        {
          id: 15,
          title: "React Project",
          duration: "2 hours",
          chapters: [
            "Task Manager App",
            "Component Reuse",
            "State Patterns",
            "Deployment",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 6,
      title: "React Advanced",
      modules: [
        {
          id: 16,
          title: "Routing",
          duration: "2 hours",
          chapters: [
            "React Router",
            "Dynamic Routes",
            "Protected Routes",
            "Navigation",
            "Quiz",
          ],
        },
        {
          id: 17,
          title: "State Management",
          duration: "2 hours",
          chapters: [
            "Context API",
            "Global State",
            "Best Practices",
            "Optimization",
            "Quiz",
          ],
        },
        {
          id: 18,
          title: "Frontend Project",
          duration: "2 hours",
          chapters: [
            "Blog UI",
            "Search & Filter",
            "Auth UI",
            "Deployment",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 7,
      title: "Node.js & Express",
      modules: [
        {
          id: 19,
          title: "Node Basics",
          duration: "2 hours",
          chapters: [
            "Node Architecture",
            "Modules",
            "NPM",
            "CLI Tools",
            "Quiz",
          ],
        },
        {
          id: 20,
          title: "Express API",
          duration: "2 hours",
          chapters: [
            "Routing",
            "Middleware",
            "REST API",
            "Error Handling",
            "Quiz",
          ],
        },
        {
          id: 21,
          title: "Backend Project",
          duration: "2 hours",
          chapters: [
            "CRUD API",
            "Postman Testing",
            "Validation",
            "Structure",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 8,
      title: "Database (MongoDB)",
      modules: [
        {
          id: 22,
          title: "MongoDB Basics",
          duration: "2 hours",
          chapters: [
            "Collections & Documents",
            "CRUD Operations",
            "Indexes",
            "Atlas Setup",
            "Quiz",
          ],
        },
        {
          id: 23,
          title: "Mongoose",
          duration: "2 hours",
          chapters: [
            "Schemas",
            "Models",
            "Validation",
            "Relationships",
            "Quiz",
          ],
        },
        {
          id: 24,
          title: "Backend Integration",
          duration: "2 hours",
          chapters: [
            "Connect DB",
            "API + DB",
            "Error Handling",
            "Optimization",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 9,
      title: "Authentication",
      modules: [
        {
          id: 25,
          title: "Auth Basics",
          duration: "2 hours",
          chapters: [
            "JWT",
            "Hashing (bcrypt)",
            "Login/Register",
            "Security Basics",
            "Quiz",
          ],
        },
        {
          id: 26,
          title: "Advanced Auth",
          duration: "2 hours",
          chapters: [
            "Protected Routes",
            "Role-based Auth",
            "Middleware",
            "Token Flow",
            "Quiz",
          ],
        },
        {
          id: 27,
          title: "Auth Project",
          duration: "2 hours",
          chapters: [
            "Full Auth System",
            "Frontend + Backend",
            "Error Handling",
            "Testing",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 10,
      title: "Full MERN Integration",
      modules: [
        {
          id: 28,
          title: "Connect Frontend + Backend",
          duration: "2 hours",
          chapters: [
            "Axios Setup",
            "API Calls",
            "State Sync",
            "Error Handling",
            "Quiz",
          ],
        },
        {
          id: 29,
          title: "Advanced Features",
          duration: "2 hours",
          chapters: [
            "Pagination",
            "Filtering",
            "Search",
            "Performance",
            "Quiz",
          ],
        },
        {
          id: 30,
          title: "Full Stack Project",
          duration: "2 hours",
          chapters: [
            "E-commerce / LMS",
            "Cart / Enrollment",
            "Dashboard",
            "Review",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 11,
      title: "Real Projects",
      modules: [
        {
          id: 31,
          title: "Project 1",
          duration: "2 hours",
          chapters: ["Design", "Development", "Testing", "Deployment", "Quiz"],
        },
        {
          id: 32,
          title: "Project 2",
          duration: "2 hours",
          chapters: [
            "Advanced Features",
            "Optimization",
            "Debugging",
            "Refactor",
            "Quiz",
          ],
        },
        {
          id: 33,
          title: "Project 3",
          duration: "2 hours",
          chapters: [
            "Real-time Features",
            "Socket.io",
            "UI Polish",
            "Final Review",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 12,
      title: "Deployment & DevOps",
      modules: [
        {
          id: 34,
          title: "Frontend Deployment",
          duration: "2 hours",
          chapters: [
            "Vercel",
            "Environment Variables",
            "Domain Setup",
            "Debugging",
            "Quiz",
          ],
        },
        {
          id: 35,
          title: "Backend Deployment",
          duration: "2 hours",
          chapters: ["Render", "CORS Fix", "Env Config", "Logs", "Quiz"],
        },
        {
          id: 36,
          title: "Production Fixes",
          duration: "2 hours",
          chapters: [
            "API Errors",
            "Security",
            "Optimization",
            "Monitoring",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 13,
      title: "Career Preparation",
      modules: [
        {
          id: 37,
          title: "Portfolio",
          duration: "2 hours",
          chapters: [
            "Portfolio Site",
            "Project Showcase",
            "GitHub Optimization",
            "Resume",
            "Quiz",
          ],
        },
        {
          id: 38,
          title: "Job Preparation",
          duration: "2 hours",
          chapters: [
            "Interview Questions",
            "Coding Tests",
            "System Design Basics",
            "Freelancing",
            "Quiz",
          ],
        },
        {
          id: 39,
          title: "Final Review",
          duration: "2 hours",
          chapters: [
            "Project Polish",
            "Mock Interview",
            "Deployment Check",
            "Final Feedback",
            "Quiz",
          ],
        },
      ],
    },
    {
      week: 14,
      title: "Capstone & Placement",
      modules: [
        {
          id: 40,
          title: "Capstone Project",
          duration: "2 hours",
          chapters: [
            "Full MERN App",
            "Auth + Payment",
            "Dashboard",
            "Optimization",
            "Quiz",
          ],
        },
        {
          id: 41,
          title: "Final Deployment",
          duration: "2 hours",
          chapters: [
            "Live Project",
            "Domain Setup",
            "SEO Basics",
            "Testing",
            "Quiz",
          ],
        },
        {
          id: 42,
          title: "Placement Ready",
          duration: "2 hours",
          chapters: [
            "CV + LinkedIn",
            "Apply Strategy",
            "Remote Jobs",
            "Freelance Guide",
            "Quiz",
          ],
        },
      ],
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65 },
    },
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-br from-[#7F265B] via-[#5d1d43] to-[#24111d] px-6 py-24">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-fuchsia-400/10 blur-3xl" />
        <div className="absolute right-0 top-10 h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="relative mx-auto max-w-6xl text-center"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-2 text-sm font-medium backdrop-blur-md">
            🚀 100 DAYS MERN STACK BOOTCAMP
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            From Zero to{" "}
            <span className="text-[#ffd67a]">MERN Master</span>
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-lg">
            Master the full MERN stack in 100 days with a structured roadmap,
            hands-on assignments, quizzes after every chapter, and community
            support designed to help you stay consistent and job-ready.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 text-sm">
            {[
              "14 Weeks • 100 Days",
              "42 Modules • 2 hrs each",
              "150+ Chapters + Quizzes",
              "Private Discord Community",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
              >
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex rounded-full border border-[#7F265B]/30 bg-[#7F265B]/10 px-4 py-1.5 text-sm font-medium text-[#d89aba]">
            How the bootcamp works
          </div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Structured to help you stay consistent
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              emoji: "📆",
              title: "3 Modules Every Week",
              text: "Every week unlocks three focused modules so you can build skills progressively without feeling lost.",
            },
            {
              emoji: "📖",
              title: "Learn → Practice → Quiz",
              text: "Each chapter is followed by practice and quizzes to reinforce understanding and improve retention.",
            },
            {
              emoji: "💬",
              title: "Private Discord Support",
              text: "Ask questions, get feedback, stay accountable, and grow alongside peers and mentors.",
            },
          ].map((item) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={fadeUp}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-2 hover:border-[#7F265B]/40 hover:bg-white/[0.05]"
            >
              <div className="mb-4 text-3xl">{item.emoji}</div>
              <h3 className="text-2xl font-semibold">{item.title}</h3>
              <p className="mt-4 leading-7 text-zinc-400">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Curriculum */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold sm:text-4xl">Full Course Outline</h2>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            42 Modules • Ready to launch
          </div>
        </div>

        <div className="space-y-14">
          {curriculum.map((week) => (
            <motion.div
              key={week.week}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={fadeUp}
              className="rounded-[28px] border border-white/10 bg-white/[0.03] p-5 sm:p-7"
            >
              {/* Week header */}
              <div className="mb-8 flex flex-col gap-4 border-b border-white/10 pb-5 md:flex-row md:items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7F265B]/20 text-xl font-bold text-white shadow-lg">
                  {week.week}
                </div>

                <div>
                  <h3 className="text-2xl font-bold sm:text-3xl">
                    Week {week.week}
                  </h3>
                  <p className="mt-1 text-zinc-400">{week.title}</p>
                </div>

                <div className="md:ml-auto">
                  <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
                    3 Modules • 6 hours
                  </span>
                </div>
              </div>

              {/* Modules */}
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

      {/* CTA */}
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
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#7F265B] px-8 py-4 font-semibold text-white shadow-[0_16px_36px_rgba(127,38,91,0.26)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6d214f] hover:shadow-[0_22px_44px_rgba(127,38,91,0.35)]"
          >
            <span>Join Discord Now</span>
            <span className="text-xl">→</span>
          </button>

          <p className="mt-6 text-sm text-zinc-500">
            Your journey starts here. 100 days. Zero to MERN Master.
          </p>
        </motion.div>
      </section>

      <footer className="border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        100 Days MERN Stack Bootcamp • Course Outline Page • Built with React +
        Tailwind
      </footer>
    </div>
  );
};

export default CourseOutline;