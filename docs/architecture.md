# Learn With Shahariar Client — System Architecture & Design Guidelines

## 1. Overview
Learn With Shahariar Client is built on Next.js 15 App Router, TypeScript, Tailwind CSS, TanStack Query v5, Zustand v5, and Clerk Authentication.

## 2. Directory Structure & Modular Design
```
src/
├── app/                  # Next.js 15 App Router pages, layouts, and API routes
├── components/           # UI components
│   ├── common/           # Shared layout components (Navbar, Footer)
│   ├── ui/               # Reusable atomic elements (Buttons, Modals, Loaders)
│   └── course/           # Course cards, filters, ratings
├── features/             # Domain feature modules
│   ├── auth/             # Authentication & user profile state
│   ├── courses/          # Course catalog, search, and details
│   ├── learning/         # Player, notes, bookmarks, quizzes
│   ├── payment/          # Checkout session & Stripe integration
│   ├── dashboard/        # Student & Educator dashboard modules
│   └── ai/               # AI Assistant & chat capabilities
├── services/             # Centralized API service layer
│   ├── apiClient.ts      # Axios singleton with auth token injection & interceptors
│   ├── course.service.ts
│   ├── learning.service.ts
│   ├── payment.service.ts
│   └── ai.service.ts
├── hooks/                # Custom React & TanStack Query hooks
├── store/                # Zustand global state management
├── types/                # Domain type definitions & API contracts
├── utils/                # Helper functions, error handlers, and duration utilities
└── constants/            # Application config, routes, roles, and static texts
```

## 3. State Management & Data Fetching
- **Server State**: Managed via TanStack Query (`@tanstack/react-query`) with caching and invalidation strategies.
- **Client State**: Lightweight Zustand stores (`useUserStore`, `useCourseStore`, `useStudentLearningStore`, `useUiStore`, `useAiStore`).
- **Auth State**: Managed through Clerk Provider (`@clerk/nextjs`).
