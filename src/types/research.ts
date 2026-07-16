// src/types/research.ts

// Mirrors backend TopicRequest
export interface TopicRequest {
  topic: string;
}

// Mirrors backend TopicResponse
export interface TopicResponse {
  search_results: string;
  scraped_content: string;
  report: string;
  feedback: string; // backend stringifies this via str(), so treat as string on the client
}

// UI-only: tracks pipeline lifecycle state (backend doesn't send this yet)
export type PipelineStatus = "idle" | "loading" | "success" | "error";

export interface ResearchState {
  status: PipelineStatus;
  topic: string;
  result: TopicResponse | null;
  error: string | null;
}