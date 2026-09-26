"use client";

import React from "react";
import Navbar from "@/components/student/Navbar";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <ContactForm />
    </div>
  );
}
