import React from "react";
import Loading from "@/components/student/Loading";

export default function RootLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white">
      <Loading />
    </div>
  );
}
