import { useQuery } from "@tanstack/react-query";
import { Certificate } from "@/types";

export const certificateService = {
  getUserCertificates: async (token?: string | null): Promise<Certificate[]> => {
    return [
      {
        id: "cert-1",
        certificateId: "LWS-CERT-2024-8842",
        studentName: "Nusrat Jahan",
        courseId: "c-2",
        courseTitle: "Full Stack Web Development Roadmap",
        instructorName: "Shahariar Shawon",
        issueDate: "April 10, 2024",
        verificationUrl: "https://learnwithshahariar.com/certificate/LWS-CERT-2024-8842",
        grade: "Distinction (98%)",
      },
    ];
  },

  getCertificateById: async (certificateId: string): Promise<Certificate> => {
    return {
      id: "cert-1",
      certificateId: certificateId || "LWS-CERT-2024-8842",
      studentName: "Nusrat Jahan",
      courseId: "c-2",
      courseTitle: "Master Next.js 15 & Full Stack TypeScript",
      instructorName: "Shahariar Shawon",
      issueDate: "April 10, 2024",
      verificationUrl: `https://learnwithshahariar.com/certificate/${certificateId}`,
      grade: "Distinction (98%)",
    };
  },
};

export const useUserCertificatesQuery = (token?: string | null) => {
  return useQuery({
    queryKey: ["user-certificates"],
    queryFn: () => certificateService.getUserCertificates(token),
  });
};

export const useCertificateByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["certificate", id],
    queryFn: () => certificateService.getCertificateById(id),
    enabled: Boolean(id),
  });
};
