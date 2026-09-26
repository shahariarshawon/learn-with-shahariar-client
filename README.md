# 🎓 Learn With Shahariar — Modern EdTech & AI LMS Platform

> **Learn With Shahariar** is a next-generation, high-performance web learning management system (LMS) engineered with Next.js 15, TypeScript, Tailwind CSS, TanStack Query, Zustand, and AI Tutor capabilities. Designed for world-class student video streaming, secure dynamic watermarking, course builder workflows, SaaS instructor/admin analytics, and monetized checkout systems.

---

## ✨ Features Highlight

### 📱 1. Core Architecture & Modern Stack
- **Next.js 15 App Router** & **React 19** with Server & Client components architecture.
- **100% Strict TypeScript** (`"strict": true`) ensuring end-to-end type safety.
- **Tailwind CSS** responsive design system with dark mode glassmorphism and `#7F265B` brand identity.

### 🎓 2. Course Builder & Syllabus Architecture
- Interactive Course Builder, Module structure, Lesson hierarchy, Learning objectives, and Review ratings.

### 📺 3. Student Learning Dashboard & Secure Video Player
- Student learning hub (`/dashboard/learning`) tracking watched lessons and completion progress.
- Custom HTML5 Video Player with controls, speed adjustment, bookmarks, notes, and resources.

### 🔒 4. Dynamic Student Watermark Overlay
- Moving dynamic email overlay watermark animating every 5 seconds across the video canvas to prevent unauthorized screen recording and redistribution.

### 📊 5. Instructor & Admin SaaS Dashboards
- Comprehensive analytics powered by **Recharts** for student enrollments, course approvals, revenue metrics, and user permission management (`/instructor/*`, `/admin/*`).

### 💳 6. Monetization, Checkout & Certificate System
- Full purchase flow with coupon discount engine, multi-currency support, invoice records (`/dashboard/purchases`), and downloadable HTML5 SVG certificates (`/certificate/[id]`).

### 🤖 7. AI-Powered Tutor & Learning System
- **AI Tutor Chat (`/ai-assistant`)**: Pair-programming AI tutor for code explanations and debugging tips.
- **Course AI Overlay (`CourseAIChat.tsx`)**: In-lesson contextual AI tutor widget for instant answers while watching videos.
- **AI Career Roadmap Generator (`AIRoadmapGenerator.tsx`)**: Customized milestone timeline generator for career paths.
- **AI MCQ Quiz Generator (`AIQuizGenerator.tsx`)**: Automated assessment generator with interactive test mode.
- **AI Recommendation Engine (`AIRecommendationSection.tsx`)**: Personalized course matching engine.

---

## 🏗️ Architecture & Folder Structure

```
learn-with-shahariar-client/
├── __tests__/                  # Unit & Component Test Suites (Jest & Testing Library)
├── public/                     # Static assets, logos, favicons
├── src/
│   ├── app/                    # Next.js 15 App Router Pages & Routes
│   │   ├── admin/              # Admin Panel Dashboard routes
│   │   ├── ai-assistant/       # AI Tutor & History routes
│   │   ├── certificate/        # Course Certificate view
│   │   ├── checkout/           # Course Purchase & Checkout
│   │   ├── dashboard/          # Student Dashboard & Purchases
│   │   ├── instructor/         # Instructor SaaS Dashboard routes
│   │   ├── learn/              # Secure Video Player route
│   │   ├── error.tsx           # Runtime Error Boundary
│   │   ├── global-error.tsx    # Root Layout Error Boundary
│   │   ├── not-found.tsx       # Custom 404 Page
│   │   ├── sitemap.ts          # SEO Sitemap
│   │   └── robots.ts           # Search Crawler Rules
│   ├── components/             # Reusable UI Components
│   │   ├── ai/                 # AI Assistant, Quiz, Roadmap & Chat components
│   │   ├── course/             # Course Cards, Builder & Review components
│   │   ├── player/             # Video Player & Dynamic Watermark
│   │   ├── seo/                # JSON-LD Structured Data
│   │   ├── student/            # Student Navbar & Footer
│   │   └── ui/                 # Skeletons, Inputs & Modals
│   ├── context/                # App React Context
│   ├── lib/                    # Validation schemas & Utilities
│   ├── services/               # API & AI Service layer
│   ├── store/                  # Zustand Stores (Video, AI, Student Learning)
│   └── types/                  # TypeScript interface contracts
├── next.config.ts              # Next.js Config (AVIF/WebP, Image remote patterns)
├── package.json                # Project dependencies & scripts
└── tsconfig.json               # Strict TypeScript config
```

---

## 🛠️ Tech Stack & Tools

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.7 (Strict Mode)
- **Styling:** Tailwind CSS + Framer Motion
- **State Management:** Zustand (Persisted Storage)
- **Data Fetching:** TanStack React Query v5
- **Forms & Validation:** React Hook Form + Zod
- **Analytics Charts:** Recharts
- **Testing:** Jest + React Testing Library

---

## ⚡ Quick Start & Installation

### Prerequisites
- Node.js v18.17+ or v20+
- npm or yarn

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/shahariarshawon/learn-with-shahariar-client.git
cd learn-with-shahariar-client
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_pub_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_API_URL=https://api.learnwithshahariar.com
```

### 3. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your web browser.

---

## 🧪 Testing & Build Verification

Run TypeScript compilation check:
```bash
npm run type-check
```

Run test suite:
```bash
npm run test
```

Build production bundle:
```bash
npm run build
```

---

## 📜 License & Copyright

Designed and developed by **Shahariar Shawon** © 2026. All rights reserved.
