import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface PollResponse {
  id: string;
  role: string;
  status: string;
  uses_ai: boolean;
  ai_tools: string[] | null;
  ai_no_reason: string | null;
}

// Demo seed data (~100 responses)
const DEMO_RESPONSES: PollResponse[] = (() => {
  const roles = ["Architect", "Interior Designer", "Urban Planner", "Landscape Architect", "Product Designer", "Graphic Designer", "Student"];
  const roleWeights = [30, 20, 12, 8, 10, 5, 15];
  const statuses = ["Polimi Resident Student", "Exchange Student"];
  const statusWeights = [75, 25];
  const tools = ["ChatGPT", "Midjourney", "Gemini", "DALL-E", "Stable Diffusion", "Kling AI", "Adobe Firefly", "Copilot", "Runway"];
  const noReasons = ["Too complex", "Not accurate", "Don't trust it", "Not relevant to my work", "Too expensive", "Privacy concerns", "Prefer manual work", "No time to learn", "Bad past experience", "Company policy"];

  function weightedPick<T>(items: T[], weights: number[]): T {
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (let i = 0; i < items.length; i++) {
      r -= weights[i];
      if (r <= 0) return items[i];
    }
    return items[items.length - 1];
  }

  const seed: PollResponse[] = [];
  for (let i = 0; i < 100; i++) {
    const usesAi = Math.random() < 0.72;
    const numTools = usesAi ? 1 + Math.floor(Math.random() * 3) : 0;
    const pickedTools = usesAi
      ? Array.from(new Set(Array.from({ length: numTools }, () => tools[Math.floor(Math.random() * tools.length)])))
      : null;
    seed.push({
      id: `demo-${i}`,
      role: weightedPick(roles, roleWeights),
      status: weightedPick(statuses, statusWeights),
      uses_ai: usesAi,
      ai_tools: pickedTools,
      ai_no_reason: usesAi ? null : noReasons[Math.floor(Math.random() * noReasons.length)],
    });
  }
  return seed;
})();

export function usePollData() {
  const [responses, setResponses] = useState<PollResponse[]>(DEMO_RESPONSES);

  useEffect(() => {
    supabase.from("poll_responses").select("*").then(({ data }) => {
      if (data) setResponses(data);
    });

    const channel = supabase
      .channel("poll_realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "poll_responses" },
        (payload) => {
          setResponses((prev) => [...prev, payload.new as PollResponse]);
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const roleCount = responses.reduce((acc, r) => {
    acc[r.role] = (acc[r.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const statusCount = responses.reduce((acc, r) => {
    const status = r.status === "Resident" ? "Polimi Resident Student" : r.status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const aiCount = { yes: 0, no: 0 };
  responses.forEach((r) => r.uses_ai ? aiCount.yes++ : aiCount.no++);

  const toolCount = responses.reduce((acc, r) => {
    r.ai_tools?.forEach((t) => {
      if (t === "LookX") return;
      acc[t] = (acc[t] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const noReasonCount = responses.reduce((acc, r) => {
    if (r.ai_no_reason) {
      acc[r.ai_no_reason] = (acc[r.ai_no_reason] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  return { responses, roleCount, statusCount, aiCount, toolCount, noReasonCount, total: responses.length };
}
