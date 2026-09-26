import type { Metadata, Viewport } from "next";
import { Outfit, Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReactQueryProvider } from "@/components/providers/query-provider";
import { ToastProvider } from "@/components/providers/toast-provider";
import { AppContextProvider } from "@/context/AppContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Learn With Shahariar | MERN Stack Development Course & Projects",
  description:
    "Learn MERN Stack development with Shahariar. Complete MongoDB, Express, React, and Node.js course with real-world projects, assignments, and full-stack training.",
  keywords: [
    "Learn With Shahariar",
    "MERN Stack Course",
    "MERN development course",
    "MongoDB Express React Node course",
    "full stack web development course",
    "learn MERN stack Bangladesh",
  ],
  authors: [{ name: "Shahariar" }],
  metadataBase: new URL("https://learn-with-shahariar.vercel.app"),
  alternates: {
    canonical: "https://learn-with-shahariar.vercel.app/",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "tMGdZx1DJI-k7tS-TRQ4XNq1DMDU5pFiIm7S9hfXxQI",
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Learn With Shahariar | MERN Stack Course",
    description:
      "Complete MERN stack development course with real-world projects and assignments.",
    url: "https://learn-with-shahariar.vercel.app/",
    siteName: "Learn With Shahariar",
    images: [
      {
        url: "https://i.postimg.cc/661k8zhY/favicon.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn With Shahariar | MERN Stack Course",
    description: "Learn MERN stack with practical full-stack projects.",
    images: ["https://i.postimg.cc/661k8zhY/favicon.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/"
    >
      <html lang="en" className={`${outfit.variable} ${poppins.variable}`}>
        <body className="min-h-screen bg-white font-sans text-[#252525] antialiased">
          <ReactQueryProvider>
            <AppContextProvider>
              <ToastProvider />
              {children}
            </AppContextProvider>
          </ReactQueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
