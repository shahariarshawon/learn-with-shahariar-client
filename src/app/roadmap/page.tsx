"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Trophy,
  Layers,
  ChevronRight,
  ExternalLink,
  Code,
  Bot,
  Cloud,
} from "lucide-react";
import Navbar from "@/components/student/Navbar";
import Footer from "@/components/student/Footer";

interface Milestone {
  id: string;
  stage: string;
  level: string;
  title: string;
  duration: string;
  summary: string;
  modules: {
    title: string;
    topics: string[];
    courseRef?: string;
  }[];
  deliverable: string;
  recommendedCourseId?: string;
  recommendedCourseTitle?: string;
}

interface Track {
  id: string;
  name: string;
  badge: string;
  icon: typeof Code;
  description: string;
  estimatedWeeks: number;
  milestones: Milestone[];
}

const ROADMAP_TRACKS: Track[] = [
  {
    id: "fullstack",
    name: "Full Stack Software Engineer",
    badge: "Most Popular",
    icon: Code,
    description: "End-to-end engineering track covering modern TypeScript, React 19, Next.js 15, PostgreSQL, Redis, and cloud architecture.",
    estimatedWeeks: 16,
    milestones: [
      {
        id: "m1",
        stage: "Milestone 01",
        level: "Beginner",
        title: "Foundations & Modern TypeScript",
        duration: "Weeks 1–3 (35 hrs)",
        summary: "Build rock-solid fundamentals in TypeScript type systems, functional programming, DOM APIs, and Git teamwork standards.",
        modules: [
          {
            title: "Advanced TypeScript & Type Safety",
            topics: ["Generics & Conditional Types", "Utility Types & Discriminated Unions", "Strict TSConfig Architecture"],
          },
          {
            title: "Modern JavaScript Runtimes & Async Flow",
            topics: ["Event Loop, Promises & Microtasks", "ES Modules & Build Tooling (Vite/Turbopack)", "Data Structures & Big-O Foundations"],
          },
        ],
        deliverable: "CLI Utility Tool with 100% TypeScript type coverage and automated GitHub Actions CI.",
        recommendedCourseId: "1",
        recommendedCourseTitle: "Complete Full Stack Web Development",
      },
      {
        id: "m2",
        stage: "Milestone 02",
        level: "Intermediate",
        title: "Frontend Mastery with React 19 & Next.js 15",
        duration: "Weeks 4–7 (50 hrs)",
        summary: "Master React Server Components, Server Actions, suspense boundaries, streaming SSR, and accessible design systems.",
        modules: [
          {
            title: "React 19 Hooks & Concurrent Primitives",
            topics: ["useActionState, useOptimistic & use()", "Context & Atomic State Management", "Custom Hooks & Memory Leak Prevention"],
          },
          {
            title: "Next.js 15 App Router & Performance",
            topics: ["Streaming SSR & Suspense Skeletons", "Server Actions with Zod Validation", "Edge Middleware & Caching Strategies"],
          },
        ],
        deliverable: "High-performance SaaS Dashboard with server-rendered tables, optimism, and sub-100ms interaction latency.",
        recommendedCourseId: "1",
        recommendedCourseTitle: "Complete Full Stack Web Development",
      },
      {
        id: "m3",
        stage: "Milestone 03",
        level: "Advanced",
        title: "Scalable Backend & Distributed Systems",
        duration: "Weeks 8–11 (55 hrs)",
        summary: "Architect enterprise backend microservices with Node.js, Express/Nest, PostgreSQL relational modeling, Redis caching, and JWT auth.",
        modules: [
          {
            title: "Resilient API Architecture & Database Modeling",
            topics: ["RESTful & RPC API Conventions", "PostgreSQL Indexing, Transactions & Prisma ORM", "Connection Pooling & Migration Workflows"],
          },
          {
            title: "Authentication, Authorization & Caching",
            topics: ["RBAC (Role-Based Access Control)", "JWT Refresh Flow & Session Invalidation", "Redis Pub/Sub & Write-Through Caching"],
          },
        ],
        deliverable: "Multi-tenant REST API with JWT/RBAC security, rate limiting, and Redis distributed caching layer.",
        recommendedCourseId: "3",
        recommendedCourseTitle: "Advanced Node.js & Microservices",
      },
      {
        id: "m4",
        stage: "Milestone 04",
        level: "Career Ready",
        title: "Production SRE, Cloud Deployment & Capstone",
        duration: "Weeks 12–16 (60 hrs)",
        summary: "Deploy containerized applications to AWS, configure Docker/Kubernetes, instrument OpenTelemetry, and pass senior technical interviews.",
        modules: [
          {
            title: "Containerization & Cloud Infrastructure",
            topics: ["Multi-Stage Docker Builds & Compose", "AWS ECS / EKS Kubernetes Deployments", "Terraform Infrastructure as Code (IaC)"],
          },
          {
            title: "Observability & Capstone Launch",
            topics: ["OpenTelemetry Metrics & Sentry Tracing", "Stripe Subscription & Webhook Processing", "System Design & Mock Remote Job Interviews"],
          },
        ],
        deliverable: "Production-ready SaaS application deployed on AWS with Stripe billing, automated CI/CD, and live active users.",
        recommendedCourseId: "5",
        recommendedCourseTitle: "AWS Cloud Solutions Architect",
      },
    ],
  },
  {
    id: "ai",
    name: "AI & Machine Learning Engineer",
    badge: "High Demand",
    icon: Bot,
    description: "Specialized pathway covering Python mathematical foundations, PyTorch deep learning, LLM fine-tuning, RAG pipelines, and autonomous agents.",
    estimatedWeeks: 14,
    milestones: [
      {
        id: "ai1",
        stage: "Milestone 01",
        level: "Beginner",
        title: "Python Data Foundations & Scientific Computing",
        duration: "Weeks 1–3 (35 hrs)",
        summary: "Master Python scientific computing libraries, exploratory data analysis, and statistical modeling.",
        modules: [
          {
            title: "Scientific Computing Stack",
            topics: ["NumPy Vectorized Operations", "Pandas DataFrames & Feature Engineering", "Matplotlib & Seaborn Visualization"],
          },
        ],
        deliverable: "Exploratory Data Analysis dashboard with statistical hypothesis testing on real-world datasets.",
        recommendedCourseId: "4",
        recommendedCourseTitle: "Python for Data Science & Machine Learning",
      },
      {
        id: "ai2",
        stage: "Milestone 02",
        level: "Intermediate",
        title: "Classical ML & Deep Learning with PyTorch",
        duration: "Weeks 4–7 (45 hrs)",
        summary: "Implement supervised/unsupervised machine learning algorithms and neural network architectures from scratch in PyTorch.",
        modules: [
          {
            title: "Classical Machine Learning",
            topics: ["Regression, Random Forests & XGBoost", "Hyperparameter Tuning with Optuna", "Cross-Validation & Bias-Variance Tradeoff"],
          },
          {
            title: "Deep Neural Networks in PyTorch",
            topics: ["Tensors, Autograd & Custom Layers", "CNNs for Computer Vision", "Transformers & Self-Attention Mechanisms"],
          },
        ],
        deliverable: "Trained PyTorch image classification and text generation models evaluated on benchmark datasets.",
        recommendedCourseId: "4",
        recommendedCourseTitle: "Python for Data Science & Machine Learning",
      },
      {
        id: "ai3",
        stage: "Milestone 03",
        level: "Advanced",
        title: "LLM Engineering, RAG & Vector Databases",
        duration: "Weeks 8–11 (50 hrs)",
        summary: "Build enterprise Retrieval-Augmented Generation (RAG) pipelines, LangChain agents, pgvector embeddings, and prompt optimization.",
        modules: [
          {
            title: "Retrieval-Augmented Generation Architecture",
            topics: ["Chunking Strategies & Hybrid Search", "pgvector & Pinecone Vector Embeddings", "Reranking & Evaluation Frameworks (RAGAS)"],
          },
          {
            title: "Autonomous Agents & Tool Calling",
            topics: ["LangGraph State Machines", "Function Calling & API Integration", "Memory & Conversation History Truncation"],
          },
        ],
        deliverable: "Multi-document conversational AI assistant with citation verification and sub-second latency.",
        recommendedCourseId: "2",
        recommendedCourseTitle: "AI Engineering: Building with LLMs & Agents",
      },
      {
        id: "ai4",
        stage: "Milestone 04",
        level: "Career Ready",
        title: "Model Deployment, Evaluation & MLOps",
        duration: "Weeks 12–14 (40 hrs)",
        summary: "Package LLMs and ML models into production microservices with FastAPI, Docker, model quantization, and vLLM inference engines.",
        modules: [
          {
            title: "Production Inference & Serving",
            topics: ["FastAPI Async Endpoints & WebSockets", "vLLM High-Throughput Serving & PagedAttention", "Model Quantization (GGUF/AWQ)"],
          },
        ],
        deliverable: "Deployed high-concurrency LLM inference API running with streaming token generation and Prometheus monitoring.",
        recommendedCourseId: "2",
        recommendedCourseTitle: "AI Engineering: Building with LLMs & Agents",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps Solutions Architect",
    badge: "Enterprise",
    icon: Cloud,
    description: "System engineering track focused on AWS enterprise infrastructure, Kubernetes container orchestration, Terraform IaC, and zero-downtime CI/CD.",
    estimatedWeeks: 12,
    milestones: [
      {
        id: "c1",
        stage: "Milestone 01",
        level: "Beginner",
        title: "Linux Systems, Networking & GitOps",
        duration: "Weeks 1–2 (25 hrs)",
        summary: "Master Linux shell scripting, TCP/IP networking, DNS resolution, SSH tunneling, and GitOps branching strategies.",
        modules: [
          {
            title: "Linux Internals & Scripting",
            topics: ["Bash Scripting & Automation", "Systemd Services & Process Management", "Networking, Firewalls (UFW/iptables) & SSL/TLS"],
          },
        ],
        deliverable: "Hardened Linux server configuration with automated backup scripts and automated SSH key management.",
        recommendedCourseId: "5",
        recommendedCourseTitle: "AWS Cloud Solutions Architect",
      },
      {
        id: "c2",
        stage: "Milestone 02",
        level: "Intermediate",
        title: "Docker Containerization & Kubernetes Orchestration",
        duration: "Weeks 3–6 (45 hrs)",
        summary: "Containerize microservice architectures, build multi-stage Dockerfiles, and orchestrate clusters with Kubernetes pods, deployments, and ingresses.",
        modules: [
          {
            title: "Docker Mastery",
            topics: ["Multi-Stage Dockerfiles & Image Layering", "Docker Compose Multi-Service Stacks", "Vulnerability Scanning with Trivy"],
          },
          {
            title: "Kubernetes in Practice",
            topics: ["Pods, Deployments, ReplicaSets & Services", "ConfigMaps, Secrets & Volume Mounts", "Ingress Controllers (NGINX/Traefik) & Helm Charts"],
          },
        ],
        deliverable: "Production Kubernetes cluster configuration with auto-scaling (HPA) and automated rolling upgrades.",
        recommendedCourseId: "5",
        recommendedCourseTitle: "AWS Cloud Solutions Architect",
      },
      {
        id: "c3",
        stage: "Milestone 03",
        level: "Advanced",
        title: "AWS Cloud Architecture & Terraform IaC",
        duration: "Weeks 7–9 (40 hrs)",
        summary: "Design fault-tolerant AWS multi-AZ architectures with VPCs, ALB load balancers, RDS Aurora databases, and automated Terraform provisioning.",
        modules: [
          {
            title: "AWS Core Solutions",
            topics: ["VPC Subnetting, Route Tables & NAT Gateways", "ALB, Auto Scaling Groups & Route 53", "S3 Storage Classes & CloudFront CDN"],
          },
          {
            title: "Terraform Infrastructure as Code",
            topics: ["HCL Syntax, Modules & State Locking", "Remote S3 Backends with DynamoDB", "CI/CD Terraform Validation & Drift Detection"],
          },
        ],
        deliverable: "Complete reproducible AWS multi-tier web application provisioned via Terraform modules.",
        recommendedCourseId: "5",
        recommendedCourseTitle: "AWS Cloud Solutions Architect",
      },
      {
        id: "c4",
        stage: "Milestone 04",
        level: "Career Ready",
        title: "Enterprise CI/CD, Observability & Security",
        duration: "Weeks 10–12 (35 hrs)",
        summary: "Construct zero-downtime deployment pipelines with GitHub Actions, Prometheus/Grafana dashboards, and SOC-2 cloud security audits.",
        modules: [
          {
            title: "CI/CD & Observability",
            topics: ["GitHub Actions Blue/Green Deployments", "Prometheus Metrics & Grafana Dashboards", "ELK/Loki Centralized Log Aggregation"],
          },
        ],
        deliverable: "Fully automated GitOps pipeline deploying microservices with automated rollback and real-time PagerDuty alerting.",
        recommendedCourseId: "5",
        recommendedCourseTitle: "AWS Cloud Solutions Architect",
      },
    ],
  },
];

export default function CareerRoadmapPage() {
  const [activeTrackId, setActiveTrackId] = useState<string>("fullstack");
  const [completedMilestones, setCompletedMilestones] = useState<Record<string, boolean>>({});

  // Load completion status from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("lws_roadmap_completion");
      if (saved) {
        setCompletedMilestones(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const toggleMilestone = (id: string) => {
    setCompletedMilestones((prev) => {
      const updated = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem("lws_roadmap_completion", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  const currentTrack = ROADMAP_TRACKS.find((t) => t.id === activeTrackId) || ROADMAP_TRACKS[0];

  const totalMilestones = currentTrack.milestones.length;
  const completedCount = currentTrack.milestones.filter((m) => completedMilestones[m.id]).length;
  const progressPercent = Math.round((completedCount / totalMilestones) * 100);

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 antialiased selection:bg-[#7F265B]/15 selection:text-[#7F265B]">
      <Navbar />

      {/* Hero Header */}
      <section className="border-b border-slate-200/80 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B] mb-3">
                <Compass className="h-3.5 w-3.5" />
                Engineering Roadmaps
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Your Learning Journey
              </h1>
              <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                Step-by-step curriculum milestones structured from foundational principles to production-level distributed systems. Track your completion progress and gain industry-verified competencies.
              </p>
            </div>

            {/* Overall Track Progress Card */}
            <div className="rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs shrink-0 min-w-[260px]">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
                <span>Pathway Progress</span>
                <span className="text-[#7F265B] font-extrabold">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-[#7F265B] transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2.5 text-[11px] font-medium text-slate-400">
                {completedCount} of {totalMilestones} milestones completed
              </p>
            </div>
          </div>

          {/* Track Switcher Tabs */}
          <div className="mt-10 flex flex-wrap gap-3">
            {ROADMAP_TRACKS.map((track) => {
              const Icon = track.icon;
              const isSelected = activeTrackId === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => setActiveTrackId(track.id)}
                  className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#7F265B] text-white shadow-md shadow-[#7F265B]/20 scale-102"
                      : "bg-white border border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{track.name}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {track.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Roadmap Timeline Content */}
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Track Overview */}
        <div className="mb-12 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#7F265B]">
                Curriculum Overview
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">{currentTrack.name}</h2>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl">
                {currentTrack.description}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500">
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
                <Clock className="h-4 w-4 text-[#7F265B]" />
                {currentTrack.estimatedWeeks} Weeks Recommended
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-xl">
                <Trophy className="h-4 w-4 text-amber-500" />
                Verified Certificate
              </span>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-8 relative before:absolute before:inset-0 before:left-7 sm:before:left-8 before:w-0.5 before:bg-slate-200">
            {currentTrack.milestones.map((milestone, idx) => {
              const isCompleted = Boolean(completedMilestones[milestone.id]);
              return (
                <div
                  key={milestone.id}
                  className="relative flex items-start gap-4 sm:gap-6 pl-1 sm:pl-2 group"
                >
                  {/* Timeline Node Button */}
                  <button
                    type="button"
                    onClick={() => toggleMilestone(milestone.id)}
                    title={isCompleted ? "Mark as in-progress" : "Mark as completed"}
                    className={`relative z-10 flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-2xl border-2 transition-all cursor-pointer shadow-xs ${
                      isCompleted
                        ? "border-emerald-500 bg-emerald-50 text-emerald-600 ring-4 ring-emerald-500/10"
                        : "border-slate-300 bg-white text-slate-500 hover:border-[#7F265B] hover:text-[#7F265B]"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 fill-emerald-500 text-white" />
                    ) : (
                      <span className="font-extrabold text-sm">{idx + 1}</span>
                    )}
                  </button>

                  {/* Milestone Card */}
                  <div
                    className={`flex-1 rounded-2xl border bg-white p-6 shadow-xs transition-all duration-300 hover:shadow-md ${
                      isCompleted
                        ? "border-emerald-200 bg-emerald-50/20"
                        : "border-slate-200/90 hover:border-[#7F265B]/30"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#7F265B] uppercase tracking-wide">
                            {milestone.level}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-xs font-bold text-slate-400">
                            {milestone.stage}
                          </span>
                        </div>
                        <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
                          {milestone.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                          <Clock className="h-3 w-3 text-slate-400" />
                          {milestone.duration}
                        </span>

                        <button
                          type="button"
                          onClick={() => toggleMilestone(milestone.id)}
                          className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          }`}
                        >
                          {isCompleted ? "Completed ✓" : "Mark Done"}
                        </button>
                      </div>
                    </div>

                    <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {milestone.summary}
                    </p>

                    {/* Modules & Key Competencies */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      {milestone.modules.map((mod) => (
                        <div
                          key={mod.title}
                          className="rounded-xl border border-slate-100 bg-slate-50/50 p-4"
                        >
                          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 mb-2.5">
                            <Layers className="h-3.5 w-3.5 text-[#7F265B]" />
                            {mod.title}
                          </h4>
                          <ul className="space-y-1.5">
                            {mod.topics.map((t) => (
                              <li key={t} className="flex items-center gap-2 text-xs text-slate-600">
                                <Circle className="h-1.5 w-1.5 fill-slate-400 text-slate-400" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>

                    {/* Milestone Deliverable & Course Recommendation */}
                    <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200/70 bg-gradient-to-r from-slate-50 to-white p-4">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                          Capstone Deliverable
                        </span>
                        <p className="text-xs font-bold text-slate-800 mt-0.5">
                          {milestone.deliverable}
                        </p>
                      </div>

                      {milestone.recommendedCourseId && (
                        <Link
                          href={`/course/${milestone.recommendedCourseId}`}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#7F265B] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#6d214f] transition-colors shrink-0"
                        >
                          <span>Recommended Course</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Conversion Banner */}
        <div className="rounded-3xl border border-[#7F265B]/20 bg-gradient-to-br from-[#7F265B]/5 via-white to-pink-500/5 p-8 text-center sm:p-12">
          <div className="mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7F265B]/10 px-3.5 py-1 text-xs font-bold text-[#7F265B] mb-3">
              <Sparkles className="h-3.5 w-3.5" />
              Accelerate Your Career
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Ready to start this engineering pathway?
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Enroll in our comprehensive courses, receive code reviews from senior staff engineers, and build a portfolio that stands out to hiring managers.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/course-list"
                className="inline-flex items-center gap-2 rounded-full bg-[#7F265B] px-7 py-3 text-xs font-extrabold text-white shadow-md hover:bg-[#6d214f] transition-all"
              >
                Browse All Courses
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
