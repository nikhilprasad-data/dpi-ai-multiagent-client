// src/lib/api.ts
import type { TopicRequest, TopicResponse } from "@/types/research";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function runResearch(topic: string): Promise<TopicResponse> {
  const body: TopicRequest = { topic };

  const res = await fetch(`${API_BASE_URL}/api/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    // FastAPI's HTTPException sends { detail: "..." }
    let detail = "Research pipeline failed";
    try {
      const errJson = await res.json();
      detail = errJson.detail ?? detail;
    } catch {
      // response wasn't JSON, fall back to default message
    }
    throw new ApiError(detail, res.status);
  }

  return res.json() as Promise<TopicResponse>;
}