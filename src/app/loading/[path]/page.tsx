import React from "react";
import Loading from "@/components/student/Loading";

interface LoadingPathProps {
  params: Promise<{ path: string }>;
}

export default async function LoadingPathPage({ params }: LoadingPathProps) {
  const resolvedParams = await params;
  const path = resolvedParams?.path || "";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#faf5f8] via-white to-white">
      <Loading path={path} />
    </div>
  );
}
