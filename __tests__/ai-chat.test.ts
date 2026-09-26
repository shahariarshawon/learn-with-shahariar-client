import { AIService } from "../src/services/ai.service";

describe("AI Service Tutor Output", () => {
  it("should return interactive React answers for React queries", async () => {
    const response = await AIService.askTutor("Explain React hooks");
    expect(response.text).toContain("React");
    expect(response.codeSnippets).toBeDefined();
    expect(response.codeSnippets?.length).toBeGreaterThan(0);
  });

  it("should return Next.js App Router explanation for Next.js queries", async () => {
    const response = await AIService.askTutor("How does Next.js App Router work?");
    expect(response.text).toContain("Next.js 15");
  });
});
