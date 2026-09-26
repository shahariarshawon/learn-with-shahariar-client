"use client";

import React from "react";
import Navbar from "@/components/student/Navbar";
import About from "@/components/About";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <About />
    </div>
  );
}
