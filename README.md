# Learn With Shahariar — Modern LMS Client

A production-grade, enterprise-ready Learning Management System (LMS) frontend built with **Next.js 15 (App Router)**, **TypeScript (Strict Mode)**, **Tailwind CSS**, and modern web engineering best practices.

---

## 🌟 Key Highlights & Features

- ⚡ **Next.js 15 App Router Architecture**: Leverages React Server Components (RSC), asynchronous route handlers, dynamic nested layouts, and static optimization.
- 🔒 **100% Strict TypeScript**: Fully typed domain models (`Course`, `Chapter`, `Lecture`, `User`, `Quiz`, `Educator`) with zero `any` bypasses and no `@ts-ignore`.
- 🎨 **Preserved Brand Identity**: Signature maroon/berry theme (`#7F265B`), responsive glassmorphism navigation, dynamic gradients, interactive micro-animations, and accessible dark-footer styling.
- 🎓 **Student Learning Portal**:
  - Hero search, category exploration, and dynamic course filtering.
  - Interactive course details with curriculum breakdown and lecture previews.
  - Immersive video player supporting chapter/lecture navigation, progress tracking, dynamic tabs (notes, resources, discussions), and interactive quizzes.
  - My Enrollments dashboard with live progress percentage indicators.
- 👨‍🏫 **Educator Dashboard**:
  - Metric cards (revenue, student enrollment, course performance).
  - Multi-step Course Creation & Management with rich-text description editor (Quill SSR-safe).
  - Lecture management with duration formatting, preview controls, and chapter grouping.
  - Interactive Quiz builder & manager.
- 🛡️ **Authentication & User Management**: Integrated with Clerk (`@clerk/nextjs`) with synchronized context state and backend session handling.
- 🌐 **Robust Service & State Layer**:
  - Axios API client with bearer token interception and standardized error envelopes.
  - TanStack React Query for cached data fetching and optimistic mutations.
  - Zustand stores for UI state management.

---

## 🏗️ Architecture & Directory Structure

```text
├── src/
│   ├── app/                      # Next.js 15 App Router routes & layouts
│   │   ├── (student routes)/     # Home, course details, enrollments, player, quizzes
│   │   ├── educator/             # Educator portal & course management
│   │   ├── globals.css           # Design tokens, typography, rich-text styling
│   │   ├── layout.tsx            # Root layout with QueryProvider, Clerk, Toast
│   │   ├── error.tsx             # Route error boundary
│   │   ├── loading.tsx           # Fallback loading skeleton
│   │   └── not-found.tsx         # Custom 404 page
│   ├── assets/                   # Static icons, illustrations, and logos
│   ├── components/
│   │   ├── common/               # SocialIcons, Logger, Signature, UI widgets
│   │   ├── educator/             # Educator Navbar, Sidebar, Footer, Metric cards
│   │   ├── presentation/         # About, Contact, PrivacyPolicy pages
│   │   ├── providers/            # React Query & Toast providers
│   │   ├── student/              # Student Navbar, Hero, CourseCard, Rating, etc.
│   │   └── ui/                   # Reusable UI primitives (Button, Skeleton, Badge, EmptyState)
│   ├── constants/                # App configuration, dummy fallback datasets
│   ├── context/                  # AppContext & State synchronization
│   ├── services/                 # Modular API service layer (courses, educator, user, quiz)
│   ├── store/                    # Zustand UI & User state stores
│   ├── types/                    # Domain TypeScript declarations & schemas
│   └── utils/                    # Helper functions (cn, duration, formatters)
├── public/                       # Static public assets
├── next.config.ts                # Next.js production & image domain configuration
├── tailwind.config.ts            # Tailwind CSS theme extension
└── tsconfig.json                 # Strict TypeScript configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18.18.0+ or v20.x+
- **npm** or **pnpm** / **yarn**

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://api.learnwithshahariar.com

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# App Config
NEXT_PUBLIC_CURRENCY=$
NEXT_PUBLIC_APP_NAME="Learn With Shahariar"
```

### 3. Installation
```bash
npm install
```

### 4. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Type Checking & Production Build
```bash
# Type check without emitting files
npm run type-check

# Build for production
npm run build

# Start production server
npm start
```

---

## 🚢 Deployment (Vercel Ready)

This application is fully optimized for **Vercel** deployment with zero additional configuration needed:
1. Connect this repository on [Vercel](https://vercel.com).
2. Set Environment Variables (`NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, etc.).
3. Deploy! Next.js 15 App Router routes and static optimizations are automatically deployed on edge & serverless infrastructure.

---

## 📄 License
MIT © Learn With Shahariar
