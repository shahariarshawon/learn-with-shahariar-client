import React from "react";

interface CourseJsonLdProps {
  title: string;
  description: string;
  providerName?: string;
  thumbnailUrl?: string;
  courseUrl?: string;
}

export default function CourseJsonLd({
  title,
  description,
  providerName = "Learn With Shahariar",
  thumbnailUrl = "https://learnwithshahariar.com/logo.png",
  courseUrl = "https://learnwithshahariar.com",
}: CourseJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description: description,
    provider: {
      "@type": "Organization",
      name: providerName,
      sameAs: "https://learnwithshahariar.com",
    },
    image: thumbnailUrl,
    url: courseUrl,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
