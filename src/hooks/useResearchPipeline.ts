// src/hooks/useResearchPipeline.ts
import { useState, useCallback } from "react";
import { runResearch, ApiError } from "@/lib/api";
import type { ResearchState } from "@/types/research";

const initialState: ResearchState = {
  status: "idle",
  topic: "",
  result: null,
  error: null,
};

export function useResearchPipeline() {
  const [state, setState] = useState<ResearchState>(initialState);

  const startResearch = useCallback(async (topic: string) => {
    const trimmed = topic.trim();
    if (!trimmed) return;

    setState({
      status: "loading",
      topic: trimmed,
      result: null,
      error: null,
    });

    try {
      const result = await runResearch(trimmed);
      setState((prev) => ({
        ...prev,
        status: "success",
        result,
      }));
    } catch (err) {
      const message =
        err instanceof ApiError ? err.message : "Unexpected error occurred";
      setState((prev) => ({
        ...prev,
        status: "error",
        error: message,
      }));
    }
  }, []);

  const reset = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    startResearch,
    reset,
    isLoading: state.status === "loading",
  };
}