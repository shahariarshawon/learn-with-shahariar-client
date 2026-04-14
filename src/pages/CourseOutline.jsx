import React from "react";

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
        chapters: [
          "JSX & Components",
          "Props",
          "State",
          "Events",
          "Quiz",
        ],
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
        chapters: [
          "Design",
          "Development",
          "Testing",
          "Deployment",
          "Quiz",
        ],
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
        chapters: [
          "Render",
          "CORS Fix",
          "Env Config",
          "Logs",
          "Quiz",
        ],
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
  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-600 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-6 py-2 rounded-3xl mb-6 backdrop-blur-md">
            🚀 100 DAYS MERN STACK BOOTCAMP
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">
            From Zero to <span className="text-yellow-300">MERN Master</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/90 mb-8">
            Master the entire MERN Stack in 100 days. 42 modules. 3 modules
            every week. Quizzes after every chapter. Full Discord support.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/10 px-5 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-emerald-400">📅</span>
              <span>14 Weeks • 100 Days</span>
            </div>
            <div className="bg-white/10 px-5 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-emerald-400">📦</span>
              <span>42 Modules • 2.5 hrs each</span>
            </div>
            <div className="bg-white/10 px-5 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-emerald-400">✅</span>
              <span>150+ Chapters + Quizzes</span>
            </div>
            <div className="bg-white/10 px-5 py-2 rounded-2xl flex items-center gap-2">
              <span className="text-emerald-400">💬</span>
              <span>Private Discord Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* How the Bootcamp Works */}
      <div className="max-w-6xl mx-auto px-6 py-16 border-b border-white/10">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="text-emerald-400 text-xl font-semibold mb-2">
              📆 Weekly Structure
            </div>
            <h2 className="text-3xl font-bold mb-4">3 Modules Every Week</h2>
            <p className="text-zinc-400">
              Every week you get 3 brand-new modules (2.5 hours each). Complete
              them at your own pace.
            </p>
          </div>
          <div>
            <div className="text-emerald-400 text-xl font-semibold mb-2">
              📖 Chapter + Quiz Flow
            </div>
            <h2 className="text-3xl font-bold mb-4">Learn → Practice → Quiz</h2>
            <p className="text-zinc-400">
              Every chapter ends with a quiz to reinforce your learning.
              Assignments and projects included in every module.
            </p>
          </div>
          <div>
            <div className="text-emerald-400 text-xl font-semibold mb-2">
              💬 Full Support
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Private Discord Community
            </h2>
            <p className="text-zinc-400">
              Get help instantly. Submit assignments, see quiz marks, discuss
              problems, network with peers and mentors.
            </p>
          </div>
        </div>
      </div>

      {/* Curriculum */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">Full Course Outline</h2>
          <div className="text-zinc-400 text-sm flex items-center gap-2">
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
            42 Modules • Ready to launch
          </div>
        </div>

        {curriculum.map((week) => (
          <div key={week.week} className="mb-16">
            {/* Week Header */}
            <div className="flex items-center gap-4 mb-6 border-b border-white/10 pb-4">
              <div className="bg-white/10 text-white font-mono w-10 h-10 flex items-center justify-center rounded-2xl text-2xl font-bold">
                {week.week}
              </div>
              <div>
                <h3 className="text-3xl font-semibold">Week {week.week}</h3>
                <p className="text-zinc-400 text-lg">{week.title}</p>
              </div>
              <div className="ml-auto text-emerald-400 text-sm font-medium flex items-center gap-1.5">
                <span className="bg-emerald-400/10 px-3 py-1 rounded-3xl">
                  3 Modules • 7.5 hours
                </span>
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {week.modules.map((module) => (
                <div
                  key={module.id}
                  className="bg-zinc-900 rounded-3xl p-6 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group border border-white/5"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl font-mono text-white/20 group-hover:text-white/40 transition-colors">
                      {module.id.toString().padStart(2, "0")}
                    </div>
                    <span className="text-xs font-medium bg-white/10 px-4 py-2 rounded-3xl text-emerald-300">
                      {module.duration}
                    </span>
                  </div>

                  <h4 className="text-xl font-semibold mb-3 leading-tight">
                    {module.title}
                  </h4>

                  {/* Chapters Accordion */}
                  <details className="group/details">
                    <summary className="flex justify-between items-center cursor-pointer text-zinc-400 hover:text-white py-3 text-sm font-medium">
                      <span className="flex items-center gap-2">
                        📚 {module.chapters.length} Chapters
                      </span>
                      <span className="text-emerald-400 transition-transform group-open/details:rotate-180">
                        ▼
                      </span>
                    </summary>
                    <ul className="mt-4 space-y-3 text-sm text-zinc-300 pl-2">
                      {module.chapters.map((chapter, i) => (
                        <li key={i} className="flex gap-3 items-start">
                          <span className="text-emerald-400 mt-1">•</span>
                          <span>{chapter}</span>
                        </li>
                      ))}
                      <li className="flex gap-3 items-start pt-3 border-t border-white/10 text-emerald-400 text-xs font-medium">
                        ✅ Quiz after every chapter
                      </li>
                    </ul>
                  </details>

                  <div className="text-[10px] text-white/40 mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
                    <span>Module {module.id}</span>
                    <span className="font-medium text-emerald-300">
                      Hands-on + Assignments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final CTA + Discord */}
      <div className="bg-zinc-900 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="max-w-md mx-auto">
            <div className="text-4xl mb-6">💬 Join the Community</div>
            <h2 className="text-3xl font-bold mb-4">Private Discord Server</h2>
            <p className="text-zinc-400 mb-8">
              Get 1:1 support, submit assignments, see live quiz marks, get
              feedback on projects, and connect with fellow students and
              instructors.
            </p>
            <button
              onClick={() => window.open("https://discord.gg/PFQvSaHwwy", "_blank")}
              className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white px-10 py-4 rounded-3xl font-semibold flex items-center gap-3 mx-auto"
            >
              <span>Join Discord Now</span>
              <span className="text-2xl">→</span>
            </button>
            <p className="text-xs text-zinc-500 mt-6">
              Your learning journey starts here. 100 days. Zero to MERN Master.
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center py-8 text-zinc-500 text-sm border-t border-white/10">
        100 Days MERN Stack Bootcamp • Course Outline Page • Built with React +
        Tailwind
      </footer>
    </div>
  );
};

export default CourseOutline;
