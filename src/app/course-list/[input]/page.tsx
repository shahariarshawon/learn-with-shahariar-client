import React from "react";
import { CourseListContent } from "../page";

interface CourseListSearchProps {
  params: Promise<{ input: string }>;
}

export default async function CourseListSearchPage({ params }: CourseListSearchProps) {
  const resolvedParams = await params;
  const decodedInput = decodeURIComponent(resolvedParams?.input || "");

  return <CourseListContent initialSearch={decodedInput} />;
}
