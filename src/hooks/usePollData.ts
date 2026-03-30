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

export function usePollData() {
  const [responses, setResponses] = useState<PollResponse[]>([]);

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
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const aiCount = { yes: 0, no: 0 };
  responses.forEach((r) => r.uses_ai ? aiCount.yes++ : aiCount.no++);

  const toolCount = responses.reduce((acc, r) => {
    r.ai_tools?.forEach((t) => {
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
