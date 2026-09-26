"use client";

import React from "react";
import Navbar from "@/components/student/Navbar";
import PrivacyPolicy from "@/components/PrivacyPolicy";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PrivacyPolicy />
    </div>
  );
}
