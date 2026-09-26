# Learn With Shahariar — LMS Client Application

![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=flat-square&logo=react-query)
![Zustand](https://img.shields.io/badge/Zustand-v5-orange?style=flat-square)

## 📌 Project Overview
**Learn With Shahariar Client** is a production-grade, full-stack Learning Management System (LMS) frontend application designed for high scalability, type safety, and real-time interactive learning.

Live Web App: [https://learn-with-shahariar-server.vercel.app](https://learn-with-shahariar-server.vercel.app)

---

## ✨ Features
- 🎓 **Interactive Course Player**: Video playback, progress tracking, lecture navigation, resources, bookmarks, and student notes.
- 🤖 **AI Assistant**: Built-in AI Tutor for course Q&A, quiz generation, and personalized roadmap creation.
- 💳 **Seamless Payments**: Integrated Stripe Checkout session for course enrollments.
- 📊 **Educator & Student Dashboards**: Enrollment analytics, course creation, quiz management, and earnings overview.
- ⚡ **Type-Safe Architecture**: 100% TypeScript with strict compiler checks, zero `any` types, and custom query hooks.

---

## 🛠️ Technology Stack
- **Framework**: Next.js 15 (App Router, Server Components, Metadata API)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS, Framer Motion, Lucide React
- **State Management**: TanStack Query v5, Zustand v5
- **Authentication**: Clerk Next.js
- **Testing**: Jest, React Testing Library, ts-jest

---

## 🚀 Quick Start & Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahariarshawon/learn-with-shahariar-client.git
cd learn-with-shahariar-client

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local

# 4. Start local development server
npm run dev
```

---

## 🧪 Running Tests & Build Validation

```bash
# Run unit and component test suite
npm test

# Run TypeScript type check
npm run type-check

# Run production build
npm run build
```
