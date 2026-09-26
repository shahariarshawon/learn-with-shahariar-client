export interface AIMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
  codeSnippets?: { language: string; code: string }[];
}

export interface AIConversation {
  id: string;
  title: string;
  courseId?: string;
  courseTitle?: string;
  messages: AIMessage[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizGenerationRequest {
  lessonTitle: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  questionCount: number;
}

export interface GeneratedQuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface ContentGenerationRequest {
  type: "description" | "outcomes" | "summary" | "seo";
  topic: string;
  targetAudience?: string;
}

export interface AIRoadmapPhase {
  month: number;
  title: string;
  description: string;
  topics: string[];
  recommendedProjects: string[];
}

export interface AIRoadmapPlan {
  goal: string;
  durationMonths: number;
  phases: AIRoadmapPhase[];
  createdAt: string;
}

export interface AIRecommendationItem {
  courseId: string;
  title: string;
  thumbnail: string;
  matchScore: number; // e.g. 96%
  reason: string;
  level: string;
}
