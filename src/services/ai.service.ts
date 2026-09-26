import {
  ContentGenerationRequest,
  GeneratedQuizQuestion,
  QuizGenerationRequest,
  AIRoadmapPlan,
  AIRecommendationItem,
} from "@/types/ai.types";

/**
 * Service providing AI capabilities for Learn With Shahariar platform.
 * Supports intelligent responses, automated quiz generation, content assistance,
 * personalized learning roadmaps, and course recommendations.
 */

export const AIService = {
  /**
   * Generates intelligent Tutor response to student prompts.
   */
  async askTutor(prompt: string, courseContext?: string): Promise<{ text: string; codeSnippets?: { language: string; code: string }[] }> {
    // Simulate natural AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const query = prompt.toLowerCase();

    if (query.includes("react") || query.includes("hook") || query.includes("state")) {
      return {
        text: `In modern React, Hooks allow you to use state and other React features without writing class components. The core hooks include \`useState\`, \`useEffect\`, \`useContext\`, and in React 19, \`use\` for promises/context. ${
          courseContext ? `Regarding **${courseContext}**, remember to keep state minimal and compute derived state on render!` : ""
        }`,
        codeSnippets: [
          {
            language: "typescript",
            code: `import { useState, useEffect } from 'react';\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>Count: {count}</button>;\n}`,
          },
        ],
      };
    }

    if (query.includes("next") || query.includes("route") || query.includes("app router")) {
      return {
        text: `Next.js 15 App Router uses Server Components by default. Routes are defined using directory structure inside \`src/app/\`. Pages are \`page.tsx\`, layouts are \`layout.tsx\`, and API handlers are placed in \`route.ts\`.`,
        codeSnippets: [
          {
            language: "typescript",
            code: `// src/app/api/hello/route.ts\nimport { NextResponse } from 'next/server';\n\nexport async function GET() {\n  return NextResponse.json({ message: 'Hello from Shahariar LMS AI API!' });\n}`,
          },
        ],
      };
    }

    if (query.includes("prisma") || query.includes("db") || query.includes("database") || query.includes("sql")) {
      return {
        text: `When connecting PostgreSQL/Prisma with Next.js App Router, ensure you instantiate a single shared PrismaClient instance to avoid connection pool exhaustion during hot module reloading in development.`,
        codeSnippets: [
          {
            language: "typescript",
            code: `import { PrismaClient } from '@prisma/client';\n\nconst globalForPrisma = globalThis as unknown as { prisma: PrismaClient };\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;`,
          },
        ],
      };
    }

    return {
      text: `Great question regarding **"${prompt}"**! In professional engineering workflows, breaking down problems into modular components, maintaining clear type definitions in TypeScript, and testing edge cases ensures scalable architecture. Let me know if you want a step-by-step code example or architectural breakdown!`,
    };
  },

  /**
   * Generates automated multiple-choice quiz questions based on topic and difficulty.
   */
  async generateQuiz(req: QuizGenerationRequest): Promise<GeneratedQuizQuestion[]> {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const questions: GeneratedQuizQuestion[] = [
      {
        id: `q-ai-1`,
        question: `What is the primary benefit of Server Components in Next.js 15 for ${req.topic}?`,
        options: [
          "Zero bundle size added to client JavaScript bundle",
          "Automatic conversion of HTML to canvas",
          "Forced execution only on client web browser",
          "Deprecation of CSS modules",
        ],
        correctAnswerIndex: 0,
        explanation: "Server Components execute exclusively on the server and send pre-rendered HTML/RSC payloads, avoiding client JS bundle bloat.",
      },
      {
        id: `q-ai-2`,
        question: `How should state mutations be handled cleanly in ${req.topic}?`,
        options: [
          "By mutating global window variables",
          "Using React Server Actions or immutable state dispatchers",
          "By writing custom DOM parsers",
          "By disabling TypeScript strict mode",
        ],
        correctAnswerIndex: 1,
        explanation: "Server Actions combined with immutable state hooks ensure predictable, type-safe data updates across client and server.",
      },
      {
        id: `q-ai-3`,
        question: `Which directive marks a Next.js component for client-side interactivity?`,
        options: ["'use server'", "'use client'", "'use browser'", "'use state'"],
        correctAnswerIndex: 1,
        explanation: "The `'use client'` directive informs Next.js compiler that the component requires React client lifecycle hooks and DOM listeners.",
      },
    ];

    return questions.slice(0, req.questionCount || 3);
  },

  /**
   * Assists course instructors by generating course descriptions, learning outcomes, or SEO tags.
   */
  async generateCourseContent(req: ContentGenerationRequest): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (req.type === "description") {
      return `Master ${req.topic} from scratch with industry best practices! This comprehensive masterclass covers real-world architecture, scalable patterns, hands-on production projects, and modern deployment strategies. Perfect for developers looking to build enterprise-grade applications.`;
    }

    if (req.type === "outcomes") {
      return `• Build production-ready ${req.topic} applications with modern architecture\n• Master state management, async patterns, and error handling\n• Implement strict type safety with TypeScript\n• Optimize web performance, accessibility, and SEO metrics\n• Deploy scalable solutions to modern cloud platforms (Vercel, AWS)`;
    }

    if (req.type === "seo") {
      return `${req.topic}, modern web development, fullstack tutorial, Learn With Shahariar, TypeScript, React 19, Next.js 15, software engineering course`;
    }

    return `Summary for ${req.topic}: An in-depth, hands-on learning experience designed to take you from foundational concepts to advanced production patterns.`;
  },

  /**
   * Generates personalized learning roadmap plan based on target career goal.
   */
  async generateRoadmap(goal: string, months: number = 6): Promise<AIRoadmapPlan> {
    await new Promise((resolve) => setTimeout(resolve, 1800));

    return {
      goal,
      durationMonths: months,
      createdAt: new Date().toISOString(),
      phases: [
        {
          month: 1,
          title: "Foundations & Strict Type Safety",
          description: "Master modern ECMAScript, TypeScript interfaces, generics, and core architectural principles.",
          topics: ["TypeScript Generics", "Async/Await & Promises", "Git Workflow & CI/CD"],
          recommendedProjects: ["Typed Utility Library", "CLI Tool"],
        },
        {
          month: 2,
          title: "Frontend Mastery & Next.js 15",
          description: "Deep dive into React 19, Server Components, Streaming UI, dynamic routing, and Tailwind CSS design systems.",
          topics: ["Server Components vs Client Components", "Tailwind CSS Design Systems", "Zustand & TanStack Query"],
          recommendedProjects: ["E-Commerce Dashboard", "LMS Video Platform"],
        },
        {
          month: 3,
          title: "Backend Services & Database Design",
          description: "Architect secure REST APIs, GraphQL services, relational databases with Prisma & PostgreSQL, and JWT auth.",
          topics: ["PostgreSQL & Prisma ORM", "NextAuth / OAuth Flow", "Docker Containers"],
          recommendedProjects: ["SaaS Backend API", "Multi-Tenant Auth System"],
        },
        {
          month: 4,
          title: "AI Integration & Cloud Deployment",
          description: "Deploy production applications to Vercel/AWS, integrate AI LLM APIs, and configure automated testing.",
          topics: ["OpenAI LLM Integration", "Vercel Analytics & Edge Functions", "Jest & Playwright Testing"],
          recommendedProjects: ["AI Copilot Dashboard", "Fullstack LMS Platform"],
        },
      ],
    };
  },

  /**
   * Fetches personalized AI course recommendations for the student dashboard.
   */
  async getRecommendations(): Promise<AIRecommendationItem[]> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    return [
      {
        courseId: "fullstack-next-masterclass",
        title: "Fullstack Next.js 15 & React 19 Masterclass",
        thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=600&auto=format&fit=crop",
        matchScore: 98,
        reason: "Based on your interest in Modern JavaScript & App Router",
        level: "Advanced",
      },
      {
        courseId: "python-ai-engineering",
        title: "Python AI & LLM Engineering Handbook",
        thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=600&auto=format&fit=crop",
        matchScore: 94,
        reason: "Recommended for expanding into AI Tutor backend & Agentic workflows",
        level: "Intermediate",
      },
      {
        courseId: "docker-cloud-devops",
        title: "DevOps, Docker & AWS for Frontend Engineers",
        thumbnail: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=600&auto=format&fit=crop",
        matchScore: 89,
        reason: "Matches your goal to become a Senior Fullstack Architect",
        level: "Intermediate",
      },
    ];
  },
};
